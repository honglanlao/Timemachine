var app_name_app_id_map = {};
var build_test_target_goal_metrics = {'build' : 'Build', 
		                              'unittest' : 'Unit Test',
		                              'cc' : 'Code Coverage', 
		                              'bat' : 'BAT', 
		                              'functest' : 'Functional Test'};
var organization;
var paras = {};
var lastSuccessPage=1;
var ciEngageTargetGoalArr = {};
var firstLoad = true;
var exception_rows = [];
function loadEngageTargetGoalAppLevelGrid(appTree, divID){	
	ciEngageTargetGoalArr = {};
	firstLoad = true;
	jQuery("#" + divID).jqGrid({
	   	url:baseUrl+'/admin/jenkin-servers/get-engage-target-goal-app-level-for-grid/appTree/'+appTree,
		datatype: "json",
		colNames:['Organization', 'Target', 'Goal', 'Target', 'Goal', 'Target', 'Goal', 'Target', 'Goal', 'Target', 'Goal', 'By', 'On'],
	   	colModel:[
	   		{name:'app_name',index:'app_name', width:150, align: 'right', shrinkToFit:true, editable:false,sortable:false,
	   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
	   			}
	   		},	
	   		
	   		{name:'build_target',index:'build_target', width:50, align: 'center', editable:true, edittype:'checkbox',sortable:false,
	   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
	   			}
	   			
	   		},
	   		{name:'build_goal',index:'build_goal', width:50, align:"center",editable:true,sortable:false,
	   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   		{ 
		   			return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   		}
	   		},		
	   		{name:'unittest_target',index:'unittest_target', width:50, align:"center",editable:true,sortable:false,
   				cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
	   			}
	   		},	
	   		{name:'unittest_goal',index:'unittest_goal', width:50, align:"center",editable:true, sortable:false,
				cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
	   			}
	   		},	
			{name:'cc_target',index:'cc_target', width:50, align:"center",editable:true,sortable:false, 
					cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
	   			}
			},	
			{name:'cc_goal',index:'cc_goal', width:50, align:"center",editable:true,sortable:false, 
					cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
	   			}
			},	
			{name:'bat_target',index:'bat_target', width:50, align:"center",editable:true,sortable:false,
				cellattr:function (rowId, tv, rawObject, cm, rdata) 
	   			{ 
	   				return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
	   			}
			},	
			
			{name:'bat_goal',index:'bat_goal', width:50, align:"center",editable:true,sortable:false,
				cellattr:function (rowId, tv, rawObject, cm, rdata) 
				{ 
					return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
				}
			},	
			{name:'functest_target',index:'functest_target', width:50, align:"center",editable:true,sortable:false, 
				cellattr:function (rowId, tv, rawObject, cm, rdata) 
				{ 
					return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
				}
			},	
			{name:'functest_goal',index:'functest_goal', width:50, align:"center",editable:true, sortable:false,
				cellattr:function (rowId, tv, rawObject, cm, rdata) 
				{ 
					return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
				}
			},
			{name:'last_modified_by',index:'last_modified_by', width:140, align:"center",editable:true,sortable:false,
				cellattr:function (rowId, tv, rawObject, cm, rdata) 
				{ 
					return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
				}
			},
			{name:'last_modified_on',index:'last_modified_on', width:140, align:"center",editable:true,sortable:false,
				cellattr:function (rowId, tv, rawObject, cm, rdata) 
				{ 
					return 'style="height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
				}
			}
			
	   		
	
	   	],
	   	width: 'auto',
	   	rowNum: 10,
	   	rowList:[10,20,30,40,50],
	   	height:'auto',
	   	pager: "#p-" + divID,
	   	sortname: 'app_name',
	    loadonce:true,
	    viewrecords: true,
	 //   sortorder: "desc",
		editurl: baseUrl+"/admin/jenkin-servers/save-engage-target-goal",

		loadComplete: function(data){
			var colModel = jQuery("#" + divID).jqGrid('getGridParam', 'colModel');
			console.log($("#" + divID).getGridParam('datatype'));
		//	ciEngageTargetGoalArr = data;
			if (firstLoad) {	
				ciEngageTargetGoalArr = data;
				accessToOrg = data.accessToOrg; 
			}
		        
			var currentPage = $("#" + divID).getGridParam('page');
			lastSuccessPage = currentPage;
			console.log("current loadcomplete  " + currentPage);
			
			organization = ciEngageTargetGoalArr.organization;
		//	if(ciEngageTargetGoalArr.total>0){
		//		accessToOrg = ciEngageTargetGoalArr.accessToOrg; 
		//	}
			$("#"+divID).parents('div.ui-jqgrid-bdiv').css("max-height","300px");

			var ids = jQuery("#"+divID).jqGrid('getDataIDs');
		//	var exception_app = '';
			for(var i=ids[0];i<=ids[ids.length-1];i++){
				var cl = i;
				var rowID = i - ids[0];
			//	if(firstLoad){
					var app_id = ciEngageTargetGoalArr.rows[i-1]['app_id'];
			//	}else{
			//		var app_id = ciEngageTargetGoalArr.rows[i-1]['app_id'];

				//	 var app_id = ciEngageTargetGoalArr.rows[data['rows'][i]['_id_']-1]['app_id'];
			//	}	
			//	//console.log("cl app_id is " + data.rows[i]['app_id']);
				if(firstLoad){
					var rowData = jQuery('#engage-target-goal-pop').jqGrid('getRowData', cl);
				}else{
					// create mapping
					var rowData = {};
					for(var idx in colModel){
						
						rowData[colModel[idx]['name']] = ciEngageTargetGoalArr.rows[cl-1]['cell'][idx];
					}
				}
				

				var newRowDataJsonString = "{";
				// each column
				var colIndex = 0;
				for(var index_name in rowData){
					
					if(index_name == 'app_name'){
						var app_name = rowData[index_name];
						 app_name_app_id_map[organization + ":" + app_name] = app_id;
					}
					var ratio = rowData[index_name];
					
				//	console.log("app_id -> " + app_id);
				//	console.log("app_name -> " + app_name);
				//    console.log("ratio -> " + ratio);
					
					var check_box = "";
					if(ratio != ""){
						if( ! isNaN(ratio)){
							if(ratio == 100){
								if(accessToOrg){
									// set checked = true
									check_box = "<input id='" + app_id + "__" + cl + "__" + rowID + "__" + colIndex + "__" + index_name + "' type='checkbox' value='100' offval='no' checked='true' />";
								}else{
									check_box = "<input id='" + app_id + "__" + cl + "__" + rowID + "__" + colIndex + "__" + index_name + "' type='checkbox' value='true' offval='no' checked='yes' disabled='disabled'/>";
								}
							}else{
								if(accessToOrg){
									check_box = "<input id='" + app_id + "__" + cl + "__" + rowID + "__" + colIndex + "__" + index_name + "' type='checkbox' value='0' offval='no' />";
								}else{
									check_box = "<input id='" + app_id + "__" + cl + "__" + rowID + "__" + colIndex + "__" + index_name + "' type='checkbox' value='false' offval='no' disabled='disabled'/>";
								}
							}
							newRowDataJsonString +=  index_name + ":\"" + check_box + "\",";
						}
						
					}
					colIndex++;
				}
				if(newRowDataJsonString[newRowDataJsonString.length - 1] == ','){
					newRowDataJsonString = newRowDataJsonString.substring(0, newRowDataJsonString.length - 1);
				}
				newRowDataJsonString += "}";
			//	console.log(newRowDataJsonString);
				jQuery("#engage-target-goal-pop").jqGrid('setRowData',cl,eval("(" + newRowDataJsonString + ")"));

			}
			firstLoad = false;
		//	console.log("exception app -> " + exception_app);
			
			var exception_rows = ciEngageTargetGoalArr.exception_rows;
			var exception_msg = "<p style='font-size:15px'>Target/Goal NOT set for below apps, please fix it</p>";
			for(var idx  in exception_rows){
				exception_msg += "<p style='font-size:15px;color:red'>" + exception_rows[idx]['app_name'] + "</p>";
			}
			if(exception_rows.length == 0) {
				$('#view-engage-target-goal-alert').html("");
			}else{
				$('#view-engage-target-goal-alert').html(exception_msg);
			}  
			

			jQuery("#gview_" + divID + " input[type='checkbox']").change(function(){
			//	console.log($(this));
			//	console.log($(this).attr('checked'));
			//	console.log($(this).attr('offval'));
			//	console.log($(this).is(':checked'));
			//	console.log($(this).attr('id'));
				
				var id = $(this).attr('id');
				var app_id = id.split("__")[0];
				var cl = id.split("__")[1];
				var rowID = id.split("__")[2];
				var colIndex = id.split("__")[3];
				var colName = id.split("__")[4];
				console.log('app_id -> ' + app_id);
				console.log('colName -> ' + colName);	
				var checked = $(this).is(':checked');
				if(paras[app_id] == null){
					paras[app_id] = {};
				}
				console.log("rowID -> " + rowID);
				
				paras[app_id][colName] = checked ? '100' : '0';
				// modify ciEngageTargetGoalArr
				ciEngageTargetGoalArr['rows'][cl-1]['cell'][colIndex] = checked ? '100' : '0';
				console.log("new val -> " + ciEngageTargetGoalArr['rows'][cl-1]['cell'][colIndex]);

			});

	/*		if(accessToOrg){
				for(var i=0;i<ids.length;i++){
					var cl = ids[i];
					var eb = "<input style='height:22px;width:40px;text-align:center' type='button' value='Edit' onclick=\"jQuery('#rowed-engage-target-goal').jqGrid('editRow','"+cl+"');\"  />"; 
					var sb = "<input style='height:22px;width:45px;text-align:center' type='button' value='Save' onclick=\"jQuery('#rowed-engage-target-goal').jqGrid('saveRow','"+cl+"');\"  />"; 
					
					var cb = "<input style='height:22px;width:60px;text-align:center' type='button' value='Cancel' onclick=\"jQuery('#rowed-engage-target-goal').jqGrid('restoreRow','"+cl+"');\" />"; 

					jQuery("#"+divID).jqGrid('setRowData',ids[i],{act:""});
				}
			}else{
				jQuery("#sved-engage-target-goal-btn").hide();
				for(var i=0;i<ids.length;i++){
					jQuery("#"+divID).jqGrid('setRowData',ids[i],{act:""});
				}
			}  */
			
			//setTooltipsOnColumnHeader($("#rowed4"),1,"Add alias seperated by comma.");
		},
		
		gridComplete: function(){	
			 $("#" + divID).setGridParam({datatype: 'local'}); 
		},

	    onPaging: function(pgButton){
	    	
	    	//$("#" + divID)	console.log("button ->" + pgButton);
		    //	console.log("last succss page  ->" + lastSuccessPage);
		    //console.log("before try to go to  " + $("#" + divID).getGridParam('page'));	
		    var lastPage = $("#" + divID).getGridParam("lastpage");
		       
		   // console.log("requestedPage"+requestedPage);
		      
		    if(pgButton == 'next_p-' + divID){
			   	$("#" + divID).setGridParam({'page': Number(lastSuccessPage)+1});	    
		    }else if(pgButton == 'prev_p-' + divID){
		   		$("#" + divID).setGridParam({'page': Number(lastSuccessPage)-1});	    
		   	}	    	
			console.log("try to go to  " + $("#" + divID).getGridParam('page'));

			var ids = jQuery("#"+divID).jqGrid('getDataIDs');
			for(var i=0;i<ids.length;i++){
				var cl = ids[i];
				jQuery("#"+divID).jqGrid('saveRow', i);
			}
			var selRowIds = jQuery("#"+divID).jqGrid('getDataIDs');
			//	//console.log("selRowIds -> " + selRowIds);
				var red_alert = '';
				for(var i=0;i<selRowIds.length;i++){
					var red_alert_each = '';
					for(key in build_test_target_goal_metrics){
						var val = build_test_target_goal_metrics[key];
						var app_name = jQuery("#"+divID).jqGrid('getCell',selRowIds[i], 'app_name') + "";
						
						var app_id = ciEngageTargetGoalArr['rows'][selRowIds[i]-1]["app_id"];
						var target_obj = $('input[id^="' + app_id + '"][id$="' + key + '_target' + '"]');
						var goal_obj = $('input[id^="' + app_id + '"][id$="' + key + '_goal' + '"]');

					//	var target_obj = $(jQuery("#"+divID).jqGrid('getCell',selRowIds[i], key + '_target'));
					//	var goal_obj = $(jQuery("#"+divID).jqGrid('getCell',selRowIds[i], key + '_goal'));
						var target_checked = target_obj.is(':checked');
						var goal_checked = goal_obj.is(':checked');
						if(target_checked == true && goal_checked == false){
							red_alert_each += "<li style='margin-left:4em'>" + val + '</li>';
							goal_obj.parent().css('background-color', 'red');
						}else{
							goal_obj.parent().css('background-color', '');
						}
					}
					if(red_alert_each != ''){
						red_alert +=  "<p>" + app_name + '<br/>' + "<ul style='font-size:12px;color:red'>" + red_alert_each + "</ul>";	
					}  
				}
				if(red_alert != ''){
					red_alert = "<p style='font-size:15px;color:red'>Goal must be given if target is set, please fix it</p>";
				//	alert(red_alert);
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
					console.log("stopped");
					console.log("after red alert page number -> " + $("#" + divID).getGridParam('page'));
					
					if($("#" + divID).getGridParam('page')==1){
						$("#" + divID).setGridParam({'page': Number(lastSuccessPage)});	
		    		}
					var requestedPage = $("#" + divID).getGridParam("page");
					if (Number(requestedPage)  >= Number(lastPage)){
			    		$("#" + divID).setGridParam({'page':Number(lastSuccessPage)});	
			    	}  
					return "stop";
				}
	    }
	});	
	
	jQuery("#"+divID).jqGrid('destroyGroupHeader');
	
	jQuery("#"+divID).jqGrid('setGroupHeaders', {
		  useColSpanStyle: false, 
		  groupHeaders:[
			{startColumnName: 'build_target', numberOfColumns: 2, titleText: 'Build'},
			{startColumnName: 'unittest_target', numberOfColumns: 2, titleText: 'Unit Test'},
			{startColumnName: 'cc_target', numberOfColumns: 2, titleText: 'Code Coverage'},
			{startColumnName: 'bat_target', numberOfColumns: 2, titleText: 'BAT'},
			{startColumnName: 'functest_target', numberOfColumns: 2, titleText: 'Functional Test'},
			{startColumnName: 'last_modified_by', numberOfColumns: 2, titleText: 'Last Modified'}
			
		  ]
	});
	
	jQuery("#sved-engage-target-goal-btn").click( function() 
	{
	
		var selRowIds = jQuery("#"+divID).jqGrid('getDataIDs');
	//	console.log("selRowIds -> " + selRowIds);
		var red_alert = '';
		for(var i=0;i<selRowIds.length;i++){
			var app_name = jQuery("#"+divID).jqGrid('getCell',selRowIds[i], 'app_name') + "";
			var rowID = app_name_app_id_map[organization + ":" + app_name];
			var red_alert_each = '';
			
			for(key in build_test_target_goal_metrics){
			
				var val = build_test_target_goal_metrics[key];
				var app_name = jQuery("#"+divID).jqGrid('getCell',selRowIds[i], 'app_name') + "";
				
				var app_id = ciEngageTargetGoalArr['rows'][selRowIds[i]-1]["app_id"];
				var target_obj = $('input[id^="' + app_id + '"][id$="' + key + '_target' + '"]');
				var goal_obj = $('input[id^="' + app_id + '"][id$="' + key + '_goal' + '"]');

				var target_checked = target_obj.is(':checked');
				var goal_checked = goal_obj.is(':checked');
				if(target_checked == true && goal_checked == false){
					red_alert_each += "<li style='margin-left:4em'>" + val + '</li>';
					goal_obj.parent().css('background-color', 'red');
				}else{
					goal_obj.parent().css('background-color', '');
				}
				
			}
			if(red_alert_each != ''){
				red_alert +=  "<p>" + app_name + '<br/>' + "<ul style='font-size:12px;color:red'>" + red_alert_each + "</ul>";	
			}
		}
		if(red_alert != ''){
			red_alert = "<p style='font-size:15px;color:red'>Goal must be given if target is set, please fix it</p>";
		//	alert(red_alert);
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
		
		$.ajax({
			type: "POST",
			url: baseUrl+"/admin/jenkin-servers/save-engage-target-goal",
			data:paras,
			success: function(msg){
				$("#" + divID).setGridParam({datatype: 'json'}); 
				$("#" + divID).setGridParam({page: 1}); 
				$("#" + divID).trigger("reloadGrid");
				
				jQuery("#engage-target-goal-aggregate-grid").trigger('reloadGrid');
			//	jQuery("#engage-target-goal-pop").trigger('reloadGrid');

			//	$("#" + divID).setGridParam({datatype: 'json'}); 
			//	firstLoad = true;
			//	jQuery("#engage-target-goal-pop").setGridParam({ data: ciEngageTargetGoalArr });
			//	jQuery("#engage-target-goal-pop")[0].refreshIndex();
			//	jQuery("#" + divID).trigger('reloadGrid', [{current:true}]);
			//	$("#" + divID).setGridParam({'page': 1});

				$('#view-engage-target-goal-dialog').dialog('close');
			},
			error:function(){
				alert("failed");
			//	$("#"+divID).trigger("reloadGrid"); 
			}
		});
		paras = {};	
	});
	
	jQuery("#canced-engage-target-goal-btn").click( function() {
		$("#"+divID).trigger("reloadGrid"); 
		jQuery("#ed-engage-target-goal-btn").attr("disabled",false);
		jQuery("#sved-engage-target-goal-btn").hide();
		jQuery("#canced-engage-target-goal-btn").hide();	
	});
	
}

