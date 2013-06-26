function loadBuildTestTargetGoalGrid(appTree,divId,pdivId){	

	var buildTestTargetGoalArr={};
	jQuery("#rowed-build-test-target-goal-grid").jqGrid({
	   	url:baseUrl+'/admin/jenkin-servers/get-build-test-target-goal-aggr-for-grid/appTree/'+appTree,
		datatype: "json",	   	
		colNames:['', 'Target', 'Goal','Modified By', 'Modified On','Action'],
		colModel:[
			   		{name:'metrics',index:'metrics', width:180,shrinkToFit:true, editable:false,sortable:false,
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}
			   		},	
			   		
			   		{name:'target',index:'target', align:"center",width:80,editable:true, sortable:false,
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}
			   			
			   		},
			   		{name:'goal',index:'goal', width:80, align:"center",editable:true,sortable:false,
			   				cellattr:function (rowId, tv, rawObject, cm, rdata) 
				   			{ 
				   				return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
				   			}
			   		}	,
			   		{name:'last_modified_by',index:'last_modified_by', width:150, align:"center",editable:false,
		   				cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}
		   		},		
		   		
		   		
		   		{name:'last_modified_on',index:'last_modified_on', width:150, align:"center",editable:false, sorttype:"date"},		
				{name:'act',index:'act', width:180,sortable:false,align:"center"}
			   	
			   	],
	   	width: 800,
	   	rowNum: 15,
	   	rowList:[10,20,30,40,50],
	   	height:'auto',
	   	pager: '#p-rowed-build-test-target-goal-grid',
	    viewrecords: true,
		editurl: baseUrl+"/admin/jenkin-servers/save-build-test-target-goal",
		
		loadComplete: function(data){
		
			
			buildTestTargetGoalArr=data;
			$("#rowed-build-test-target-goal-grid").parents('div.ui-jqgrid-bdiv').css("max-height","300px");
			var ids = jQuery("#rowed-build-test-target-goal-grid").jqGrid('getDataIDs');
			if(data.total>0 && data.hasAccesstoBuildTestTargetGoal=="true")
			{
			var dataRows=data['rows'];
			
			for(var i=0;i<dataRows.length;i++){
				var cl = ids[i];
				be = "<input style='height:22px;width:40px;text-align:center' type='button' value='Edit' onclick=\"jQuery('#rowed-build-test-target-goal-grid"+"').jqGrid('editRow','"+cl+"');\"  />"; 
				se = "<input style='height:22px;width:40px;text-align:center' type='button' value='Save' onclick=\"saveBuildTestTargetGoal('rowed-build-test-target-goal-grid"+"','"+cl+"','"+data.build_type+"','"+dataRows[i].metrics_key+"','"+appTree+"');\" />"; 
				ce = "<input style='height:22px;width:50px;text-align:center' type='button' value='Cancel' onclick=\"jQuery('#rowed-build-test-target-goal-grid"+"').jqGrid('restoreRow','"+cl+"');\" />"; 
				jQuery("#rowed-build-test-target-goal-grid").jqGrid('setRowData',ids[i],{act:be+se+ce});
				$("#rowed-build-test-target-goal-grid").jqGrid('showCol', 'act');
			}
			jQuery("#ed-build-test").show();
			}
			else
				{
				$("#rowed-build-test-target-goal-grid").jqGrid('hideCol', 'act');
				jQuery("#ed-build-test").hide();
				}
			//setTooltipsOnColumnHeader($("#rowed4"),1,"Add alias seperated by comma.");
			jQuery("#sved-build-test").hide();
			jQuery("#cancel-build-test").hide();
			jQuery("#ed-build-test").attr("disabled",false);
		},
		caption: "Goal & Target"
	});
	
	
	jQuery("#ed-build-test").click( function() {
		var ids = jQuery("#rowed-build-test-target-goal-grid").jqGrid('getDataIDs');
		for (var i = 0; i < ids.length; i++) {jQuery("#rowed-build-test-target-goal-grid").jqGrid('editRow',ids[i]);};
		this.disabled = 'true';
		jQuery("#sved-build-test").show();
		jQuery("#cancel-build-test").show();
		

	});
	
	jQuery("#sved-build-test").click( function() 
	{
		var paras={};
		var selRowIds =  jQuery("#rowed-build-test-target-goal-grid").jqGrid('getDataIDs');
		var changedRowIds={};
		var dataRows=buildTestTargetGoalArr['rows'];
		var j=0;
		for(var i=0;i<dataRows.length;i++){
			var targetVal=getCellValue(dataRows[i].id, 'target');
			var goalVal=getCellValue(dataRows[i].id, 'goal');
			console.log(selRowIds[i]);
			if(dataRows[i].cell[1]!=targetVal || dataRows[i].cell[2]!=goalVal)
				{
					paras[dataRows[i].id+'_target']=targetVal;
					paras[dataRows[i].id+'_goal']=goalVal;
					changedRowIds[j]=dataRows[i].id;
					j++;
				}
			}
		if(!jQuery.isEmptyObject(paras))
			{
				//paras['selRowIds']=changedRowIds.substring(0,changedRowIds.length-1);
				paras['selRowIds']=changedRowIds;
				paras['organization']=buildTestTargetGoalArr.organization;
				paras['build_type']=buildTestTargetGoalArr.build_type;
				$.ajax({
				type: "POST",
				url: baseUrl+"/admin/jenkin-servers/save-multiple-build-test-target-goal",
				data:paras,
				success: function(msg){
					 jQuery("#rowed-build-test-target-goal-grid").trigger("reloadGrid"); 
				},
				error:function()
				{
					alert("failed");
					 jQuery("#rowed-build-test-target-goal-grid").trigger("reloadGrid"); 
				}
				});
			}
		else
			{
			 jQuery("#rowed-build-test-target-goal-grid").trigger("reloadGrid"); 
			}
			jQuery("#ed-build-test").attr("disabled",false);
			jQuery("#sved-build-test").hide();
			jQuery("#cancel-build-test").hide();
		
	});
	jQuery("#cancel-build-test").click( function() {
		$("#rowed-build-test-target-goal-grid").trigger("reloadGrid"); 
		jQuery("#ed-build-test").attr("disabled",false);
		jQuery("#sved-build-test").hide();
		jQuery("#cancel-build-test").hide();	});
	
}

function reloadBuildTestTargetGoalGrid(divId)
{
	console.log("inside reloadBuildTestTargetGoalGrid");
	$("#rowed-build-test-target-goal-grid").trigger("reloadGrid"); 
}
function saveBuildTestTargetGoal(divId,rowId,build_type,metrics_key,appTree)
{
	jQuery('#rowed-build-test-target-goal-grid').jqGrid(
			'saveRow',
			rowId,
			{
				extraparam:{'build_type':build_type,'metrics_key':metrics_key,'appTree':appTree},
				aftersavefunc:function (rowid, response ) {
					$("#rowed-build-test-target-goal-grid").trigger("reloadGrid");
				}
			});
			
			 
	
}

function createTestBuildTypeSelectBox()
{
	$.ajax({
		  url: baseUrl+'/admin/jenkin-servers/get-build-types-for-test-build',
		  dataType:'json',
		  success: function(data) {
			 if(data) {
				
				         jQuery('#build-test-target-goal').prepend('<span style="padding-right:10px;">Build Type:</span><select id="test_build_select_box"></select>');
				         jQuery.each(data.optionsArr, function(val, text) {
				                 jQuery('#test_build_select_box').append(
				                 jQuery('<option></option').val(val).html(text)
				         );});
				        // $("#test_build_select_box option:contains(" + data.defaultType + ")").attr('selected', 'selected');
				         $("#test_build_select_box").val(  data.defaultType);
				     	$('#test_build_select_box').change(function(){
				   		 var val = $(this).find('option:selected').val();
				   		 jQuery("#rowed-build-test-target-goal-grid").jqGrid('setGridParam',{url:baseUrl+'/admin/jenkin-servers/get-build-test-target-goal-aggr-for-grid/appTree/'+appTree+"/build_type/"+val,rowNum:10,datatype:"json" });
				   		 loadBuildTestTargetGoalGrid(appTree,"rowed-build-test-target-goal-grid","p-rowed-build-test-target-goal-grid");
				   		jQuery("#rowed-build-test-target-goal-grid").trigger('reloadGrid');
				   	});
			
 
			}else{
				 	
				 
			}
		   
		  }
		});
}

