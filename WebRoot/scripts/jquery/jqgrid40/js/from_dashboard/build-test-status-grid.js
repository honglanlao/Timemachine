
var buildTestStatusArr={};
var cmTemplate={title:false};
var cellTemplate = "border:1px solid #FFFFFF;height: 30px !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap" ; 
var build_type_array = ['commit', 'secondary', 'bat'];

function loadBuildTestStatusGrid(appTree)
{
		
	
		
		$.getJSON("/cidashboard/target-goal/get-build-test-target-goal/appTree/"+appTree, function(target_goal) {
			
			var commit_average_tat_target = target_goal['commit']['tat_target'];
			var commit_average_tat_goal = target_goal['commit']['tat_goal'];
			var commit_average_duration_target =  target_goal['commit']['build_duration_target'];
			var commit_average_duration_goal = target_goal['commit']['build_duration_goal']; 
			var commit_test_pass_target = target_goal['commit']['test_pass_target']; 
			var commit_test_pass_goal = target_goal['commit']['test_pass_goal']; 
			
			var secondary_average_tat_target = target_goal['secondary']['tat_target'];
			var secondary_average_tat_goal = target_goal['secondary']['tat_goal'];
			var secondary_average_duration_target =  target_goal['secondary']['build_duration_target'];
			var secondary_average_duration_goal = target_goal['secondary']['build_duration_goal']; 
			var secondary_test_pass_target = target_goal['secondary']['test_pass_target']; 
			var secondary_test_pass_goal = target_goal['secondary']['test_pass_goal']; 
			var secondary_cc_line_ratio_target = target_goal['secondary']['cc_line_ratio_target']; 
			var secondary_cc_line_ratio_goal = target_goal['secondary']['cc_line_ratio_goal']; 
			
			var bat_average_tat_target = target_goal['bat']['tat_target'];
			var bat_average_tat_goal = target_goal['bat']['tat_goal'];
			var bat_average_duration_target =  target_goal['bat']['build_duration_target'];
			var bat_average_duration_goal = target_goal['bat']['build_duration_goal']; 
			var bat_test_pass_target = target_goal['bat']['test_pass_target']; 
			var bat_test_pass_goal = target_goal['bat']['test_pass_goal']; 
			
		/*	var qa_average_tat_target = target_goal['qa']['tat_target'];
			var qa_average_tat_goal = target_goal['qa']['tat_goal'];
			var qa_average_duration_target =  target_goal['qa']['build_duration_target'];
			var qa_average_duration_goal = target_goal['qa']['build_duration_goal']; 
			var qa_test_pass_target = target_goal['qa']['test_pass_target']; 
			var qa_test_pass_goal = target_goal['qa']['test_pass_goal'];    */
			
			
			
			
				jQuery("#build_test_status_grid").jqGrid({
				   	url:baseUrl+'/cidashboard/summary/get-build-test-status-new/appTree/'+appTree,
					datatype: "json",
				   	colNames:['',
				   	          '',
				   	          "Product(Group) Name",
				   	          '',
				   	          'Avg. TAT (hrs) <img src="/images/help.gif" class="helptipimage" title="' + help_tat_average +'<br/>'+CURRENT_QUARTER_GOAL+': ' + commit_average_tat_target + '<br> '+FISCAL_YEAR_GOAL+':' + commit_average_tat_goal + '">',		   	         
				   	          '',
				   	          'Avg. Build Duration (min) <br><img src="/images/help.gif" class="helptipimage" title="'+help_duration_average +'<br/>'+CURRENT_QUARTER_GOAL+': ' + commit_average_duration_target + '<br> '+FISCAL_YEAR_GOAL+':' + commit_average_duration_goal + '">',
				   	          '',
				   	          'Test Pass Ratio',
				   	          
				   	          '',
				   	          'Avg. TAT (hrs) <img src="/images/help.gif" class="helptipimage" title="' + help_tat_average +'<br/>'+CURRENT_QUARTER_GOAL+': ' + secondary_average_tat_target + '<br> '+FISCAL_YEAR_GOAL+':' + secondary_average_tat_goal + '">',		   	         
				   	          '',
				   	          'Avg. Build Duration (min) <br><img src="/images/help.gif" class="helptipimage" title="'+help_duration_average +'<br/>'+CURRENT_QUARTER_GOAL+': ' + secondary_average_duration_target + '<br> '+FISCAL_YEAR_GOAL+':' + secondary_average_duration_goal + '">',
				   	          '',
				   	          'Test Pass Ratio',
				   	          '',
				   	          'Line Code Coverage<img src="/images/help.gif" class="helptipimage" title="' + help_line_ratio +'<br/>'+CURRENT_QUARTER_GOAL+': ' + secondary_cc_line_ratio_target + '%<br> '+FISCAL_YEAR_GOAL+':' + secondary_cc_line_ratio_goal + '%">',
				   	          
				   	          '',
				   	          'Avg. TAT (hrs) <img src="/images/help.gif" class="helptipimage" title="' + help_tat_average +'<br/>'+CURRENT_QUARTER_GOAL+': ' + bat_average_tat_target + '<br> '+FISCAL_YEAR_GOAL+':' + bat_average_tat_goal + '">',		   	         
				   	          '',
				   	          'Avg. Build Duration (min) <br><img src="/images/help.gif" class="helptipimage" title="'+help_duration_average +'<br/>'+CURRENT_QUARTER_GOAL+': ' + bat_average_duration_target + '<br> '+FISCAL_YEAR_GOAL+':' + bat_average_duration_goal + '">',
				   	          '',
				   	          'Test Pass Ratio'
				   	          
				   	   //       'Avg. TAT (hrs) <img src="/images/help.gif" class="helptipimage" title="' + help_tat_average +'<br/>Target: ' + qa_average_tat_target + '<br> Goal:' + qa_average_tat_goal + '">',		   	         
				   	   //       'Avg. Build Duration (min) <br><img src="/images/help.gif" class="helptipimage" title="'+help_duration_average +'<br/>Target: ' + qa_average_duration_target + '<br> Goal:' + qa_average_duration_goal + '">',
				   	   //       "Passed Tests",
				   	         ],
				   	         
				   	colModel:[
				   	    {name:'id',index:'id',hidden:true},

				   	    {name:'product_name_hidden',index:'product_name_hidden',hidden:true},
				   	    {name:'product_name',index:'product_name',template:cmTemplate, width:130,shrinkToFit:true, editable:false,sortable:true,align:"center",
				   	    	sorttype: function (cell, obj) {
					   	        return  obj.product_name_hidden.toLowerCase();
					   	    },
				   	    	cellattr:function (rowId, tv, rawObject, cm, rdata) 
				   			{ 
				   	    		return 'style ="' + cellTemplate + ' width:130px; text-align:right;background-color: #e6e6e6"';			   			}	   
				   	    },
				   		

				   		{name:'commit_average_tat_hidden',index:'commit_average_tat_hidden',hidden:true},
				   		{name:'commit_average_tat',index:'commit_average_tat',template:cmTemplate, width:100,shrinkToFit:true, editable:false,sortable:true,align:"center",
				   			sorttype: function (cell, obj) {
					   	        return  obj.commit_average_tat_hidden;
					   	    },
				   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
				   			{ 
				   				return 'style ="' + cellTemplate + ' width:100px;"';
				   			}
				   		},	
				   		
				   		{name:'commit_average_duration_hidden',index:'commit_average_duration_hidden',hidden:true},
				   		{name:'commit_average_duration',index:'commit_average_duration',template:cmTemplate, width:100,shrinkToFit:true, editable:false,sortable:true,align:"center",
				   			sorttype: function (cell, obj) {
					   	        return  obj.commit_average_duration_hidden;
					   	    },
				   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
				   			{ 
				   				return 'style ="' + cellTemplate + ' width:100px;"';	
				   			}
				   		},
				   		
				   		{name:'commit_test_pass_hidden',index:'commit_test_pass_hidden',hidden:true},
				   		{name:'commit_test_pass',index:'commit_test_pass_ratio',template:cmTemplate, width:100,shrinkToFit:true, editable:false,sortable:true,align:"center",
				   			sorttype: function (cell, obj) {
					   	        return  obj.commit_test_pass_hidden;
					   	    },
				   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
				   			{ 
				   				return 'style ="' + cellTemplate + ' width:130px;"';
				   			}
				   		},

				   		{name:'secondary_average_tat_hidden',index:'secondary_average_tat_hidden',hidden:true},
				   		{name:'secondary_average_tat',index:'secondary_average_tat',template:cmTemplate, width:100,editable:true, sortable:true,align:"center",
				   			sorttype: function (cell, obj) {
					   	        return  obj.secondary_average_tat_hidden;
					   	    },
				   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
				   			{ 
				   				return 'style ="' + cellTemplate + ' width:100px;"';
				   			}		
				   		},

				   		{name:'secondary_average_duration_hidden',index:'secondary_average_duration_hidden',hidden:true},
				   		{name:'secondary_average_duration',index:'secondary_average_duration',template:cmTemplate, width:100, align:"center",editable:false,sortable:true,
				   			sorttype: function (cell, obj) {
					   	        return  obj.secondary_average_duration_hidden;
					   	    },
				   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
				   			{ 
			   					return 'style ="' + cellTemplate + ' width:100px;"';
			   				}
				   		},		

				   		{name:'secondary_test_pass_hidden',index:'secondary_test_pass_hidden',hidden:true},
				   		{name:'secondary_test_pass',index:'secondary_test_pass_ratio',template:cmTemplate, width:100, align:"center",editable:false,sortable:true,
				   			sorttype: function (cell, obj) {
					   	        return  obj.secondary_test_pass_hidden;
					   	    },	
				   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
					   			{ 
				   					return 'style ="' + cellTemplate + ' width:130px;"';
				   				}
				   		},	
/*
				   		{name:'secondary_total_line_hidden',index:'secondary_total_line_hidden',hidden:true},
				   		{name:'secondary_total_line',index:'secondary_total_line',template:cmTemplate, width:100, align:"center",editable:false,sortable:true,
				   			sorttype: function (cell, obj) {
					   	        return  obj.secondary_total_line_hidden;
					   	    },
				   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
				   			{ 
			   					return 'style ="' + cellTemplate + ' width:100px;"';
			   				}
				   		},	
*/
				   		{name:'secondary_cc_line_hidden',index:'secondary_cc_line_hidden',hidden:true},
				   		{name:'secondary_cc_line',index:'secondary_cc_line_ratio',template:cmTemplate, width:100, align:"center",editable:false,sortable:true,
				   			sorttype: function (cell, obj) {
					   	        return  obj.secondary_cc_line_hidden;
					   	    },
				   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
				   			{ 
			   					return 'style ="' + cellTemplate + ' width:100px;"';
			   				}
				   		},	
  		
				   		{name:'bat_average_tat_hidden',index:'bat_average_tat_hidden',hidden:true},
				   		{name:'bat_average_tat',index:'bat_average_tat',template:cmTemplate, width:100,shrinkToFit:true, editable:false,sortable:true,align:"center",
				   			sorttype: function (cell, obj) {
					   	        return  obj.bat_average_tat_hidden;
					   	    },
				   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
				   			{ 
				   				return 'style ="' + cellTemplate + ' width:100px;"';
				   			}
				   		},	

				   		{name:'bat_average_duration_hidden',index:'bat_average_duration_hidden',hidden:true},
				   		{name:'bat_average_duration',index:'bat_average_duration',template:cmTemplate, width:100,shrinkToFit:true, editable:false,sortable:true,align:"center",
				   			sorttype: function (cell, obj) {
					   	        return  obj.bat_average_duration_hidden;
					   	    },
				   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
				   			{ 
				   				return 'style ="' + cellTemplate + ' width:100px;"';
				   			}
				   		},

				   		{name:'bat_test_pass_hidden',index:'bat_test_pass_ratio_hidden',hidden:true},
				   		{name:'bat_test_pass',index:'bat_test_pass_ratio',template:cmTemplate, width:100,shrinkToFit:true, editable:false,sortable:true,align:"center",
				   			sorttype: function (cell, obj) {
					   	        return  obj.bat_test_pass_hidden;
					   	    },
				   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
				   			{ 
				   				return 'style ="' + cellTemplate + ' width:100px;"';
				   			}
				   		},

				   	/*	
				   		
				   		{name:'qa_average_tat',index:'qa_average_tat',template:cmTemplate, width:100,shrinkToFit:true, editable:false,sortable:false,align:"center",
				   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
				   			{ 
				   				return 'style="border:1px solid #FFFFFF;width:100px;height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
				   			}
				   		},	
				   		{name:'qa_average_duration',index:'qa_average_duration',template:cmTemplate, width:100,shrinkToFit:true, editable:false,sortable:false,align:"center",
				   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
				   			{ 
				   				return 'style="border:1px solid #FFFFFF;width:100px;height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
				   			}
				   		},
				   		{name:'qa_test_pass',index:'qa_test_pass_ratio',template:cmTemplate, width:100,shrinkToFit:true, editable:false,sortable:false,align:"center",
				   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
				   			{ 
				   				return 'style="border:1px solid #FFFFFF;width:100px;height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
				   			}
				   		}  */
				   		
				
				   	],
				   
					rowNum:1000,
				   	height:'auto',
					pager: '#p-build_test_status_grid',
					sortable:true,
				 	loadonce:true,
				   	rowList: [],        // disable page size dropdown
				    pgbuttons: false,     // disable page control like next, back button
				    pgtext: null,         // disable pager text like 'Page 0 of 10'
				    viewrecords: false ,   // disable current view record text like 'View 1-10 of 100'
				   	width: 1400,
					
					loadComplete:function(data){
						var width="";
						  if(($(window).width()-247)<1070)
							  {
							  width='1060';
							  }
						  else
							  {
							  width=$(window).width()-247;
							  }
					
						  $("#build_test_status_grid").jqGrid('setGridWidth', width, true);
					//	alert($(window).width());
						 if ($("#build_test_status_grid").jqGrid('getGridParam', 'sortname') === '') {
					        	//alert("inside second if");
							 buildTestStatusArr=data.rows;
					            // we need reload grid only if we use sortname parameter,
					            // but the server return unsorted data
					      }
			/*			var width="";
						  if(($(window).width()-247)<1070)
							  {
							  width='1060';
							  }
						  else
							  {
							  width=$(window).width()-247;
							  }
						$("#build_test_status_grid").jqGrid('setGridWidth', width, true);  */
					//	buildTestStatusArr=data.rows;
						
						$("tr.jqgrow:even").css("background", "#EDF5FF");
						$("tr.jqgrow:odd").css("background", "#FFFFFF");
				
						var selRowIds = jQuery("#build_test_status_grid").jqGrid('getDataIDs');
						for(var i=0;i<selRowIds.length;i++){
							
							var rowId=selRowIds[i];
							var ret = jQuery("#build_test_status_grid").jqGrid('getRowData', selRowIds[i]);
							var id = ret.id;
							var buildTestStatus = buildTestStatusArr[id];
						
							var cell_data = {};
							for(var j = 0; j < build_type_array.length; j ++){
								var buildType = build_type_array[j];
								cell_data[buildType + "_average_tat" ] = ret[buildType + "_average_tat" ];
								cell_data[buildType + "_average_duration" ] = ret[buildType + "_average_duration" ];
								cell_data[buildType + "_test_pass" ] = ret[buildType + "_test_pass" ];
								if(buildType == 'secondary'){
									cell_data[buildType + "_cc_line" ] = ret[buildType + "_cc_line" ];								}
								
							}
							if ($("#build_test_status_grid").jqGrid('getGridParam', 'sortname') === '') {
								var product_name_data =generateLinkForTheProductName(buildTestStatus.misc['appTree'],buildTestStatus.misc['app_id'],buildTestStatus.misc['app_name']);
								jQuery("#build_test_status_grid").jqGrid('setCell',rowId,'product_name',product_name_data);
							
							//batch handle average_tat cell
							
								for(var j = 0; j < build_type_array.length; j ++){
									
									var buildType = build_type_array[j];
									if(buildTestStatus[buildType] != undefined) {
										var average_tat_data = ret[buildType + "_average_tat"];
										var helpTipImageDataForTAT=constructToolTipForTAT(average_tat_data, buildTestStatus[buildType]);
										average_tat_data = generateRatioCell(average_tat_data,helpTipImageDataForTAT);	
										cell_data[buildType+'_average_tat'] = average_tat_data;
								//		jQuery("#build_test_status_grid").jqGrid('setCell',rowId, buildType+'_average_tat',average_tat_data, buildTestStatus.bgcolor[buildType + "_average_tat"]+"_background");
										
										var average_duration_data = ret[buildType + "_average_duration"];
										var bullet_average_duration = getTheBulletImage(buildTestStatus.bgcolor[buildType + "_average_duration"]);
										average_duration_data = generateThePassCellForSummary(bullet_average_duration, average_duration_data, "");
										cell_data[buildType+'_average_duration'] = average_duration_data;
								//		jQuery("#build_test_status_grid").jqGrid('setCell',rowId, buildType + '_average_duration',average_duration_data);
				
										var test_pass_data= ret[buildType + "_test_pass"];
										var bullet_test_pass=getTheBulletImage(buildTestStatus.bgcolor[buildType + "_test_pass"]);
										var test_total = buildTestStatus[buildType]['test_total'];
										var test_pass = buildTestStatus[buildType]['test_pass'];
										var test_type = buildTestStatus[buildType]['test_type'];
										var t_g = buildTestStatus.t_g;
									//	var testpasstooltip = constructToolTipsForTotalPass( test_total, test_pass);
										var testpasstooltip =constructToolTipForTestPass( test_pass_data, test_type,test_total,test_pass);
										//console.log(testpasstooltip);
										test_pass_data=generateBulletNumberToolTipsTotalPass(bullet_test_pass, test_pass_data, testpasstooltip);
										cell_data[buildType+'_test_pass'] = test_pass_data;
								//		jQuery("#build_test_status_grid").jqGrid('setCell',rowId, buildType + '_test_pass',test_pass_data);
										
										// handle more for secondary
										if(buildType == "secondary"){
											var cc_line_data= ret[buildType + "_cc_line"];
											var helpTipImageDataForCCLine = constructToolTipsForTotalPass(buildTestStatus[buildType]['total_line'], buildTestStatus[buildType]['cc_line']);
											cc_line_data = generateRatioCell(cc_line_data,helpTipImageDataForCCLine);	
											cell_data[buildType+'_cc_line'] = cc_line_data;

								//			jQuery("#build_test_status_grid").jqGrid('setCell',rowId, buildType + "_cc_line",cc_line_data, buildTestStatus.bgcolor[buildType + "_cc_line"] + "_background");
										}
									}else{
										// do nothing
									}
								}
							}	
						
							for(var j = 0; j < build_type_array.length; j ++){
								
								var buildType = build_type_array[j];
							
								jQuery("#build_test_status_grid").jqGrid('setCell',rowId, buildType + '_average_tat',cell_data[buildType + "_average_tat"], buildTestStatus.bgcolor[buildType + "_average_tat"]+"_background");

								jQuery("#build_test_status_grid").jqGrid('setCell',rowId, buildType + '_average_duration', cell_data[buildType + "_average_duration"]);

								jQuery("#build_test_status_grid").jqGrid('setCell',rowId, buildType + '_test_pass',cell_data[buildType + "_test_pass"]);
								
								if(buildType == 'secondary'){
									jQuery("#build_test_status_grid").jqGrid('setCell',rowId, buildType + "_cc_line", cell_data[buildType + "_cc_line"], buildTestStatus.bgcolor[buildType + "_cc_line"] + "_background");
								}
							}
						}   
						
					jQuery("#build_test_status_grid").jqGrid('destroyGroupHeader');
					jQuery("#build_test_status_grid").jqGrid('setGroupHeaders', {
						  useColSpanStyle: true, 
						  groupHeaders:[
							{startColumnName: 'commit_average_tat', numberOfColumns: 5, titleText: 'Commit Build'},
							{startColumnName: 'secondary_average_tat', numberOfColumns: 7, titleText: 'Secondary Build'},
							{startColumnName: 'bat_average_tat', numberOfColumns: 5, titleText: 'BAT Build'},
							{startColumnName: 'qa_average_tat', numberOfColumns: 5, titleText: 'QA'}
						 ]
					});
						
					
						
					setuptooltip();
					},
					gridComplete: function(){ 
						 $("#build_test_status_grid").setGridParam({datatype: 'local'}); 
					},
					caption: "Build / Test Status"
				});
		});

}





// Get the size of an object



