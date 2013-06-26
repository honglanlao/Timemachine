/*
var date_today = new Date();
$(function(){
	var startDate = getStartEndDates(date_today).startDate;
	var endDate = getStartEndDates(date_today).endDate;
	
//	jQuery("#rowed-build-test-target-goal-grid").jqGrid('setGridParam',{url:baseUrl+'/admin/jenkin-servers/get-build-test-target-goal-aggr-for-grid/appTree/'+appTree,rowNum:10,datatype:"json" });
//	loadBuildTestTargetGoalGrid(appTree,"rowed-build-test-target-goal-grid","p-rowed-build-test-target-goal-grid");
//	jQuery("#rowed-build-test-target-goal-grid").trigger('reloadGrid');
	loadTimeEntry("time-entry-table", "", "", date_today, startDate, endDate);
}); */
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var paras = {};
function loadTimeEntry(divID, tenantid, objectId, upn, date_picked_obj, weekly_dates_obj, startDate, endDate){

	console.log("in fillDAtetoclanedar, date picked obj ->" + date_picked_obj);

	jQuery("#" + divID).jqGrid({
		url: '/sample/User?action=loadTimeEntry&tenantid=' + tenantid + '&objectId=' + objectId + '&upn=' + upn + '&startDate=' + startDate + "&endDate=" + endDate + "&weekly_dates_str="+JSON.stringify(weekly_dates_obj),
		datatype: "json",
		postData: weekly_dates_obj,
		mtype: "POST",
	   	colNames:[ '', 'Sun ', 'Mon ', 'Tue ', 'Wed ', 'Thu ', 'Fri ', 'Sat ', 'Weekly Total', 'YTD Total'],
	   	colModel:[
	   		{name:'timeoff_type',index:'timeoff_type',align:"right", width:110, sortable:false, editable:false,
			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height:40px !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "';
	   			}},
	   		{name:'sun',index:'sun', width:80, align:"right",sortable:false, editable:true, edittype:"text", 
			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: 40px !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "'; 
	   			}},
	   		{name:'mon',index:'mon', width:80, align:"right",sortable:false, editable:true, edittype:"text", 
			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: 40px  !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "'; 
	   			}},
	   		{name:'tue',index:'tue', width:80, align:"right", sortable:false, editable:true, edittype:"text", 
			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: 40px  !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "'; 
	   			}},
	   		{name:'wed',index:'wed', width:80, align:"right", sortable:false, editable:true, edittype:"text", 
			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: 40px  !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "'; 
	   			}},		
	   		{name:'thu',index:'thu', width:80,align:"right", sortable:false, editable:true, edittype:"text", 
			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: 40px  !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "'; 
	   			}},		
	   		{name:'fri',index:'fri', width:80, align:"right", sortable:false, sortable:false, editable:true, edittype:"text", 
			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: 40px  !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "'; 
	   			}},		
	   		{name:'sat',index:'sat', width:80, align:"right", sortable:false, sortable:false, editable:true, edittype:"text", 
			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: 40px  !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "'; 
	   			}},		
	   		{name:'weekly_total',index:'weekly_total', align:"right", width:90, sortable:false, sortable:false, editable:true, edittype:"text", 
			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: 40px  !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "'; 
	   			}},		
	   		{name:'ytd_total',index:'ytd_total', align:"right", align:"right", width:90, sortable:false, sortable:false, editable:true, edittype:"text", 
			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="background-color:#dddddd; height: 45px !important; position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "'; 
	   			}}				
	   	],
		
	    loadonce: true,
	    viewrecords: true,
	   	
	   	loadComplete: function(timeEntryRows){	
	   		console.log("in loadcomplete");
	   		var weekly_dates = $("#" + divID).getGridParam("postData");
	   		console.log("data ->" + timeEntryRows);
	   		var colModel = jQuery("#" + divID).jqGrid('getGridParam', 'colModel');
	   		console.log($("#" + divID).getGridParam('datatype'));
	   		var ids = jQuery("#"+divID).jqGrid('getDataIDs');
	   		for(var i=ids[0];i<=ids[ids.length-1];i++){
				var cl = i;
				var rowIdx = i - ids[0]; // this is idx in data
				
				var rowData = jQuery("#" + divID).jqGrid('getRowData', cl);

				var newRowDataJsonString = "{";
				// each column
				var colIdx = 0;
				for(var index_name in rowData){
					var timeoff_type;
					if(index_name == 'timeoff_type' || index_name == 'weekly_total' || index_name == 'ytd_total'){
						timeoff_type = rowData[index_name];
						newRowDataJsonString +=  index_name + ":\"" + timeoff_type + "\",";
						continue;
					}
					var hour = rowData[index_name];
					var text="";
					var date_this_Cell = weekly_dates[index_name];
					text = "<input id='" + timeoff_type.split(" ").join("-") + "__" + date_this_Cell + "' type='text' value='" + hour +"' offval='no' />";
				//	alert(userData);
				//	alert(colModel);

					newRowDataJsonString +=  index_name + ":\"" + text + "\",";
					
					colIdx ++;
	
				}
				if(newRowDataJsonString[newRowDataJsonString.length - 1] == ','){
					newRowDataJsonString = newRowDataJsonString.substring(0, newRowDataJsonString.length - 1);
				}
				newRowDataJsonString += "}";
			//	console.log(newRowDataJsonString);
				jQuery("#" + divID).jqGrid('setRowData',cl,eval("(" + newRowDataJsonString + ")"));

	   		} // end of for
	   		
	   		// fill hours into table
	   		var timeEntries = timeEntryRows.timeEntries;
			for(var i = 0; i < timeEntries.length; i ++){
			//	var obj =  timeEntries[i];
				var timeOff_Type = timeEntries[i].TimeOff_Type;
				var hours = timeEntries[i].Hours;
				var date = timeEntries[i].Date;
				var approvalStatusColor = getTimeEntryCellColor(timeEntries[i].ApprovalStatus);
				var inputId = timeOff_Type.split(" ").join("-") + "__" + date; 
				$("#" + inputId).val(hours);
				$("#" + inputId).css("background-color", approvalStatusColor);
			}
			
			// calculate weekly total
			var vacation_total = 0;
			$('input[id^="Vacation"]').each(function(index){
				var thisCell = $(this).val();
				if(thisCell != "" && thisCell != undefined){
					vacation_total += parseInt(thisCell);
   				}
			});
			var sick_leave_total = 0;
			$('input[id^="Sick-Leave"]').each(function(index){
				var thisCell = $(this).val();
				if(thisCell != "" && thisCell != undefined){
					sick_leave_total += parseInt(thisCell);
   				}
			});
			var floating_holiday_total = 0;
			$('input[id^="Floating-Holiday"]').each(function(index){
				var thisCell = $(this).val();
				if(thisCell != "" && thisCell != undefined){
					floating_holiday_total += parseInt(thisCell);
   				}
			});
			var jury_duty_total = 0;
			$('input[id^="Jury-Duty"]').each(function(index){
				var thisCell = $(this).val();
				if(thisCell != "" && thisCell != undefined){
					jury_duty_total += parseInt(thisCell);
   				}
			});
			var time_off_without_pay_total = 0;
			$('input[id^="Time-Off-Without-Pay"]').each(function(index){
				var thisCell = $(this).val();
				if(thisCell != "" && thisCell != undefined){
					time_off_without_pay_total += parseInt(thisCell);
   				}
			});
		//	alert(vacation_total);
			$('td[aria-describedby="time-entry-table_weekly_total"]').each(function(index){
				if(index == 0) $(this).html(vacation_total.toFixed(2));
				if(index == 1) $(this).html(sick_leave_total.toFixed(2));
				if(index == 2) $(this).html(floating_holiday_total.toFixed(2));
				if(index == 3) $(this).html(jury_duty_total.toFixed(2));
				if(index == 4) $(this).html(time_off_without_pay_total.toFixed(2));

			});
	   		
			
			
			// enable select in time entry table
			jQuery('table#' + divID + ' input[type="text"]').focus(function(){
				$(this).select();
			});
			
			
	   		// collect changed data
	   		jQuery('table#' + divID + ' input[type="text"]').change(function(){
	   			console.log("changed to " + $(this).val());	
	   			// find out all input under parent of this input and update weekly_total and ytd_total
	   			var changedCell = parseInt($(this).val());
	   			if(isNaN(changedCell)){
	   				$(this).val("");
	   				changedCell = 0;
	   			}else{
		   			if(changedCell >= 1 && changedCell <= 8){
		   				changedCell = changedCell.toFixed(2);
		   				$(this).val(changedCell);
		   			}else{
		   				changedCell = 8.00;
		   				$(this).val("8.00");
		   			}
		   			var id = $(this).attr('id');
					var timeoff_type = id.split("__")[0];
					var timeoff_date = id.split("__")[1];
					if(paras[timeoff_type] == undefined){
						paras[timeoff_type] = {};
					}
					
					paras[timeoff_type][timeoff_date] = changedCell;

	   			}
	   			
	   			// calculate total
	   			var total = parseInt(changedCell);
	   			
	   			$(this).parent().siblings().each(function(index){
	   				var thisCell = $(this).children('input').val();
	   				if(thisCell != "" && thisCell != undefined){
	   					total += parseInt(thisCell);
	   					console.log("total so far ->" + total);
	   				}   				
	   			});
	   			$(this).parent().siblings('td [aria-describedby="time-entry-table_weekly_total"]').html(total.toFixed(2));   
	
	   		});
	   		
	   		
	   		// fill date to calendar, must be in loadComplete
	   		// update header
    		fillDateToCalendar(weekly_dates);    		

	   	},
	   	
	   	gridComplete: function(){
	   		
	   		console.log("grid complete");

	   	},

		height: "auto",
	   	multiselect: false,
	   	caption: "All time entry units are in hours increment",
	});

	
	// click save button event
	jQuery("#time-entry-save-button").click(function(){
		console.log("time entry save button clicked");
		// list paras as text
		var reminder = "";
		for(var timeoff_type in paras){
			
		//	reminder += type;
			var reminder_each = "";
			$.each(paras[timeoff_type], function(key, value) {
				  reminder_each += "<li style='margin-left:4em'>" + key + " : "  + value + ' hrs</li>';
				});

//			for(int i in paras[type]){
//			//	reminder += date +"<br/>";
//				reminder_each += "<li style='margin-left:4em'>" + date + " : "  + paras[type][date] + ' hrs</li>';
//				 
//			}
			reminder += "<p >" + timeoff_type + '<br/>' + "<ul style='font-size:12px;color:red'>" + reminder_each + "</ul>";	
			
		}
		reminder = "<div style='text-align: left'>" + reminder + "</div>";
		if( ! jQuery.isEmptyObject(paras)){
			$('#time-entry-submit-confirm').html(reminder);
			$engage_target_goal_pop_alert = $('#time-entry-submit-confirm').dialog({
			  autoOpen: false,
			    title: 'Confirm',
			    modal: true,
			    position: 'center',
			    width: 400,
			    height: 'auto',	
			    margin: 'auto',
			    buttons: { "Ok": function() { 
			    	
			    				console.log("ok clicked");
			    				$(this).dialog("close");
			    				submitTimeEntries(tenantid, objectId, upn);
			    			
			    	
			    			},
			    			"Cancel": function() {$(this).dialog("close");}
			             },
	             hide: {
				    	effect: "explode", 
				    	duration: 1000}
			});
			$engage_target_goal_pop_alert.dialog('open');
		}else{ // paras.length == 0
			$('#time-entry-submit-confirm').html("You have not login any hours yet...");
			$engage_target_goal_pop_alert = $('#time-entry-submit-confirm').dialog({
			  autoOpen: false,
			    title: 'Confirm',
			    modal: true,
			    position: 'center',
			    width: 400,
			    height: 'auto',	
			    margin: 'auto',
			    buttons: { "Ok": function() { 		    	
			    					$(this).dialog("close");
			    			}
			             },
			});
			$engage_target_goal_pop_alert.dialog('open');
		}
		return false;
		
	});  // end of save button event

} // end of loadTimeEntry()

function submitTimeEntries(tenantid, objectId, upn){
	
	$.post('/sample/User?action=submitTimeEntry&tenantid=' + tenantid + '&objectId=' + objectId + '&upn=' + upn, {'paras': JSON.stringify(paras)}, function(data){
		// need to append line to TimeEntries table  ... to do later
		
		
		// mark submitted hours yellow
		$.each(paras, function(timeoff_type, value){

			$.each(value, function(timeoff_date, hour) {
					var id = timeoff_type.split(" ").join("-") + "__" + timeoff_date;
				//	alert(id);
					$('input#' + id).css('background-color', "yellow");
				});
		});
		paras={};	
	});
}

function getTimeEntryCellColor(approvalStatus){
	if(approvalStatus == 1) return "yellow";
	if(approvalStatus == 2) return "green";
	if(approvalStatus == 3) return "red";
}

