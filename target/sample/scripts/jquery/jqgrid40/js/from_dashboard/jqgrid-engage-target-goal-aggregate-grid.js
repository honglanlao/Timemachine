var ci_engage_target_goal_metrics = {'Build' : 'build', 
		                              'Unit Test' : 'unittest',
		                              'Code Coverage' : 'cc',
		                              'BAT' : 'bat',
		                              'Functional' : 'functest'};

var engageTargetGoalFromBackendArr={};
function loadEngageTargetGoalAggregateGrid(appTree)
{
		jQuery("#engage-target-goal-aggregate-grid").jqGrid({
		   	url:baseUrl+'/admin/jenkin-servers/get-engage-target-goal-aggr-for-grid/appTree/'+appTree,
			datatype: "json",
		   	colNames:['', 'Target', 'Goal','Modified By','Modified On','Action'],
		   	colModel:[
		   		{name:'build_type',index:'build_type', width:180,shrinkToFit:true, editable:false,sortable:false,
		   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}
		   		},	
		   		
		   		{name:'target',index:'target', width:100,align:"center",editable:true,
		   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}
		   			
		   		},
		   		{name:'goal',index:'goal', width:100, align:"center",editable:true,
		   				cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}
		   		},	
		   		{name:'last_modified_by',index:'last_modified_by', width:140, align:"center",editable:false,
	   				cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}
	   		},		
	   		{name:'last_modified_on',index:'last_modified_on', width:150, align:"center",editable:false, sorttype:"date"},
		   		{name:'act',index:'act', width:100,sortable:false,align:"center"}
		   	],
		   	width:'auto',
		   	rowNum:10,
		   	rowList:[10,20,30,40,50],
		   	height:'auto',
		   	pager: '#pengage-target-goal-aggregate-grid',
		    viewrecords: true,
		    editurl: baseUrl+"/admin/jenkin-servers",
		    loadComplete: function(data){
				$("#engage-target-goal-aggregate-grid").parents('div.ui-jqgrid-bdiv').css("max-height","300px");
				var ids = $("#engage-target-goal-aggregate-grid").jqGrid('getDataIDs');
				if(data.total>0)
				{
					
					var dataRows=data['rows'];
					engageTargetGoalFromBackendArr=data;
					for(var i=0;i<dataRows.length;i++)
					{
						var cl = ids[i];
	
					if(data.accessToOrg=="true" && data.isLeaf===true)
						{
						editSingleEngageTergetGoal(cl,dataRows[i].cell[1],dataRows[i].cell[2],dataRows[i].metricsKey);
						//console.log(dataRows[i]);
							var button_prefix = ci_engage_target_goal_metrics[dataRows[i].cell[0]];
							var se = "<input id='" + button_prefix + "_save" + "' style='height:22px;width:40px;text-align:center' type='button' value='Save' onclick=\"saveSingleTargetGoal('engage-target-goal-aggregate-grid','"+cl+"','"+data.app_id+"','"+dataRows[i].metricsKey+"');\" />"; 
							var ce = "<input id='" + button_prefix + "_cancel" + "' style='height:22px;width:50px;text-align:center' type='button' value='Cancel' onclick=\"$('#engage-target-goal-aggregate-grid').trigger('reloadGrid'); \" />"; 
							jQuery("#engage-target-goal-aggregate-grid").jqGrid('setRowData',ids[i],{act:se+ce});
							$("#engage-target-goal-aggregate-grid").jqGrid('showCol', 'act');
							$('#view-engage-target-goal-btn').hide();
							$('#engage-target-goal-mutli-save-btn').show();
							$('#engage-target-goal-cancel-changes-btn').show();
						}
					else if(data.accessToOrg=="false" && data.isLeaf===true)
						{
							
							if(dataRows[i].cell[1]=="100%")
							{
								var right_check_img_target="<img src='"+baseUrl+"/images/right_check.jpg' title='100%' width='12px' height='12px'/>";	
								jQuery("#engage-target-goal-aggregate-grid").jqGrid('setRowData',ids[i],{target:right_check_img_target});
							}
						else
							{
							jQuery("#engage-target-goal-aggregate-grid").jqGrid('setRowData',ids[i],{target:''});
							}
						if(dataRows[i].cell[2]=="100%")
							{
								var right_check_img_goal="<img src='"+baseUrl+"/images/right_check.jpg' title='100%' width='12px' height='12px'/>";		
								jQuery("#engage-target-goal-aggregate-grid").jqGrid('setRowData',ids[i],{goal:right_check_img_goal});
							}
						else
							{
								jQuery("#engage-target-goal-aggregate-grid").jqGrid('setRowData',ids[i],{goal:''});
							}
							$("#engage-target-goal-aggregate-grid").jqGrid('hideCol', 'act');
							$('#view-engage-target-goal-btn').hide();
							$('#engage-target-goal-mutli-save-btn').hide();
							$('#engage-target-goal-cancel-changes-btn').hide();
						}
					else
						{
						$("#engage-target-goal-aggregate-grid").jqGrid('hideCol', 'act');
						$('#view-engage-target-goal-btn').show();
						$('#engage-target-goal-mutli-save-btn').hide();
						$('#engage-target-goal-cancel-changes-btn').hide();
						}
					}
				}
				else
					{
					$("#engage-target-goal-aggregate-grid").jqGrid('hideCol', 'act');
					}
			},
				gridComplete: function(){
					$("#engage-target-goal-aggregate-grid").parents('div.ui-jqgrid-bdiv').css("max-height","300px");
				},
				caption: "Ci Engagement Target Goal"
			});

}

function editSingleEngageTergetGoal(rowId,target,goal,metricsKey)
{
	var targetVal='';
	var targetChecked='';
	var goalVal='';
	var goalChecked='';
	//console.log("targetVal "+target+", goalVal "+goal);
	if(target=="100%")
		{
			targetVal="100";
			targetChecked="checked='checked'";
		}
	else
		{
			targetVal="0";
			targetChecked="";
		}
	if(goal=="100%")
	{
		goalVal="100";
		goalChecked="checked='checked'";
	}
	else
	{
		goalVal="0";
		goalChecked="";
	}
	
	var targetCheckBox="<input id='"+metricsKey+"_target' type='checkbox' offval='no' value='"+targetVal+"' name='"+metricsKey+"_target' "+targetChecked+"/>";
	//jQuery("#engage-target-goal-aggregate-grid").jqGrid('setRowData',rowId,{target:targetCheckBox});
	var goalCheckBox="<input id='"+metricsKey+"_goal' type='checkbox' offval='no'  value='"+goalVal+"' name='"+metricsKey+"_goal' "+goalChecked+"/>";
	jQuery("#engage-target-goal-aggregate-grid").jqGrid('setRowData',rowId,{target:targetCheckBox,goal:goalCheckBox});
	//jQuery('#engage-target-goal-aggregate-grid').jqGrid('editRow',rowId);
}
function saveSingleTargetGoal(divId,rowId,appId,metricsKey)
{
	var paras={};
	 paras['metricsKey']={};
	//console.log("rowId "+rowId+","+" metricsKey "+metricsKey+" appTree "+appTree);
	////console.log(("#"+metricsKey+"_target" ).val());
	var red_alert = '';
	var targetVal= $("input#" + metricsKey +"_target").is(':checked') ? '100' : '0';
	var goalVal= $("input#" + metricsKey +"_goal").is(':checked') ? '100' : '0';
	if(targetVal == 100 && goalVal == 0){	
		$("input#" + metricsKey +"_goal").parent().css('background-color', 'red');
		red_alert =  "<p style='font-size:15px;color:red'>Goal must be given if target is set, please fix it</p>";
	}else{
		$("input#" + metricsKey +"_goal").parent().css('background-color', '');
	}

	if(red_alert != ''){
		$('#view-engage-target-goal-alert').html(red_alert);
		$engage_target_goal_pop_alert = $('#view-engage-target-goal-alert').dialog({
		  autoOpen: false,
		    title: 'Error',
		    modal: true,
		    position: 'center',
		    width: 400,
		    height: 100,	
		    margin: 'auto'
		});
		$engage_target_goal_pop_alert.dialog('open');
		return false;
	}  
	paras['metricsKey'][0]=metricsKey;
	paras['appId']=appId;
	paras[metricsKey+"_target"]=targetVal;
	paras[metricsKey+"_goal"]=goalVal;
	if(!jQuery.isEmptyObject(paras))
	{
		
		$.ajax({
		type: "POST",
		url: baseUrl+"/admin/jenkin-servers/save-engage-target-goal-by-metrics-key",
		data:paras,
		success: function(msg){
			$("#"+divId).trigger("reloadGrid"); 
		},
		error:function()
		{
			alert("failed");
			$("#"+divId).trigger("reloadGrid"); 
		}
		});
	}

}
$(function() {
jQuery("#engage-target-goal-mutli-save-btn").click( function() 
		{
			
	var paras={};
	 paras['metricsKey']={};
	var dataRows=engageTargetGoalFromBackendArr['rows'];
	
	var j=0;
	var red_alert = '';
	
	for(var i=0;i<dataRows.length;i++)
	{
		var targetBackend=dataRows[i].cell[1];
		var goalBackend=dataRows[i].cell[2];
		var metricsKey= dataRows[i].metricsKey;
		
		var targetVal= $("input#" + metricsKey +"_target").is(':checked') ? '100' : '0';
		var goalVal= $("input#" + metricsKey +"_goal").is(':checked') ? '100' : '0';
		//console.log("targetVal "+targetVal);
		//console.log("targetBackend "+targetBackend);
		var red_alert_each = '';
		if(targetVal == 100 && goalVal == 0){	
			red_alert_each = "<li style='margin-left:4em'>" + metricsKey + '</li>';
			$("input#" + metricsKey +"_goal").parent().css('background-color', 'red');
		}else{
			$("input#" + metricsKey +"_goal").parent().css('background-color', '');
		}
		if(targetVal+"%" !=targetBackend || goalVal+"%"!=goalBackend){	
			paras['metricsKey'][j]=metricsKey ;
			paras[metricsKey+"_target"]=targetVal ;
			paras[metricsKey+"_goal"]=goalVal ;
			j++;
		}
		if(red_alert_each != ''){
			red_alert +=  "<p>" + metricsKey + '<br/>' + "<ul style='font-size:12px;color:red'>" + red_alert_each + "</ul>";	
		}
	}
	//console.log(paras);
	if(red_alert != ''){
		red_alert = "<p style='font-size:15px;color:red'>Goal must be given if target is set, please fix it</p>";
		$('#view-engage-target-goal-alert').html(red_alert);
		$engage_target_goal_aggr_alert = $('#view-engage-target-goal-alert').dialog({
		  autoOpen: false,
		    title: 'Error',
		    modal: true,
		    position: 'center',
		    width: 400,
		    height: 100,	
		    margin: 'auto'
		});
		$engage_target_goal_aggr_alert.dialog('open');
		return false;
	}
	
	if(!jQuery.isEmptyObject(paras['metricsKey']))
	{
		paras['appId']=engageTargetGoalFromBackendArr.app_id;
		$.ajax({
		type: "POST",
		url: baseUrl+"/admin/jenkin-servers/save-engage-target-goal-by-metrics-key",
		data:paras,
		success: function(msg){
			$("#engage-target-goal-aggregate-grid").trigger("reloadGrid"); 
		},
		error:function()
		{
			alert("failed");
			$("#engage-target-goal-aggregate-grid").trigger("reloadGrid"); 
		}
		});
	}	
			
		});

$('#engage-target-goal-cancel-changes-btn').click( function(e) {
	$("#engage-target-goal-aggregate-grid").trigger("reloadGrid"); 
});


});
$(function() {
	jQuery("#view-engage-target-goal-btn").click( function(e) {
		$("#engage-target-goal-pop").setGridParam({datatype: 'json'}); 
		$("#engage-target-goal-pop").setGridParam({page: 1}); 
		firstLoad = true;
		$("#engage-target-goal-pop").trigger("reloadGrid");
		$("#view-engage-target-goal-dialog" ).dialog( "destroy" );
		$( "#gbox_engage-target-goal-pop").removeClass('ui-widget');
		$engage_target_goal_pop_dialog = $('#view-engage-target-goal-dialog').dialog({
		    autoOpen: false,
		    title: appName+" CI Engagement Target & Goal",
		    modal: true,
		    position: 'center',
		    width: 'auto',
		    height: 'auto',	
		    margin: 'auto'
		}).bind("dialogopen", function (event, ui) {

	        // fix for width:auto in IE  
	       
	        var contentWidth = $(this).width();
	        $(this).parent().find('.ui-dialog-titlebar').each(function () {
	            $(this).width(contentWidth);
	        });
	        
	        //SDB-23 
	        if($('#view-engage-target-goal-alert').html() != ''){
		        $engage_target_goal_pop_alert = $('#view-engage-target-goal-alert').dialog({
					  autoOpen: false,
					    title: 'Warning',
					    modal: true,
					    position: 'center',
					    width: 500,
					    height: 'auto',	
					    margin: 'auto'
					});
				$engage_target_goal_pop_alert.dialog('open');
	        }
	        
	        

	    }).bind("dialogclose", function (event, ui) {
	        //fix for width:auto in IE 
	        $(this).parent().css("width", "auto"); 
	    });
		e.preventDefault();
		$engage_target_goal_pop_dialog.dialog('open');
		
		
	});   

	});