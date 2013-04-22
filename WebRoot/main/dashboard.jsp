<%@ page import="com.microsoft.windowsazure.activedirectory.sample.timemachine.dao.UserDaoList" %>
<%@ page import="org.json.*"%>
<!DOCTYPE html>
<html>
<head>
<title>Windows Azure Active TimeCard Sample(Java)</title>
<link rel="shortcut icon" href="../images/favicon.ico"/>
<!-- jquery
<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="http://code.jquery.com/jquery-migrate-1.1.1.min.js"></script> -->
<script type="text/javascript" src="../scripts/jquery/jquery-1.9.0.min.js"></script>
<!-- 
<script defer="defer" type="text/javascript" src="scripts/jquery.history.js"></script>
<script type="text/javascript" charset="utf-8" src="scripts/jquery.validate.js"></script>
<script type="text/javascript" charset="utf-8" src="scripts/jquery/lib/jquery.dataTables.js"></script>  -->
<!-- start of jquery styles -->
<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css"/>
<link rel="stylesheet" type="text/css" media="screen" href="../scripts/jquery-ui/smoothness/jquery-ui-1.10.1.custom.min.css"/>

<!-- start of self styles -->
<link rel="stylesheet" type="text/css" media="screen" href="../styles/Site.css"/>
<link rel="stylesheet" type="text/css" media="screen" href='../styles/base.css'>

<!-- start of jqgrid scripts -->
<script type="text/javascript" src="../scripts/jquery/jqgrid40/js/i18n/grid.locale-en.js"></script>
<script type="text/javascript" src="../scripts/jquery/jqgrid40/js/jquery.jqGrid.min.js"></script>
<script type="text/javascript" src="../scripts/jquery/jqgrid40/js/grid.celledit.js"></script>

<!-- start of jqgrid styles -->
<link rel="stylesheet" type="text/css" media="screen" href="../scripts/jquery/jqgrid40/themes/ui.jqgrid.css"/>


<!-- start of jquery-ui scripts -->
<script type="text/javascript" src="../scripts/jquery-ui/jquery-ui-1.10.1.custom.js"></script>
<script type="text/javascript" charset="utf-8" src="../scripts/jquery-ui/jquery.ui.core.js"></script>
<script type="text/javascript" charset="utf-8" src="../scripts/jquery-ui/jquery.ui.progressbar.js"></script>
<script type="text/javascript" charset="utf-8" src="../scripts/jquery-ui/jquery.ui.accordion.js"></script>
<script type="text/javascript" charset="utf-8" src="../scripts/jquery-ui/jquery.ui.tabs.js"></script>

<script type="text/javascript" charset="utf-8" src="datepicker.js"></script>
<script type="text/javascript" charset="utf-8" src="jqgrid.js"></script>
<script type="text/javascript" charset="utf-8" src="userMenu.js"></script>
<script type="text/javascript" charset="utf-8" src="timeEntry.js"></script>
<script type="text/javascript" charset="utf-8" src="directReports.js"></script>
<script type="text/javascript" charset="utf-8" src="hrAdmin.js"></script>

<style>
/* for menu on left column */
.ui-menu .ui-menu-item a {
	text-align: center;
}

.ui-menu {
	width: 100px;
}
/* for datepicker*/
div.ui-datepicker{
	font-size: 10px !important;
}


</style>
<% 	String tenantid = request.getParameter("tenantid"); 
	String upn = request.getParameter("upn");
	String objectId = request.getParameter("objectId");
	String claims = request.getHeader("Claim");
	System.out.println(claims);
	System.out.println("in dashboard.jsp tenantid->" + tenantid);
	System.out.println("in dashboard.jsp upn->" + upn);
	System.out.println("in dashboard.jsp objectId ->" + objectId);
%>
<script type="text/javascript" charset="utf-8">
	var tenantid = "<%=tenantid%>";
	var upn = "<%=upn%>";
	var objectId = "<%=objectId%>";
	var date_today = new Date();
	
	$(function() {
		$("#content").accordion({
			autoHeight : true,
			clearStyle : true,
			active: 0
		}); 

		$("#tabs").tabs();
		$("#tabs").removeClass('ui-widget');
		$("#contentMain").removeClass('ui-widget');
		$("#gbox_jenkins-server-grid").removeClass('ui-widget');
		$("#gbox_rowed4").removeClass('ui-widget');
		$("#gbox_engage-target-goal-aggregate-grid").removeClass('ui-widget');
		$("#gbox_engage-target-goal-pop").removeClass('ui-widget');
		//$( "#body" ).css('overflow':'hidden');
		
		/**
		 *  Personal Information 
		 */
		 $.getJSON( "/sample/User?action=loadUserBasicInfo&tenantid=" + tenantid + "&upn=" + upn + "&objectId=" + objectId, 
					function(userJSONObject){
			 			// fill to each cell in personal info and personal time balance
			 			
			 			$('table#personal-info-table td[id="user-name"]').html(userJSONObject.displayName);
			 			$('table#personal-info-table td[id="email-address"]').html(userJSONObject.mail);
			 			$('table#personal-info-table td[id="phone-number"]').html(userJSONObject.telephoneNumber);
			 			$('table#personal-info-table td[id="direct-manager"]').html(userJSONObject.managerDisplayname);
		 			}
		 );
		
		
		/**
		 *  Personal Time Balance
		 */ 
		$('table#personal-time-bal-table td[id="vacation-balance-as-of"]').html("Current Vacation Balance as of " + processDate(date_today));
		$('table#personal-time-bal-table td[id="sick-leave-balance-as-of"]').html("Current Sick Leave Balance as of " + processDate(date_today));

		$.getJSON( "/sample/User?action=loadUserBalanceInfo&tenantid=" + tenantid + "&upn=" + upn + "&objectId=" + objectId, 
				function(userDaoJSONObject){
		 			// fill to each cell in personal info and personal time balance
		 			$('table#personal-time-bal-table td[id="accural-rate"]').html(userDaoJSONObject.CustomAccrualRate + " hrs");
		 			$('table#personal-time-bal-table td[id="vacation-balance"]').html(userDaoJSONObject.VacationBalance + " hrs");
		 			$('table#personal-time-bal-table td[id="sick-leave-balance"]').html(userDaoJSONObject.SickLeaveBalance + " hrs");
		 			$('table#personal-time-bal-table td[id="vacation-carried-over"]').html(userDaoJSONObject.CarriedOverVacation + " hrs");
	 			}
	 	);
			 
			
		/**
		 * HR Admin accordion
		 *
		 */	
		loadHRAdmin(tenantid, upn, objectId);
	
	
		/**
		 * Time Entry accordion
		 */	
		console.log("today date ->" + date_today);
		var startDate = getStartEndDates(date_today).startDate;
		console.log("startDate ->" + startDate);
		var endDate = getStartEndDates(date_today).endDate;
		console.log("endDate ->" + endDate);
		var weekly_dates_str = getWeeklyDates(date_today);
	//	var weekly_dates_str = processWeeklyDates(weekly_dates_obj);
		//draw the table
		var handler = eval("dashboardCallBack");
		handler(objectId, upn, date_today, weekly_dates_str, startDate, endDate);
		
		/**
		 * Direct Reports accordion
		 */
		loadDirectReports('direct-reports-table', tenantid, upn, objectId);


}); // end of ready event
	
</script>

<style>
.ui-widget-content a {
	color: #356AA6;
}

.ui-jqgrid .ui-jqgrid-view {
	position: relative;
	left: 0px;
	top: 0px;
	padding: .0em;
	font-size: 13px;
}
</style>
</head>
<body class="yui-skin-sam">
	<table id="main_container">
		<tr>
			<td colspan="2" id="logo"><!-- <img class="logo" src="images/microsoft-logo-lg-1x.png" alt="Microsoft"/>-->
				<img class="logo" src="../images/time-machine.gif"/></td>
				<td id="title">Welcome to Time Machine(Java)</td>
		</tr>
		<tr>
			<td id="leftContainer" class="treeviewContainer">
				<div id="treeTitle" class="treetitle">Quick Links</div>
				<div id="treeOrgTaxonomy" class="treeview">	
					<ul id="menu">
						<li><a href="mailto:timemachine@timecardsample.ccsctp.net?Subject=Help">Contact Us</a></li>
					  	<li><a href="/sample/Auth?action=logout">Logout</a></li> 
					</ul>

				</div>
			</td>
			<td id="rightContainer">
				<div id="bar"></div>
				<div id="tabs">
					<div id="header" style="padding-top: 0px; text-align: center;"></div>
				
					<!-- <div id="contentMain"> -->
							<!-- start Personal Information  -->
						<h3>
							<a href='#' id="personal-info-a" class="personal-info">Personal Information</a>
							<br/>
						</h3>
						<div id="personal-info">
							<table id="personal-info-table" class="personal-info">
								<tbody>
									<tr>
										<td>Name</td>
										<td id="user-name"></td>
									</tr>
									<tr>
										<td>Email Address</td>
										<td id="email-address"></td>
									</tr>
									<tr>
										<td>Phone Number</td>
										<td id="phone-number"></td>
									</tr>
									<tr>
										<td>Direct Manager</td>
										<td id="direct-manager"></td>
									</tr>
								</tbody>
							</table>

						</div>
						<br/><hr/><br/>
						<!-- start Personal Time Balance  -->
						<h3>
							<a href='#' id="personal-time-bal-a" class="personal-info">Personal Time Balance</a>
							<br/>
						</h3>
						<div id="personal-time-bal">
							<table id="personal-time-bal-table" class="personal-info">
								<tbody>
									<tr>
										<td>Current Vacation Accrual Rate</td>
										<td id="accural-rate"></td>
									</tr>
									<tr>
										<td id="vacation-balance-as-of">Current Vacation Balance as of </td><td id="as-of-date"style="display:none"></td>
										<td id="vacation-balance"></td>
									</tr>
							<!--  	<tr>
										<td>Vacation Subject to Forfeiture</td>
										<td id="Forfeiture"></td>
									</tr> -->
									<tr>
										<td id="sick-leave-balance-as-of">Current Sick Leave Balance as of </td>
										<td id="sick-leave-balance"></td>
									</tr>
									<tr>
										<td>Vacation Carried Over From Prior Year</td>
										<td id="vacation-carried-over"></td>
									</tr>
								</tbody>
							</table>
						
						</div>
							
						<div id="content">
						
							<!-- HR Admin Setup accordion -->
							<h3>
								<a href="#" id="time-entry">Time Entry</a>
							</h3>
							<div id="time-entry">
								<div class="datepicker">
									Date: <input type="text" id="datepicker" />
								</div>
								<br/>
								<table id="time-entry-table"></table>
								<br/> 
								<input type="BUTTON" id="time-entry-save-button" style="" value="Submit" />
							</div>
						
							<!-- time entry accordion -->
							<h3 id="hr-admin-h3">
								<a href='#' id="hr-admin-a">HR Administrator Setup</a>
							</h3>
							<div id="hr-admin">				
								<fieldset>
									<legend>HR Admin Role Management</legend>
									<br/>
										<div>
											<div id="hrAdminToUpdate" style="float:left; width:400px">
												<label>Add User to HR Admin:</label><br/><br/>	
												<span></span>
												<br/><br/>
												<div id="hrAdminUpdate" class="button">
													<input id="hrAdminUpdateButton" type="submit" value="Submit">
												</div>							    
										    </div>
										    <div id="debug" style="width:600px; float:left">
										   	 <label>Monitoring all Users in Active Directory</label>
										   	 <label id="monitoring"></label><br/><br/>	
										    	<textarea id="debug" style="" cols="80" rows="3">
										    		
										    	
										    	</textarea>
										    	<br/><br/><br/>
										    	<div id="turnOnDebug" class="button">
													<input id="turnOnDebugButton" type="submit" value="Turn on Debug ">
												</div>	
										    </div>
										    <div id="debug-" style="float:right;width:auto">
										    </div>
									    </div>
										
								</fieldset>						
							</div>
							
							
							
							<!-- direct reports accordion -->
							<h3 id="direct-reports-h3">
								<a href="#" id="direct-reports-a">Direct Reports</a>
							</h3>
							<div id="direct-reports">
								
								<table id="direct-reports-table"></table>
								
							</div>
							
							
							<!--  jqgrid content ends here -->
				
					</div>
				</div>
			</td>
		</tr>
	</table>
	
	<!-- <div id="dialog-confirm" title="Delete Jenkin Server"></div>
	<div id="view-engage-target-goal-dialog"
		title="Engagement Target & Goal" style="display: none">
		<table id="engage-target-goal-pop" cellpadding="0" cellspacing="0"
			border="0" class="display"></table>
		<div id="p-engage-target-goal-pop"></div>
		<br /> <input type="BUTTON" id="sved-engage-target-goal-btn"
			value="Save changes" />

	</div> -->
	
	<div id="time-entry-submit-confirm"  title="alert" style="display: none; text-align: center; vertical-align: middle;"></div>
	<div id="hr-admin-submit-confirm"  title="alert" style="display: none; text-align: center; vertical-align: middle;"></div>			
</body>
</html>

