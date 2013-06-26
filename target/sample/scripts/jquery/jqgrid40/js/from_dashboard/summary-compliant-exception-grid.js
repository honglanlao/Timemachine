$(function() {
	jQuery("#summary-compliant-exception-grid-btn").mouseover(function(e){
	
		//$("#summary-compliant-exception-dialog" ).dialog( "destroy" );
		$( "#gbox_summary-compliant-exception-pop").removeClass('ui-widget');
		$summary_compliant_exception_dialog = $('#summary-compliant-exception-dialog').dialog({
		    autoOpen: false,
		    title: "Exception Products under " + appTree,
		    modal: true,
		    position: [e.clientX,e.clientY],
		    width: 'auto',
		    height: 'auto',	
		    margin: 'auto'
		});
	
		e.preventDefault();
		$summary_compliant_exception_dialog.dialog('open');
	//	$summary_compliant_exception_dialog.dialog('close');
		
	});
})


function loadSummaryCompliantExceptionAppsGrid(appTree, divID){	
	
	jQuery("#" + divID).jqGrid({
	   	url:baseUrl+'/cidashboard/summary/get-compliance-exception-apps/appTree/'+appTree,
		datatype: "json",	   	
		colNames:['Product'],
	
	   	colModel:[
	   		{name:'app_name',index:'app_name', width:250, align: 'right', shrinkToFit:true, editable:false, sortable:false,
	   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
	   			}
	   		}
	   	],
		
	   	width: 'auto',
	   	rowNum: 20,
	   	rowList:[10,20,30,40,50],
	   	height:'auto',
	   	pager: "#p-" + divID,
	 //  	sortname: 'app_name',
	    viewrecords: true,
	 //   sortorder: "desc",
		editurl: baseUrl+"/admin/jenkin-servers/save-engage-target-goal",
		loadComplete: function(data){
			
		}
	});
}