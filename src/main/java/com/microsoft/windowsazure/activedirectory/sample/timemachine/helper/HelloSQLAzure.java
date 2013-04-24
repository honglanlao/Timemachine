/**
 * 
 */
package com.microsoft.windowsazure.activedirectory.sample.timemachine.helper;

/**
 * @author Azure Active Directory Contributor
 *
 */
import java.sql.*;

import org.apache.log4j.Logger;

import com.microsoft.sqlserver.jdbc.*;

public class HelloSQLAzure {

	private static Logger logger  = Logger.getLogger(HelloSQLAzure.class);
	
    public static void main(String[] args) 
    {

        // Connection string for your SQL Database server.
        // Change the values assigned to your_server, 
        // your_user@your_server,
        // and your_password.
        String connectionString = 
            "jdbc:sqlserver://oppa7xbv1a.database.windows.net:1433" + ";" +  
                "database=timecardsample" + ";" + 
                "user=timecard@oppa7xbv1a" + ";" +  
                "password=P0rsche911" + ";" + "encrypt=true;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";

        // The types for the following variables are
        // defined in the java.sql library.
        Connection connection = null;  // For making the connection
        Statement statement = null;    // For the SQL statement
        ResultSet resultSet = null;    // For the result set, if applicable

        try
        {
            // Ensure the SQL Server driver class is available.
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

            // Establish the connection.
            connection = DriverManager.getConnection(connectionString);

            // Define the SQL string.
            String sqlString = 
                "CREATE TABLE Tenants2 (" + 
                    "[ObjectId] [nvarchar] (50) NOT NULL," +
                    "[DisplayName] [nvarchar](50) NOT NULL," + 
                    "[FirstName] [nvarchar](50) NOT NULL)";
            String sqlString2 = "SELECT * FROM TenantsProperties WHERE ObjectId='2f8b426e-e53f-4353-b255-e70ca20bbde0'";
            
            String sqlString3 = "IF EXISTS (SELECT 1 " +
                    "FROM sysobjects " + 
                    "WHERE xtype='u' AND name='Person') " +
                    "SELECT 'Person table exists.'" +
                    "ELSE  " +
                    "SELECT 'Person table does not exist.'";
            
            String sqlString4 = "CREATE TABLE employee (" + 
                    "[ObjectId] [nvarchar] (50) NOT NULL PRIMARY KEY," +
                    "[UPN] [nvarchar](50) NOT NULL," + 
                    "[DisplayName] [nvarchar](50) NOT NULL," + 
                    "[FirstName] [nvarchar](50) NOT NULL," + 
                    "[LastName] [nvarchar](50) NOT NULL," + 
                    "[IsHrAdmin] [BIT] NOT NULL DEFAULT 0)";
            
            String sqlString5 = "INSERT INTO TimeEntries (EmployeeID, Date, ApprovalStatus) VALUES('7f5015a4-e8a0-4b43-a7ed-43ddf911e03e', '3-22-2013', 1)" ;
            
            String sqlString6 = "CREATE TABLE " + "Employee2" + " (" + 
			        "[ObjectId] [nvarchar] (50) NOT NULL PRIMARY KEY," +
			        "[UPN] [nvarchar](50) NOT NULL," + 
			        "[DisplayName] [nvarchar](50) NOT NULL," + 
			        "[GivenName] [nvarchar](50) NOT NULL," + 
			        "[SurName] [nvarchar](50) NOT NULL," + 
			        "[IsHrAdmin] [BIT] NOT NULL DEFAULT 0," +
			        "[VacationBalance] [INT] NOT NULL DEFAULT 0," +
			        "[CustomAccuralRate] [INT] NOT NULL DEFAULT 0);";
            
            String sqlString7 = "TRUNCATE TABLE " + "Employee2" + " ;"; 
            
            String sqlString8 = "SELECT RTRIM(LTRIM(STR(MONTH(Date))))+'/'+  RTRIM(LTRIM(STR(DAY(Date))))+'/'+ RTRIM(LTRIM(STR(YEAR(Date)))), ApprovalStatus, TimeOff_Type"				
					+ " FROM TimeEntries AS te WHERE Date BETWEEN '3/17/2013' AND '3/22/2013' AND EmployeeID='7f5015a4-e8a0-4b43-a7ed-43ddf911e03e';";
            logger.info("sqlString ->" + sqlString8);
            // Use the connection to create the SQL statement.
            statement = connection.createStatement();

            // Execute the statement.
            ResultSet rs = statement.executeQuery(sqlString8);
         //   int rs = statement.executeUpdate(sqlString8);
         //   while(rs.next())
            // Provide a message when processing is complete.
         //   logger.info("rs rows ->" + rs.next());
            logger.info("rs ->" + rs);
            logger.info("Processing complete.");

        }
        // Exception handling
        catch (ClassNotFoundException cnfe)  
        {

            logger.info("ClassNotFoundException " +
                               cnfe.getMessage());
        }
        catch (Exception e)
        {
            logger.info("Exception " + e.getMessage());
            e.printStackTrace();
        }
        finally
        {
            try
            {
                // Close resources.
                if (null != connection) connection.close();
                if (null != statement) statement.close();
                if (null != resultSet) resultSet.close();
            }
            catch (SQLException sqlException)
            {
                // No additional action if close() statements fail.
            }
        }

    }

}
