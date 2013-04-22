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

import org.json.JSONArray;
import org.json.JSONObject;

import com.microsoft.azure.activedirectory.sampleapp.exceptions.SampleAppException;
import com.microsoft.azure.activedirectory.sampleapp.helper.JSONHelper;
import com.microsoft.azure.activedirectory.sampleapp.helper.ServletHelper;
import com.microsoft.azure.activedirectory.sampleapp.models.User;
import com.microsoft.azure.activedirectory.sampleapp.models.UserList;
import com.microsoft.azure.activedirectory.sampleapp.services.CommonService;
import com.microsoft.azure.activedirectory.sampleapp.services.UserService;
import com.microsoft.windowsazure.activedirectory.sample.timemachine.dao.UserDao;
import com.microsoft.windowsazure.activedirectory.sample.timemachine.dao.UserDaoList;
import com.microsoft.windowsazure.activedirectory.sample.timemachine.helper.DbHelper;
import com.microsoft.windowsazure.activedirectory.sample.timemachine.helper.Email;
import com.microsoft.windowsazure.activedirectory.sample.timemachine.services.TimeEntryService;

/**
 * @author Azure Active Directory Contributor
 *
 */
public class UserServlet extends HttpServlet {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -266462121586629255L;

	/**
	 * This method initializes all the application specific parameters from the
	 * xml configuration file to the appropriate variables in the
	 * {@link com.microsoft.azure.activedirectory.sampleapp.services.SampleConfig SampleConfig} class. This
	 * method also generates an access token and initializes the acessToken
	 * parameter in the SampleConfig class.
	 *
	 */	
	@Override
	public void init() throws ServletException {

		ServletHelper.loadConfig(this.getServletConfig());
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
		System.out.println("action ->" + action);
		String tenantid = request.getParameter("tenantid");
		String upn = request.getParameter("upn");
	    String objectId = request.getParameter("objectId");
		try {
		switch(action){
		
			case "loadUserBasicInfo":
				User user = (User)CommonService.getSingleDirectoryObject(User.class, objectId);	
				String directManager = UserService.getManagerByObjectId(objectId).getDisplayName();
				
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
			//	System.out.println("isHRAdmin ->" + isHRAdmin);
				//check isITAdmin in active directory
				boolean isITAdmin = CommonService.isMemberOf(objectId, "Company Administrator");
				System.out.println("isITAdmin ->" + isITAdmin);
				hrAdminData.put("isITAdmin", isITAdmin);
				
				// if HRadmin or ITadmin, do differential query, update Employee table
				JSONArray addJSONArr = new JSONArray();
				JSONArray minusJSONArr = new JSONArray();
				JSONArray updateJSONArr = new JSONArray();
				if(isHRAdmin || isITAdmin){
					String deltaLink = DbHelper.getColumnAttributeByParams("TenantsProperties", "ObjectId", tenantid, "DeltaLink");
					if(deltaLink == null || deltaLink.length() == 0) deltaLink = "";
					System.out.println("old deltaLink ->" + deltaLink);
					JSONObject deltaObj = CommonService.getDifferentialDirectoryObjectList(UserList.class, User.class, deltaLink);
					System.out.println("deltaObj ->" + deltaObj);
					String new_deltaLink = JSONHelper.fetchDeltaLink(deltaObj);
					System.out.println("new_deltaLink ->" + new_deltaLink);
					JSONArray directoryObjectJSONArr = JSONHelper.fetchDirectoryObjectJSONArray(deltaObj);
					addJSONArr = new JSONArray();
					minusJSONArr = new JSONArray();

					for(int i = 0 ; i < directoryObjectJSONArr.length(); i ++){
						JSONObject thisObj = directoryObjectJSONArr.optJSONObject(i);
						System.out.println("thisObj ->" + thisObj);
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
					System.out.println("updateJSONArr ->" + updateJSONArr);
					System.out.println("addJSONArr ->" + addJSONArr);
					System.out.println("minusJSONArr ->" + minusJSONArr);
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
					System.out.println("status ->" + status);
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
				UserList directReportUserList = (UserList)UserService.getDirectReportsByObjectId(objectId);
				System.out.println("userList ->" + directReportUserList);
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
		
		}catch (SampleAppException e) {
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
					objectId = UserService.getObjectIdByUpn(upn);
					String weekly_dates_str = request.getParameter("weekly_dates_str");
					String startDate = request.getParameter("startDate");
					String endDate = request.getParameter("endDate");
					System.out.println("startDate ->" + startDate);
					System.out.println("endDate ->" + endDate);
	
					JSONArray timeEntryArr = TimeEntryService.getUserTimeEntryByPeriod(objectId, weekly_dates_str, startDate, endDate);
					System.out.println("timeEntryArr->" + timeEntryArr);		
					
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
					String email = UserService.getManagerByObjectId(objectId).getMail();
					System.out.println("email ->" + email);
					new Email().sendEmail(email);
					
					response.getWriter().write("{\"status\":" + status + "}");
					return;
					
				default:
					break;
			}
		}catch (SampleAppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
	}

}
