<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="com.microsoft.samples.federation.wsfed.*"%>
<%@ page import="org.json.*"%>


<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Index Page</title>
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.1.1.min.js"></script>
<script>

</script>
</head>
<%
	String tenantid = FederatedLoginManager.fromRequest(request).getPrincipal().getTenantid();
	String upn = FederatedLoginManager.fromRequest(request).getPrincipal().getUpn();
	String name = FederatedLoginManager.fromRequest(request).getPrincipal().getName();
	String givenName = FederatedLoginManager.fromRequest(request).getPrincipal().getGivenName();

	String surName = FederatedLoginManager.fromRequest(request).getPrincipal().getSurName();

	String objectId = FederatedLoginManager.fromRequest(request).getPrincipal().getObjectId();

	String url = "dashboard.jsp?tenantid=" + tenantid+"&upn=" + name+"&objectId="+objectId;
	System.out.println("in index_jsp url ->" + url);
%>
<body>
	<h2>
		
	</h2>
	<h2></h2>
	<ul>
		<% 
		JSONObject claimObj = new JSONObject();
		for(Claim claim : FederatedLoginManager.fromRequest(request).getClaims()) {
			claimObj.put(claim.getClaimType(), claim.getClaimValue());
			%>
			<li><%= claim.toString()%></li>
	<%		
		} 
	%>

	</ul>
	
	<div id="loading" style="margin:auto">

	   <TABLE style="margin:auto">
	  	 <tbody>
	   		<tr>
	   			<td style="text-align: center; "><img src="../images/spinner-md.gif" /></td>
	   		</tr>
	   		<tr>
	   			<td><B>Hello, <%=givenName %> <%=surName %>, you are authenticated</B></td>
	   		</tr>
	   		<tr>
	   			<td><B>Loading your app... ... Please Wait... ...</B></td>
	   		</tr>
	   	  </tbody>
	   	</TABLE>
</div>
	

</body>
	<%	String content = "3; URL=" + url;
		request.getSession().setAttribute("claim", claimObj);
		System.out.println("claims ->" + claimObj.toString());
		response.setHeader("Claim", claimObj.toString()); 

		response.setHeader("Refresh", content); 
	%>
</html>

