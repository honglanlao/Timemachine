/**
 * 
 */
package com.microsoft.windowsazure.activedirectory.sample.timemachine.services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.microsoft.windowsazure.activedirectory.sample.timemachine.helper.DbBean;
import com.microsoft.windowsazure.activedirectory.sample.timemachine.helper.DbHelper;

/**
 * @author Azure Active Directory Contributor
 *
 */
public class TimeEntryService {
	
	public static final String[] TimeOff_Type_Arr = new String[]{"Vacation", "Sick Leave", "Floating Holiday", "Jury Duty", "Time Off Without Pay"};

	public static JSONArray getUserTimeEntryByPeriod(String userObjectId, String weekly_dates_str, String startDate, String endDate){
		
		Connection conn = DbBean.getConn();
		Statement stmt = DbBean.getStatement(conn);
		String sql = "SELECT RTRIM(LTRIM(STR(MONTH(Date))))+'-'+  RTRIM(LTRIM(STR(DAY(Date))))+'-'+ RTRIM(LTRIM(STR(YEAR(Date)))) AS Date, ApprovalStatus, TimeOff_Type, Hours"				
					+ " FROM TimeEntries WHERE Date BETWEEN '" + startDate + "' AND '" + endDate + "' AND EmployeeID='" + userObjectId + "';";
		System.out.println("in getUserTimeEntryByPeriod sql ->" + sql);
		
		ResultSet rs = DbBean.getResultSet(stmt, sql);
		JSONArray timeEntriesArr = new JSONArray();
	//	JSONObject timeEntriesObj = new JSONObject();
		try {
			while (rs.next()) {
				JSONObject obj = new JSONObject();
//				String key = rs.getString("TimeOff_Type");
//				if(timeEntriesObj.opt(key) == null){
//					timeEntriesObj.put(key, new JSONArray());
//				}
//				
//				JSONObject value = new JSONObject();	
				obj.put("TimeOff_Type", rs.getString("TimeOff_Type"));
				obj.put("Date", rs.getString("Date"));
				obj.put("ApprovalStatus", rs.getString("ApprovalStatus"));
				obj.put("Hours", rs.getString("Hours"));
//				timeEntriesObj.optJSONArray(key).put(value);		
				timeEntriesArr.put(obj);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}		
		System.out.println("timeEntriesArr ->" + timeEntriesArr);
		/*JSONObject weekly_dates_obj = new JSONObject(weekly_dates_str);
		weekly_dates_obj.remove("picked");
		for(int i = 0; i < TimeOff_Type_Arr.length; i ++){
			String timeOff_Type = TimeOff_Type_Arr[i];
			JSONArray cell = new JSONArray();
			cell.put(timeOff_Type);
			//
			String[] dates = JSONObject.getNames(weekly_dates_obj);
			for(int j = 0 ; j < dates.length; j ++){
				String date = dates[j];
				// if date exist in timeEntriesObj.optJSONArray(timeOff_Type) -- which is JSONArray
			//	if()
			}
			
		}*/
		return timeEntriesArr;
	}
	
	/**
	 * @param userObjectId
	 * @param hoursList
	 * @return
	 */
	public static boolean logUserTimeEntry(String userObjectId, List<JSONObject> hoursList){
		
		String sql = DbHelper.createSqlStrFromTimeEntry(userObjectId, hoursList);
		Connection conn = DbBean.getConn();
		Statement stmt = DbBean.getStatement(conn);
		try {
			int rs = stmt.executeUpdate(sql);
			return rs == 0;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}
	
	public static JSONArray getTimeOffRequestsByUserObjectId(String userObjectId, String stateName){
		
		String sql = "SELECT  RTRIM(LTRIM(STR(MONTH(Date))))+'-'+  RTRIM(LTRIM(STR(DAY(Date))))+'-'+ RTRIM(LTRIM(STR(YEAR(Date)))) AS Date," 
				+ " TimeEntries.EmployeeID, TimeEntries.TimeOff_Type, TimeEntries.Hours, TimeEntries.ApprovalStatus, " 
				+ "Employee.DisplayName, ApprovalStates.StateName " 
				+ " FROM TimeEntries, Employee, ApprovalStates WHERE "
				+ " TimeEntries.EmployeeID='" + userObjectId
				+ "' AND TimeEntries.EmployeeID=Employee.ObjectId"
				+ " AND TimeEntries.ApprovalStatus=ApprovalStates.StateID" 
				+ " AND ApprovalStates.StateName='" + stateName + "';";
		
		System.out.println("in getTimeOffRequestsByUserObjectId sql ->" + sql);
		Connection conn = DbBean.getConn();
		Statement stmt = DbBean.getStatement(conn);
		ResultSet rs = DbBean.getResultSet(stmt, sql);
		JSONArray timeEntriesArr = new JSONArray();

		try {
			while (rs.next()) {
		
				JSONObject obj = new JSONObject();
	//			String key = rs.getString("TimeOff_Type");
	//			if(timeEntriesObj.opt(key) == null){
	//				timeEntriesObj.put(key, new JSONArray());
	//			}
				obj.put("StateName", rs.getString("StateName"));
				obj.put("DisplayName", rs.getString("DisplayName"));
				obj.put("TimeOff_Type", rs.getString("TimeOff_Type"));
				obj.put("Date", rs.getString("Date"));
				obj.put("ApprovalStatus", rs.getString("ApprovalStatus"));
				obj.put("Hours", rs.getString("Hours"));
	//			timeEntriesObj.optJSONArray(key).put(value);		
				timeEntriesArr.put(obj);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}	
		return timeEntriesArr;
	}
	
	/**
	 * @param decision
	 * @param objectId
	 * @param date
	 * @param timeoff_type
	 * @param hours
	 * @return
	 */
	public static boolean processDRRequests(String decision, String objectId, String date, String timeoff_type, String hours){
		int approvalStatus = 0;
		if(decision.equalsIgnoreCase("Approved")){
			approvalStatus = 2;
		}else if(decision.equalsIgnoreCase("Rejected")){
			approvalStatus = 3;
		}
		String sqlStr = "UPDATE TimeEntries SET ApprovalStatus = " + approvalStatus  
				        + " WHERE EmployeeID='" + objectId 
				        + "' AND Date=CONVERT(DATETIMEOFFSET,'" + date + "')"
				        + " AND TimeOff_Type='" + timeoff_type + "';";
		
		System.out.println("in processDRRequests sqlStr ->" + sqlStr);
		Connection conn = DbBean.getConn();
		Statement stmt = DbBean.getStatement(conn);
		try {
			int rs = stmt.executeUpdate(sqlStr);
			return rs == 0;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;

	}
		
	
	
}
