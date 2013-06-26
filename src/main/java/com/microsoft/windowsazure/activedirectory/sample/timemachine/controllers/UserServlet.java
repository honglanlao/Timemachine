/**
 * 
 */
package com.microsoft.windowsazure.activedirectory.sample.timemachine.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import com.microsoft.windowsazure.activedirectory.sample.timemachine.config.Config;
import com.microsoft.windowsazure.activedirectory.sample.timemachine.dao.UserDao;
import com.microsoft.windowsazure.activedirectory.sample.timemachine.dao.UserDaoList;
import com.microsoft.windowsazure.activedirectory.sample.timemachine.helper.DbHelper;
import com.microsoft.windowsazure.activedirectory.sample.timemachine.helper.Email;
import com.microsoft.windowsazure.activedirectory.sample.timemachine.services.TimeEntryService;
import com.microsoft.windowsazure.activedirectory.sdk.graph.config.TenantConfiguration;
import com.microsoft.windowsazure.activedirectory.sdk.graph.exceptions.SdkException;
import com.microsoft.windowsazure.activedirectory.sdk.graph.helper.JSONHelper;
import com.microsoft.windowsazure.activedirectory.sdk.graph.models.User;
import com.microsoft.windowsazure.activedirectory.sdk.graph.models.UserList;
import com.microsoft.windowsazure.activedirectory.sdk.graph.services.CommonService;
import com.microsoft.windowsazure.activedirectory.sdk.graph.services.UserService;


/**
 * @author Azure Active Directory Contributor
 *
 */
public class UserServlet extends HttpServlet {
	

	private static final long serialVersionUID = -266462121586629255L;
	private static final TenantConfiguration tenant = TenantConfiguration.getInstance(Config.tenantPropertiesPath);
	private CommonService commonService = new CommonService(tenant);
	private UserService userService = new UserService(tenant);
	
	private static Logger logger  = Logger.getLogger(UserServlet.class);

	/**
	 * This method initializes all the application specific parameters from the
	 * xml configuration file to the appropriate variables in the
	 * {@link com.microsoft.windowsazure.activedirectory.sdk.graph.services.SdkConfig SdkConfig} class. This
	 * method also generates an access token and initializes the acessToken
	 * parameter in the SdkConfig class.
	 *
	 */	
	@Override
	public void init() throws ServletException {

	//	ServletHelper.loadConfig(this.getServletConfig());
	}
	
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 * @param request The Http Request object
	 * @param response The Http Response object
	 * @exception ServletException  Throws the ServletException
	 * @exception IOException Throws the IOException
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		String action = request.getParameter("action");
		logger.info("action ->" + action);
		String tenantid = request.getParameter("tenantid");
		String upn = request.getParameter("upn");
	    String objectId = request.getParameter("objectId");
		try {
		switch(action){
		
			case "loadUserBasicInfo":
				User user = (User)commonService.getSingleDirectoryObject(User.class, objectId);	
				String directManager = userService.getManagerByObjectId(objectId).getDisplayName();
				
				user.setManagerDisplayname(directManager);
				response.getWriter().write(user.toString());
				return;
			
			case "loadUserBalanceInfo":
				UserDao userDao = (UserDao)DbHelper.getSingleDatabaseObject("Employee", objectId);	
				response.getWriter().write(userDao.toString());
				return;
			
			case "loadHrAdminData":
				//check isHRAdmin in employee table
				JSONObject hrAdminData = new JSONObject();
				
				boolean isHRAdmin = new Boolean(DbHelper.getColumnAttributeByParams("Employee", "ObjectId", objectId, "IsHrAdmin"));			
				hrAdminData.put("isHRAdmin", isHRAdmin);
			//	logger.info("isHRAdmin ->" + isHRAdmin);
				//check isITAdmin in active directory
				boolean isITAdmin = commonService.isMemberOf(objectId, "Company Administrator");
				logger.info("isITAdmin ->" + isITAdmin);
				hrAdminData.put("isITAdmin", isITAdmin);
				
				// if HRadmin or ITadmin, do differential query, update Employee table
				JSONArray addJSONArr = new JSONArray();
				JSONArray minusJSONArr = new JSONArray();
				JSONArray updateJSONArr = new JSONArray();
				if(isHRAdmin || isITAdmin){
					String deltaLink = DbHelper.getColumnAttributeByParams("TenantsProperties", "ObjectId", tenantid, "DeltaLink");
					if(deltaLink == null || deltaLink.length() == 0) deltaLink = "";
					logger.info("old deltaLink ->" + deltaLink);
					JSONObject deltaObj = commonService.getDifferentialDirectoryObjectList(UserList.class, User.class, deltaLink);
					logger.info("deltaObj ->" + deltaObj);
					String new_deltaLink = JSONHelper.fetchDeltaLink(deltaObj);
					logger.info("new_deltaLink ->" + new_deltaLink);
					JSONArray directoryObjectJSONArr = JSONHelper.fetchDirectoryObjectJSONArray(deltaObj);
					addJSONArr = new JSONArray();
					minusJSONArr = new JSONArray();

					for(int i = 0 ; i < directoryObjectJSONArr.length(); i ++){
						JSONObject thisObj = directoryObjectJSONArr.optJSONObject(i);
						logger.info("thisObj ->" + thisObj);
						if(thisObj.optString("objectType").equals("User")){

							if(thisObj.optBoolean("aad.isDeleted")){ //
								minusJSONArr.put(thisObj);
							}else{
								boolean isUpdate = (DbHelper.getColumnAttributeByParams("Employee", "ObjectId", thisObj.optString("objectId"), "ObjectId") != null);
								if(isUpdate){
									updateJSONArr.put(thisObj);
								}else{
									addJSONArr.put(thisObj);
								}
							}
						}
					}
					logger.info("updateJSONArr ->" + updateJSONArr);
					logger.info("addJSONArr ->" + addJSONArr);
					logger.info("minusJSONArr ->" + minusJSONArr);
					boolean status = true;
					if(updateJSONArr.length() > 0){
						status = DbHelper.insertRows(updateJSONArr);
					}
					if(addJSONArr.length() > 0){
						status = DbHelper.insertRows(addJSONArr);
					}
					if(minusJSONArr.length() > 0){
						status &= DbHelper.deleteRows(minusJSONArr);
					}
					logger.info("status ->" + status);
					if(status){
						// insert new deltaLink;
						Map<String, String> updateMap = new HashMap<String, String>();
						updateMap.put("DeltaLink", new_deltaLink);
						Map<String, String> filterMap = new HashMap<String, String>();
						filterMap.put("ObjectId", tenantid);
						DbHelper.updateTableAttributeByColumnsMap("TenantsProperties", updateMap, filterMap);
					}

				}
				//get all Employee list
				UserDaoList userList = (UserDaoList)DbHelper.getRowsFromDb("Employee", null, null);
				hrAdminData.put("userList", new JSONArray(userList.toString()));
				hrAdminData.put("minusUserList", minusJSONArr);
				hrAdminData.put("addUserList", addJSONArr);
				hrAdminData.put("updateUserList", updateJSONArr);

				response.getWriter().write(hrAdminData.toString());
				return;
			
			case "loadDirectreports":
				
				JSONObject directreports = new JSONObject();
				UserList directReportUserList = (UserList)userService.getDirectReportsByObjectId(objectId);
				logger.info("userList ->" + directReportUserList);
				if(directReportUserList.getListSize() == 0){
					directreports.put("hasDirectReports", false);
				}else{
					directreports.put("hasDirectReports", true);
					JSONArray requestArr = new JSONArray();
					for(int i = 0 ; i < directReportUserList.getListSize(); i ++){
						User thisUser = directReportUserList.getSingleDirectoryObject(i);
						JSONArray arr = TimeEntryService.getTimeOffRequestsByUserObjectId(thisUser.getObjectId(), "Pending");
					// 	colNames:['ObjectId','Display Name', 'Date', 'TimeOff Type', 'Hours', 'Action'],
						for(int j = 0 ; j < arr.length(); j ++){
							JSONArray cell = new JSONArray();
							cell.put(thisUser.getObjectId());
							cell.put(thisUser.getDisplayName());
							cell.put(arr.optJSONObject(j).optString("Date"));
							cell.put(arr.optJSONObject(j).optString("TimeOff_Type"));
							cell.put(arr.optJSONObject(j).optString("Hours"));
							cell.put("");
							JSONObject obj = new JSONObject();
							obj.put("cell", cell);
							requestArr.put(obj);
						}
					}
					directreports.put("rows", requestArr);
				}
				response.getWriter().write(directreports.toString());
				return;
	
			default:			
				break;
		}
		
		}catch (SdkException e) {
			e.printStackTrace();
		}
		
	}
	
	
	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request, HttpServletResponse response){
		
		String action = request.getParameter("action");
		String tenantid = request.getParameter("tenantid");
		String upn = request.getParameter("upn");
		String objectId = request.getParameter("objectId");
		try{
			switch(action){
			
				case "loadTimeEntry":
					objectId = userService.getObjectIdByUpn(upn);
					String weekly_dates_str = request.getParameter("weekly_dates_str");
					String startDate = request.getParameter("startDate");
					String endDate = request.getParameter("endDate");
					logger.info("startDate ->" + startDate);
					logger.info("endDate ->" + endDate);
	
					JSONArray timeEntryArr = TimeEntryService.getUserTimeEntryByPeriod(objectId, weekly_dates_str, startDate, endDate);
					logger.info("timeEntryArr->" + timeEntryArr);		
					
					String baseline =  "[{\"cell\":[\"Vacation\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\"]},"
								        + "{\"cell\":[\"Sick Leave\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\"]},"
								        + "{\"cell\":[\"Floating Holiday\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\"]},"
								        + "{\"cell\":[\"Jury Duty\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\"]},"
								        + "{\"cell\":[\"Time Off Without Pay\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\"]}]";
								      
					JSONObject resp = new JSONObject();
					resp.put("rows", new JSONArray(baseline));
					resp.put("timeEntries", timeEntryArr);
					response.getWriter().write(resp.toString());
					return;
				
				case "processDRRequests":
					JSONObject obj = new JSONObject(request.getParameter("paras"));
					String decision = obj.optString("decision");
					objectId = obj.optString("objectId");
					String date = obj.optString("date");
					String timeoff_type = obj.optString("timeoff_type");
					String hours = obj.optString("hours");
					TimeEntryService.processDRRequests(decision, objectId, date, timeoff_type, hours);
					return;
				
				case "updateHrAdmin":
					
					Map<String, String[]> updateHrAdminReq = request.getParameterMap();
					Set<Map.Entry<String, String[]>> entries = updateHrAdminReq.entrySet();
					List<String> toAddList = new ArrayList<String>();
					List<String> toRemoveList = new ArrayList<String>();
					
					for(Map.Entry<String, String[]> entry : entries) {
			            String key = entry.getKey();
			            String value = entry.getValue()[0];
			            System.out.printf("%s = %s%n", key, value);
			            if(value.equalsIgnoreCase("false")){
			            	toRemoveList.add(key);
			            }else if(value.equalsIgnoreCase("true")){
			            	toAddList.add(key);
			            }
			        }
					String[] toAddArr = toAddList.toArray(new String[toAddList.size()]);
					String[] toRemoveArr = toRemoveList.toArray(new String[toRemoveList.size()]);
					Map<String, String> map = new HashMap<String, String>();
					map.put("IsHrAdmin", "true");		
					DbHelper.updateTableAttributeByArray("Employee", map, "ObjectId", toAddArr);			
					map.put("IsHrAdmin", "false");
					DbHelper.updateTableAttributeByArray("Employee", map, "ObjectId", toRemoveArr);			

					return;
				
				case "submitTimeEntry":
					JSONObject req = new JSONObject(request.getParameter("paras"));
					List<JSONObject> hoursList = new ArrayList<JSONObject>();
					String[] timeoff_typeNames = JSONObject.getNames(req);
					for(int i = 0 ; i < timeoff_typeNames.length; i ++){
						JSONObject thisObj = req.optJSONObject(timeoff_typeNames[i]);
						String[] dateNames = JSONObject.getNames(thisObj);
						for(int j = 0 ; j < dateNames.length; j ++){
							JSONObject eachReq = new JSONObject();
							eachReq.put("Date", dateNames[j]);
							eachReq.put("TimeOff_Type", timeoff_typeNames[i]);
							eachReq.put("Hours", thisObj.optString(dateNames[j]));
							hoursList.add(eachReq);
						}
					}
					
					boolean status = TimeEntryService.logUserTimeEntry(objectId, hoursList);
					// get manager email
					String email = userService.getManagerByObjectId(objectId).getMail();
					logger.info("email ->" + email);
					new Email().sendEmail(email);
					
					response.getWriter().write("{\"status\":" + status + "}");
					return;
					
				default:
					break;
			}
		}catch (SdkException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
	}

}
