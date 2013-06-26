function loadDirectReports(divID, tenantid, upn, objectId){

	jQuery("#" + divID).jqGrid({
		url: "/sample/User?action=loadDirectreports&tenantid=" + tenantid + "&upn=" + upn + "&objectId=" + objectId,
		datatype: "json",
	   	colNames:['ObjectId','Display Name', 'Date', 'TimeOff Type', 'Hours', 'Action'],
	   	colModel:[
			{name:'objectId',index:'objectId',align:"right", width:130, sortable:false, editable:false, hidden:true},
				
	   		{name:'displayName',index:'displayName',align:"right", width:130, sortable:false, editable:false,
				cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="height:30px !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "';
		   			}},
	   		{name:'date',index:'date', width:110, align:"right",sortable:false, editable:true, edittype:"text", 
				cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="height:30px !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "'; 
		   			}},
   			{name:'timeoff_type',index:'timeoff_type', width:150, align:"right",sortable:false, editable:true, edittype:"text", 
   				cellattr:function (rowId, tv, rawObject, cm, rdata) 
   		   			{ 
   		   				return 'style="height:30px !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "'; 
   		   			}},
	   		{name:'hours',index:'hours', width:80, align:"right",sortable:false, editable:true, edittype:"text", 
				cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="height:30px !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "'; 
		   			}},
	   		{name:'act',index:'act', width:130, align:"right", sortable:false, editable:true, edittype:"text", 
				cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="height:30px !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "'; 
		   			}}
	   	],
		
	    loadonce: false,
	    viewrecords: true,
	   	
	   	loadComplete: function(data){	
	   		console.log("in loadcomplete");
	   		var hasDirectReports = data.hasDirectReports;
	   		if(hasDirectReports == false){
	   			// hide Direct Reports accordion and return 
	   			$('h3#direct-reports-h3').hide();
	   			$('div#direct-reports').hide();
	   		}else{
		   		var dataRows=data['rows'];
		   		var ids = jQuery("#" + divID).jqGrid('getDataIDs');
		   		for(var i=0;i<dataRows.length;i++){
					var cl = ids[i];
					var objectId = jQuery("#" + divID).jqGrid('getRowData', cl).objectId;
					var date = jQuery("#" + divID).jqGrid('getRowData', cl).date;
					var timeoff_type = jQuery("#" + divID).jqGrid('getRowData', cl).timeoff_type;
					var hours = jQuery("#" + divID).jqGrid('getRowData', cl).hours;
	
					ae = "<input id='Approve' style='height:22px;width:65px;text-align:center' type='button' value='Approve' onclick=\"processDRRequests($(this), 'Approved', '"+objectId+"','"+date+"','" + timeoff_type + "','" + hours +"');\" />"; 
					re = "<input id='Reject' style='height:22px;width:60px;text-align:center' type='button' value='Reject' onclick=\"processDRRequests($(this), 'Rejected', '"+objectId+"','"+date+"','" + timeoff_type + "','" + hours +"');\" />"; 
					jQuery("#" + divID).jqGrid('setRowData',ids[i],{act:ae+re});
					$("#" + divID).jqGrid('showCol', 'act');
					var objectId = jQuery("#" + divID).jqGrid('getRowData', cl).ObjectId;
				}
	   		}
	   	},
	   	
	   	gridComplete: function(){
	   		console.log("grid complete");
	   	},

		height: "auto",
	   	multiselect: false,
	   	caption: "",
	}); // end of jqgrid
}


function processDRRequests($this, decision, objectId, date, timeoff_type, hours){
//	alert($this);
	$this.attr("disabled", "disabled");
	$this.val("Submitted");
	var paras = {};
	paras.decision = decision;
	paras.objectId = objectId;
	paras.date = date;
	paras.timeoff_type = timeoff_type;
	paras.hours = hours;
	
	$.ajax({
		type: "POST",
		url: "/sample/User?action=processDRRequests&tenantid=" + tenantid + "&upn=" + upn,
		data: {'paras': JSON.stringify(paras)},
		success: function(msg){
			$this.val("Success");
			//$this siblings need to enable again and val(original value)
			$this.siblings().each(function(){
				$(this).val($(this).attr("id"));
				$(this).removeAttr("disabled");
			});
		},
		error:function()
		{
			alert("failed");
			 
		}
		});
}