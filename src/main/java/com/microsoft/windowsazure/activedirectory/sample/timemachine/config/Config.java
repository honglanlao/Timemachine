package com.microsoft.windowsazure.activedirectory.sample.timemachine.config;


import org.json.JSONException;
import org.json.JSONObject;

import com.microsoft.windowsazure.activedirectory.sdk.graph.config.SdkConfig;

/**
 * The class SdkConfig holds the important parameters for this application.
 * The parameters are read in from the web.xml configuration file in the
 * {@link com.microsoft.azure.activedirectory.sampleapp.controllers.GroupServlet#init() init} method. These parameters 
 * are used throughout the application.
 * @author Azure Active Directory Contributor
 */

public class Config {
	
	// The number of users shown per page.
	public static int userSizePerList = 9;
	
	public static String tenantPropertiesPath = "/tenant.properties";
}
