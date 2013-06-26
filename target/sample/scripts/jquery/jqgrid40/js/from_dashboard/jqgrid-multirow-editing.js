
var jenkinsAliasArr={};
function loadJenkinsAliasGrid(appTree)
{
	$.getJSON("/admin/help/?id=jenkins_alias_short", function(json) {
		jQuery("#rowed4").jqGrid({
		   	url:baseUrl+'/admin/jenkin-servers/get-jenkins-alias-for-grid/appTree/'+appTree,
			datatype: "json",
		   	colNames:['App Name', 'Alias'+"<img id='user-level-tip' src='"+baseUrl+"/images/help.gif' class='helptipimage helptip' title='"+json.helptip+"'/>", 'Modified By', 'Modified On','Action'],
		   	colModel:[
		   		{name:'app_name',index:'app_name', width:180,shrinkToFit:true, editable:false,
		   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}
		   		},	
		   		
		   		{name:'jenkins_alias',index:'jenkins_alias', width:200,editable:true, 
		   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}
		   			
		   		},
		   		{name:'alias_modified_by',index:'alias_modified_by', width:140, align:"center",editable:false,
		   				cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}
		   		},		
		   		
		   		
		   		{name:'alias_modified_on',index:'alias_modified_on', width:150, align:"center",editable:false, sorttype:"date"},		
				{name:'act',index:'act', width:140,sortable:false,align:"center"}
		
		   	],
		   	width:860,
		   	rowNum:10,
		   	rowList:[10,20,30,40,50],
		   	height:'auto',
		   	pager: '#prowed4',
		   	sortname: 'app_name',
		    viewrecords: true,
		    sortorder: "desc",
			editurl: baseUrl+"/admin/jenkin-servers/save-single-jenkins-alias",
			
			loadComplete:function(data){
				jenkinsAliasArr=data.app_jenkin_alias_arr;
				if(data.total>0 && data.accessToOrg=="1")
					{
					jQuery("#rowed4").jqGrid('showCol', 'act');
					}
				else
					{
					jQuery("#rowed4").jqGrid('hideCol', 'act');
					}
			},
			gridComplete: function(){
				$("#rowed4").parents('div.ui-jqgrid-bdiv').css("max-height","300px");
	
				var ids = jQuery("#rowed4").jqGrid('getDataIDs');
				for(var i=0;i<ids.length;i++){
					var cl = ids[i];
					be = "<input style='height:22px;width:40px;text-align:center' type='button' value='Edit' onclick=\"jQuery('#rowed4').jqGrid('editRow','"+cl+"');\"  />"; 
					se = "<input style='height:22px;width:40px;text-align:center' type='button' value='Save' onclick=\"saveSingleRow('"+cl+"');\"  />"; 
					ce = "<input style='height:22px;width:50px;text-align:center' type='button' value='Cancel' onclick=\"jQuery('#rowed4').jqGrid('restoreRow','"+cl+"');\" />"; 
					jQuery("#rowed4").jqGrid('setRowData',ids[i],{act:be+se+ce});
				}
				
				//setTooltipsOnColumnHeader($("#rowed4"),1,"Add alias seperated by comma.");
			},
			
			caption: "Jenkins Alias"
		});
	});
	
	jQuery("#ed4").click( function() {
		var ids = jQuery("#rowed4").jqGrid('getDataIDs');
		for (var i = 0; i < ids.length; i++) {jQuery("#rowed4").jqGrid('editRow',ids[i]);};
		this.disabled = 'true';
		jQuery("#sved4").show();
		jQuery("#canced4").show();

	});
	
	jQuery("#sved4").click( function() 
	{
		var paras={};
		var selRowIds = jQuery("#rowed4").jqGrid('getDataIDs');
		var changedRowIds='';
		for(var i=0;i<selRowIds.length;i++){
			var row=getCellValue(selRowIds[i], 'jenkins_alias');
			console.log("row"+row);
			console.log(jenkinsAliasArr);
			if(jenkinsAliasArr[selRowIds[i]]!=row && row!='')
				{
				paras['jenkins_alias_'+selRowIds[i]]=row;
				changedRowIds+=selRowIds[i]+",";
				}
			}
		if(!jQuery.isEmptyObject(paras))
			{
				paras['selRowIds']=changedRowIds;
				$.ajax({
				type: "POST",
				url: baseUrl+"/admin/jenkin-servers/save-multiple-jenkins-alias",
				data:paras,
				success: function(msg){
					$("#rowed4").trigger("reloadGrid"); 
				},
				error:function()
				{
					alert("failed");
					$("#rowed4").trigger("reloadGrid"); 
				}
				});
			}
		else
			{
			$("#rowed4").trigger("reloadGrid"); 
			}
			jQuery("#ed4").attr("disabled",false);
			jQuery("#sved4").hide();
			jQuery("#canced4").hide();
			
		
	});
	jQuery("#canced4").click( function() {
		$("#rowed4").trigger("reloadGrid"); 
		jQuery("#ed4").attr("disabled",false);
		jQuery("#sved4").hide();
		jQuery("#canced4").hide();	});
}
function checksave(result) {
	if (result.responseText=="") {alert("Update is missing!"); return false;}
	return true;
}
function getCellValue(rowId, cellId) {
    var cell = jQuery('#' + rowId + '_' + cellId);        
    var val = cell.val();
    return val;
}

function saveSingleRow(rowid)
{
jQuery("#rowed4").jqGrid('saveRow',rowid, 
		{ 
	aftersavefunc: function(rowid, response ) {
		    	$("#rowed4").trigger("reloadGrid"); 
		    }
		});
}


