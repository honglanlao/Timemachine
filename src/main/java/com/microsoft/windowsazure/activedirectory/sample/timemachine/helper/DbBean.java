/**
 * 
 */
package com.microsoft.windowsazure.activedirectory.sample.timemachine.helper;

import java.sql.*;
/**
 * @author Azure Active Directory Contributor
 *
 */

public class DbBean {
	
	private static String connectionString = 
            "jdbc:sqlserver://oppa7xbv1a.database.windows.net:1433" + ";" +  
                    "database=timecardsample" + ";" + 
                    "user=timecard@oppa7xbv1a" + ";" +  
                    "password=P0rsche911" + ";" + "encrypt=true;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";
	
	private static String dbDriver = "com.microsoft.sqlserver.jdbc.SQLServerDriver";   
	
	public static Connection getConn() {
		Connection conn = null;  
//		if(conn == null){
//			synchronized (DbBean.class){
				try {		
					Class.forName(dbDriver);
					conn = DriverManager.getConnection(connectionString);
				} catch (ClassNotFoundException e) {
					e.printStackTrace();
				} catch (SQLException e) {
					e.printStackTrace();
				}
//			}
//		}
		
		return conn;
	}
	
	public static Statement getStatement(Connection conn) {
		Statement stmt = null; 
		try {
			if(conn != null) {
				stmt = conn.createStatement();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return stmt;
	}
	
	public static ResultSet getResultSet(Statement stmt, String sql) {
		ResultSet rs = null;
		try {
			if(stmt != null) {
				rs = stmt.executeQuery(sql);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return rs;
	}
	
	public static void closeConn(Connection conn) {
		try {
			if(conn != null) {
				conn.close();
				conn = null;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public static void closeStmt(Statement stmt) {
		try {
			if(stmt != null) {
				stmt.close();
				stmt = null;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public static void closeRs(ResultSet rs) {
		try {
			if(rs != null) {
				rs.close();
				rs = null;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}

