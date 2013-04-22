/**
 * 
 */
package com.microsoft.windowsazure.activedirectory.sample.timemachine.helper;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import com.microsoft.azure.activedirectory.sampleapp.models.User;
import com.microsoft.azure.activedirectory.sampleapp.models.UserList;
import com.microsoft.windowsazure.activedirectory.sample.timemachine.dao.UserDao;
import com.microsoft.windowsazure.activedirectory.sample.timemachine.dao.UserDaoList;

/**
 * @author Azure Active Directory Contributor
 * 
 */
public class DbHelper {

	/**
	 * @param tableName
	 * @param columns
	 * @param values
	 * @return
	 */
	public static ResultSet getResultSetByColumns(String tableName, List<String> columns, List<String> values) {

		Connection conn = DbBean.getConn();
		Statement stmt = DbBean.getStatement(conn);
		String sql = "SELECT * FROM " + tableName;  //
		if(columns != null && values != null){
			
			sql += " WHERE ";
			int i = 0;
			for (; i < columns.size() - 1; i++) {
				sql += columns.get(i) + "='" + values.get(i) + "' AND ";
			}
			// append the last AND
			sql += columns.get(i) + "='" + values.get(i) + "';";
			System.out.println("sql ->" + sql);
		}else if(columns == null && values == null){
		}else{
			try {
				throw new Exception("columns and values NOT match");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		ResultSet rs = DbBean.getResultSet(stmt, sql);
		return rs;
	}
	

	/**
	 * @param tableName
	 * @param column
	 * @param value
	 * @return
	 */
	public static ResultSet getResultSetByColumns(String tableName,String column, String value) {

		Connection conn = DbBean.getConn();
		Statement stmt = DbBean.getStatement(conn);
		String sql = "SELECT * FROM " + tableName;  //
		if(column != null && value != null){
			// append the last AND
			sql += " WHERE " + column + "='" + value + "';";
			System.out.println("sql ->" + sql);
		}else if(column == null && value == null){
		}else{
			try {
				throw new Exception("columns and values NOT match");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		ResultSet rs = DbBean.getResultSet(stmt, sql);
		return rs;
	}

	/**
	 * @param tableName
	 * @param columns
	 * @param values
	 * @param columnAttribute
	 * @return
	 */
	public static String getColumnAttributeByParams(String tableName, List<String> columns, List<String> values, String columnAttribute) {

		ResultSet rs = DbHelper.getResultSetByColumns(tableName, columns, values);
		String attr = "";
		try {
			if(rs.next() == false) return null;

			System.out.println(columnAttribute + " ->" + rs.getString(columnAttribute));
			attr = "";
		
			attr = rs.getString(columnAttribute);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return attr;

	}
	
	
	/**
	 * @param tableName
	 * @param column
	 * @param value
	 * @param columnAttribute
	 * @return
	 */
	public static String getColumnAttributeByParams(String tableName, String column, String value, String columnAttribute) {

		ResultSet rs = DbHelper.getResultSetByColumns(tableName, column, value);
		String attr = "";
		try {
			if(rs.next() == false) return null;

			System.out.println(columnAttribute + " ->" + rs.getString(columnAttribute));
			attr = "";
		
			attr = rs.getString(columnAttribute);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return attr;

	}
	
	/**
	 * @param tableName
	 * @return
	 */
	public static boolean isTableExists(String tableName){
		
		Connection conn = DbBean.getConn();
		Statement stmt = DbBean.getStatement(conn);
		
		String sqlString =  "IF EXISTS (SELECT 1 FROM sysobjects " + 
			                "WHERE xtype='u' AND name='" + tableName + "') " +
			                "SELECT 'exists.' " +
			                "ELSE  " +
			                "SELECT 'does not exist.'";
		
		System.out.println("sqlString ->" + sqlString);
		ResultSet rs = DbBean.getResultSet(stmt, sqlString);
		try {
			while (rs.next()) {
				String res = rs.getString(1);
				return !res.contains("not");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * @param tableName
	 */
	public static boolean createTable(String tableName) {
		
		Connection conn = DbBean.getConn();
		Statement stmt = DbBean.getStatement(conn);
		
		 String sqlString = "CREATE TABLE " + tableName + " (" + 
					        "[ObjectId] [nvarchar] (50) NOT NULL PRIMARY KEY," +
					        "[UPN] [nvarchar](50) NOT NULL," + 
					        "[DisplayName] [nvarchar](50) NOT NULL," + 
					        "[GivenName] [nvarchar](50) NOT NULL," + 
					        "[SurName] [nvarchar](50) NOT NULL," + 
					        "[IsHrAdmin] [BIT] NOT NULL DEFAULT 0," +
					        "[VacationBalance] [INT] NOT NULL DEFAULT 0," +
					        "[CustomAccuralRate] [INT] NOT NULL DEFAULT 0);";
					        
		 
		try {
			 int rs = stmt.executeUpdate(sqlString);
			 return rs == 0;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}
	
	
	/**
	 * @param tableName
	 */
	public static boolean truncateTable(String tableName) {
		
		Connection conn = DbBean.getConn();
		Statement stmt = DbBean.getStatement(conn);
		
		 String sqlString = "TRUNCATE TABLE " + tableName + " ;"; 
					        
		 
		try {
			 int rs = stmt.executeUpdate(sqlString);
			 return rs == 0;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}
	
	
	public static String createSqlStrFromUserObject(String tableName, User user){	
		
		String objectId = user.getObjectId();
		String upn = user.getUserPrincipalName();
		String displayName = user.getDisplayName();
		String givenName = user.getGivenName();
		String surName = user.getSurname();
		 
		String sqlString = "INSERT INTO " + tableName + "(ObjectId, UPN, DisplayName, GivenName, SurName)" ;
		sqlString += " VALUES('" + objectId + "', '" + upn + "', '" + displayName + "', '" + givenName + "', '" +  surName;
		sqlString += "')";
		
		System.out.println("sqlString =>" + sqlString);
		return sqlString;
	
	}
	
	public static String createSqlStrFromUserList( String tableName, UserList userList){	
		
		
		StringBuffer sqlStringBuffer = new StringBuffer("INSERT INTO " + tableName + "(ObjectId, UPN, DisplayName, GivenName, SurName) VALUES") ;
		
		for(int i = 0; i < userList.getListSize(); i ++){
			
			User user = userList.getSingleDirectoryObject(i);
			String objectId = user.getObjectId();
			String upn = user.getUserPrincipalName();
			String displayName = user.getDisplayName();
			String givenName = user.getGivenName();
			String surName = user.getSurname();
			
			sqlStringBuffer.append("('" + objectId + "', '" + upn + "', '" + displayName + "', '" + givenName + "', '" + surName + "'),");
		}
		sqlStringBuffer.deleteCharAt(sqlStringBuffer.length() - 1);
		 
		
		System.out.println("sqlString =>" + sqlStringBuffer.toString());
		return sqlStringBuffer.toString();
	
	}
	
	/**
	 * @param tableName
	 * @param userJSONArr
	 * @return
	 */
//	public static String createSqlStrFromUserList( String tableName, JSONArray userJSONArr){	
//		
//		StringBuffer sqlStringBuffer = new StringBuffer("INSERT INTO " + tableName + "(ObjectId, UPN, DisplayName, GivenName, SurName) VALUES") ;
//		
//		for(int i = 0; i < userJSONArr.length(); i ++){
//			JSONObject obj = userJSONArr.optJSONObject(i);
//		
//			String objectId = obj.optString("objectId");
//			String upn = obj.optString("userPrincipalName");
//			String displayName = obj.optString("displayName");
//			String givenName = obj.optString("givenName");
//			String surName = obj.optString("surname");
//			
//			sqlStringBuffer.append("('" + objectId + "', '" + upn + "', '" + displayName + "', '" + givenName + "', '" + surName + "'),");
//		}
//		sqlStringBuffer.deleteCharAt(sqlStringBuffer.length() - 1);
//		 
//		
//		System.out.println("sqlString =>" + sqlStringBuffer.toString());
//		return sqlStringBuffer.toString();
//	
//	}
	
	
	public static String createSqlStrFromUserList( String tableName, JSONArray userJSONArr){	
		
		StringBuffer sqlStringBuffer = new StringBuffer("") ;
		
		for(int i = 0; i < userJSONArr.length(); i ++){
			JSONObject obj = userJSONArr.optJSONObject(i);
		
			String objectId = obj.optString("objectId");
			String upn = obj.optString("userPrincipalName");
			String displayName = obj.optString("displayName");
			String givenName = obj.optString("givenName");
			String surName = obj.optString("surname");
			
			sqlStringBuffer.append("IF EXISTS(SELECT * FROM Employee WHERE ObjectId='" + objectId + "')"
					+ " UPDATE Employee SET DisplayName='" + displayName + "', upn='" + upn + "', SurName='" + surName + "', givenName='" + givenName
					+ "' WHERE ObjectId='" + objectId + "' "
					+ " ELSE INSERT INTO Employee (ObjectId, UPN, DisplayName, GivenName, SurName) VALUES"
					+ "('" + objectId+ "','" + upn + "','" + displayName + "','" + givenName +"','" + surName + "')") ;

		//	sqlStringBuffer.append("('" + objectId + "', '" + upn + "', '" + displayName + "', '" + givenName + "', '" + surName + "');");
		}
	//	sqlStringBuffer.deleteCharAt(sqlStringBuffer.length() - 1);
		 
		
		System.out.println("sqlString =>" + sqlStringBuffer.toString());
		return sqlStringBuffer.toString();
	
	}
	
	public static boolean insertRow(User user){
		
		String sqlString = DbHelper.createSqlStrFromUserObject("Employee", user);
		Connection conn = DbBean.getConn();
		Statement stmt = DbBean.getStatement(conn);
		
		try {
			int rs = stmt.executeUpdate(sqlString);
			return rs == 0;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
		
	}
	
//	public static boolean insertRows(String method, UserList userList){
//		
//		String sqlString = DbHelper.createSqlStrFromUserList(method, "Employee", userList);
//
//		Connection conn = DbBean.getConn();
//		Statement stmt = DbBean.getStatement(conn);
//		
//		try {
//			int rs = stmt.executeUpdate(sqlString);
//			return rs == 0;
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return false;
//		
//	}
	
	public static boolean insertRows(JSONArray userJSONArr){
		
		String sqlString = DbHelper.createSqlStrFromUserList("Employee", userJSONArr);
		Connection conn = DbBean.getConn();
		Statement stmt = DbBean.getStatement(conn);
		
		try {
			int rs = stmt.executeUpdate(sqlString);
			return rs > 0;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
		
	}
	
	public static boolean deleteRows(JSONArray userJSONArr){
		
		String sqlString = DbHelper.getSqlClauseFromArr(userJSONArr, "objectId");

		sqlString = "DELETE FROM Employee WHERE objectId in " + sqlString;
		System.out.println("sqlString ->" + sqlString);
		Connection conn = DbBean.getConn();
		Statement stmt = DbBean.getStatement(conn);
		
		try {
			int rs = stmt.executeUpdate(sqlString);
			return rs >= 0;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
		
	}
	
	public static UserDaoList getRowsFromDb(String tableName, List<String> columns, List<String> values){
		
		ResultSet rs = DbHelper.getResultSetByColumns(tableName, columns, values);
		
		UserDaoList userDaoList = new UserDaoList();
		try {
			while(rs.next()){
				UserDao userDao = new UserDao();
				userDao.setObjectId(rs.getString("ObjectId"));
				userDao.setUserPrincipalName(rs.getString("UPN"));
				userDao.setDisplayName(rs.getString("DisplayName"));
				userDao.setGivenName(rs.getString("GivenName"));
				userDao.setSurname(rs.getString("SurName"));
				userDao.setIsHrAdmin(rs.getBoolean("IsHrAdmin"));
				userDao.setCustomAccrualRate(rs.getInt("VacationBalance"));
				userDao.setVacationBalance(rs.getInt("CustomAccrualRate"));
				userDao.setSickLeaveBalance(rs.getInt("SickLeaveBalance"));
				userDao.setCarriedOverVacation(rs.getInt("CarriedOverVacation"));

				userDaoList.add(userDao);

			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return userDaoList;
	}
	
	public static boolean updateTableAttributeByColumnsMap(String tableName, Map<String, String> updateMap, Map<String, String> filterMap){
		
		String filterClause = DbHelper.getSqlClauseFromMap(filterMap);
		String updateClause = DbHelper.getSqlClauseFromMap(updateMap);
		
		Connection conn = DbBean.getConn();
		Statement stmt = DbBean.getStatement(conn);
		String sql = "UPDATE " + tableName + " SET " + updateClause + " WHERE " + filterClause;
		System.out.println("in update ->" + sql);
		try {
			int rs = stmt.executeUpdate(sql);
			return rs == 0;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return false;
	}
	
	
	/** key1=value1 AND key2=value2 AND .....
	 * @param map
	 * @return
	 */
	public static String getSqlClauseFromMap(Map<String, String> map){
		
		Set<Entry<String, String>> entries = map.entrySet();
		StringBuffer sqlClause = new StringBuffer("");
        for(Entry<String, String> entry : entries) {
            String key = entry.getKey();
            String value = entry.getValue();
            sqlClause.append(key + "='" + value + "' AND ");
        }
        // remove last AND
        sqlClause.delete(sqlClause.length() - 4, sqlClause.length() - 1);
    //    System.out.println("sqlClause ->" + sqlClause.toString());
        return sqlClause.toString();
	}
	
	public static String getSqlClauseFromArr(JSONArray arr, String attribute){
		
		
		StringBuffer sqlClause = new StringBuffer("(");
        for(int i = 0 ; i < arr.length(); i++) {
            String val = arr.optJSONObject(i).optString(attribute);
          
            sqlClause.append("'" + val + "',");
        }
        // remove last .
        sqlClause.deleteCharAt(sqlClause.length() - 1);
        sqlClause.append(")");
        return sqlClause.toString();
	}
	
	
	/** update tableName Set updateMap where filterColumn in (value)
	 * @param tableName
	 * @param updateMap
	 * @param filterColumn
	 * @param values
	 * @return
	 */
	public static boolean updateTableAttributeByArray(String tableName, Map<String, String> updateMap, String filterColumn, String[] values){
		
		String updateClause = DbHelper.getSqlClauseFromMap(updateMap);
		String sqlString = "UPDATE " + tableName + " SET " + updateClause + " WHERE " + filterColumn + " IN ('" + StringUtils.join(values, "','") + "')";
		System.out.println("in updateTableAttributeByArray sqlString ->" + sqlString);
		Connection conn = DbBean.getConn();
		Statement stmt = DbBean.getStatement(conn);
		try {
			int rs = stmt.executeUpdate(sqlString);
			return rs == 0;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
		
	}
	
	/**
	 * @param objectId
	 * @param hoursList
	 * @return
	 */
	public static String createSqlStrFromTimeEntry(String objectId, List<JSONObject> hoursList){	
		
		StringBuffer sqlStringBuffer = new StringBuffer("INSERT INTO TimeEntries (EmployeeID, Date, ApprovalStatus, TimeOff_Type, Hours) VALUES") ;
		
		for(int i = 0; i < hoursList.size(); i ++){
			
			JSONObject hour = hoursList.get(i);
			String date = hour.optString("Date");
			int approvalStatus = 1;
			String timeOff_Type = hour.optString("TimeOff_Type");
			String hours = hour.optString("Hours");
			
			sqlStringBuffer.append("('" + objectId + "', '" + date + "', '" + approvalStatus + "', '" + timeOff_Type + "', '" + hours + "'),");
		}
		sqlStringBuffer.deleteCharAt(sqlStringBuffer.length() - 1);
		 
		System.out.println("in createSqlStrFromTimeEntry sqlString =>" + sqlStringBuffer.toString());
		return sqlStringBuffer.toString();
	
	}
	
	/**
	 * @param objectId
	 * @return
	 */
	public static UserDao getSingleDatabaseObject(String tableName, String objectId){
		

		List<String> columns = new ArrayList<String>();
		columns.add("ObjectId");
		
		List<String> values = new ArrayList<String>();
		values.add(objectId);
		
		UserDaoList userDaoList = getRowsFromDb( tableName, columns, values);
		System.out.println("getUserInfo userDaoList ->" + userDaoList);
		UserDao userDao = userDaoList.getSingleDatabaseObject(0);
		
		return userDao;
		
	}

	
}
