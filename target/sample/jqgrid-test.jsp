<!doctype html>
<html>
<head>
<title>jqgrid</title>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="http://code.jquery.com/jquery-migrate-1.1.1.min.js"></script>
<!-- 
<script defer="defer" type="text/javascript" src="scripts/jquery.history.js"></script>
<script type="text/javascript" charset="utf-8" src="scripts/jquery.validate.js"></script>
<script type="text/javascript" charset="utf-8" src="scripts/jquery/lib/jquery.dataTables.js"></script>  -->

<!-- start of jquery styles -->
<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css"/>
<link rel="stylesheet" type="text/css" media="screen" href="scripts/jquery-ui/smoothness/jquery-ui-1.10.1.custom.min.css"/>

<!-- start of self styles -->
<link rel="stylesheet" type="text/css" media="screen" href="styles/Site.css"/>
<link rel="stylesheet" type="text/css" media="screen" href='styles/base.css'>

<!-- start of jqgrid scripts -->
<script type="text/javascript" src="scripts/jquery/jqgrid40/js/i18n/grid.locale-en.js"></script>

<script type="text/javascript" src="scripts/jquery/jqgrid40/js/jquery.jqGrid.min.js"></script>
<script type="text/javascript" src="scripts/jquery/jqgrid40/js/grid.celledit.js"></script>
<!-- start of jqgrid styles -->
<link rel="stylesheet" type="text/css" media="screen" href="scripts/jquery/jqgrid40/themes/ui.jqgrid.css"/>

<!-- start of jquery-ui scripts -->
<script type="text/javascript" src="scripts/jquery-ui/jquery-ui-1.10.1.custom.js"></script>
<script type="text/javascript" charset="utf-8" src="scripts/jquery-ui/jquery.ui.core.js"></script>
<script type="text/javascript" charset="utf-8" src="scripts/jquery-ui/jquery.ui.progressbar.js"></script>
<script type="text/javascript" charset="utf-8" src="scripts/jquery-ui/jquery.ui.accordion.js"></script>
<script type="text/javascript" charset="utf-8" src="scripts/jquery-ui/jquery.ui.tabs.js"></script>

<script>
var lastsel2;
$(function(){
	loadTimeEntry("list4", "", "");
});
function loadTimeEntry(divID, tenantid, upn){
	jQuery("#" + divID).jqGrid({
		url: '/sample/User?action=loadTimeEntry',
		datatype: "json",
	   	colNames:[' ','Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Weekly Total', 'YTD Total'],
	   	colModel:[
	   		{name:'timeoff_type',index:'timeoff_type',align:"right", width:90, sortable:false, editable:false,
			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height:30px !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
	   			}},
	   		{name:'sun',index:'sun', width:80, align:"right",sortable:false, editable:true, edittype:"text", 
			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: 30px  !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
	   			}},
	   		{name:'mon',index:'mon', width:80, align:"right",sortable:false, editable:true, edittype:"text", 
			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: 30px  !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
	   			}},
	   		{name:'tue',index:'tue', width:80, align:"right", sortable:false, editable:true, edittype:"text", 
			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: 30px  !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
	   			}},
	   		{name:'wed',index:'wed', width:80, align:"right", sortable:false, editable:true, edittype:"text", 
			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: 30px  !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
	   			}},		
	   		{name:'thu',index:'thu', width:80,align:"right", sortable:false, editable:true, edittype:"text", 
			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: 30px  !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
	   			}},		
	   		{name:'fri',index:'fri', width:80, align:"right", sortable:false, sortable:false, editable:true, edittype:"text", 
			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: 30px  !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
	   			}},		
	   		{name:'sat',index:'sat', width:80, align:"right", sortable:false, sortable:false, editable:true, edittype:"text", 
			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: 30px  !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
	   			}},		
	   		{name:'weekly_total',index:'weekly_total', align:"right", width:80, sortable:false, sortable:false, editable:true, edittype:"text", 
			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: 30px  !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
	   			}},		
	   		{name:'ytd_total',index:'ytd_total', align:"right", align:"right", width:80, sortable:false, sortable:false, editable:true, edittype:"text", 
			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: 30px  !important;position:relative; padding-right:5px; vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
	   			}}				
	   	],
		
	  //  loadonce:true,
	    viewrecords: true,
	   	rowNum:10,
	   	rowList:[10,20,30],
	   	pager: '#pager2',
	   	loadComplete: function(data){	
	   		/* console.log("data ->" + data);
	   		var colModel = jQuery("#" + divID).jqGrid('getGridParam', 'colModel');
	   		console.log($("#" + divID).getGridParam('datatype'));
	   		var ids = jQuery("#"+divID).jqGrid('getDataIDs');
	   		for(var i=ids[0];i<=ids[ids.length-1];i++){
				var cl = i;
	   		} */
	   	},
	   	gridComplete: function(){	
		//	 $("#" + divID).setGridParam({datatype: 'local'}); 
		},
	   	
	/* 	onSelectRow: function(id){
			if(id && id!==lastsel2 ){
				jQuery('#list4').jqGrid('restoreRow',lastsel2);
				jQuery('#list4').jqGrid('editRow',id,true);
				lastsel2=id;
			}
		}, */
		height: "auto",
		/* cellEdit : true,
		cellsubmit : 'clientArray',
		
		onCellSelect: function(rowid, iCol, cellcontent){
			console.log("rowid->" + rowid);
			console.log("iCol->" + iCol);
			console.log("cellcontent->" + cellcontent);
			jQuery('#list4').jqGrid('editCell',rowid, iCol, true);
			var test = jQuery('#list4').jqGrid('getChangedCells',"dirty");
			console.log(test);
			// 
		}, */

	   	multiselect: false,
	   	caption: "JSON Example"
	});
	/* var mydata = [
				{timeoff_type:"Vacation", sun:"", mon:"", tue:"", wed:"", thu:"", fri:"", sat:"", weekly_total:"", ytd_total:""},
				{timeoff_type:"Sick Leave", sun:"", mon:".00", tue:"", wed:"8.00", thu:"8.00", fri:"", sat:"", weekly_total:"", ytd_total:""},
				{timeoff_type:"Floating Holiday", sun:"", mon:"", tue:"8.00", wed:"", thu:"8", fri:"", sat:"", weekly_total:"", ytd_total:""},
				{timeoff_type:"Jury Duty", sun:"", mon:".00", tue:"", wed:"8.00", thu:"", fri:"", sat:"", weekly_total:"", ytd_total:""},
				{timeoff_type:"Time Off Without Pay", sun:"", mon:"", tue:"", wed:"", thu:"8", fri:"8.00", sat:"", weekly_total:"", ytd_total:""},
				{timeoff_type:"Bereavement", sun:"", mon:".00", tue:"8.00", wed:"8.00", thu:"", fri:"8.00", sat:"", weekly_total:"", ytd_total:""},
			];
	for(var i=0;i<=mydata.length;i++){
		jQuery("#list4").jqGrid('addRowData',i+1,mydata[i]);
	} */
}

</script>
</head>
<body>
<table id="list4"></table>
<div id="pager2"></div>
</body>
</html>