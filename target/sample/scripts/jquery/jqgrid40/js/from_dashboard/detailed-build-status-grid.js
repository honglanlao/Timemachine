

var summaryReportArr={};
var cmTemplate={title:false};
var build_test_target_goal = {};

function loadDetailedBuildGrid(appTree, divID, buildType)
{
		var build_number_column = "";
		if(buildType == "commit" || buildType == "secondary"){
			build_number_column = "Last Success Build";
		}else{
			build_number_column = "Last Build";

		}

		$.getJSON("/cidashboard/target-goal/get-build-test-target-goal/appTree/"+appTree+"/buildType/"+buildType, function(target_goal) {
			
			if(target_goal != undefined){
				var tat_target = target_goal['tat_target'];
				var tat_goal = target_goal['tat_goal'];
				var tnr_target = target_goal['tnr_target'];
				var tnr_goal = target_goal['tnr_goal'];
				var average_duration_target =  target_goal['build_duration_target'];
				var average_duration_goal = target_goal['build_duration_goal']; 
				var test_pass_target = target_goal['test_pass_target']; 
				var test_pass_goal = target_goal['test_pass_goal']; 
			}else{
				var tat_target = null;
				var tat_goal = null;
				var tnr_target = null;
				var tnr_goal = null;
				var average_duration_target =  null;
				var average_duration_goal = null;
				var test_pass_target = null;
				var test_pass_goal = null;
			}
			

			jQuery("#" + divID).jqGrid({
			   	url:baseUrl+'/cidashboard/detail/get-build-test-status/appTree/'+appTree+'/buildType/' + buildType,
				datatype: "json",
			   	colNames:[ "Job Name", 
			   	           "Total Builds",
			   	           "Success Builds",	  
			   	           'Total Repairs<br> <img src="/images/help.gif" class="helptipimage" title="' + help_total_repairs + '">',
			   	           'Avg. TAT (hrs) <img src="/images/help.gif" class="helptipimage" title="' + help_tat_average +'<br/>'+CURRENT_QUARTER_GOAL+': ' + tat_target + '<br> '+FISCAL_YEAR_GOAL+':' + tat_goal + '">',
			   	           'TNR (hrs) <img src="/images/help.gif" class="helptipimage" title="' + help_tnr +'<br/>'+CURRENT_QUARTER_GOAL+': ' + tnr_target + '<br> '+FISCAL_YEAR_GOAL+':' + tnr_goal + '">',
			   	           'Avg. Build Duration (min) <br><img src="/images/help.gif" class="helptipimage" title="'+help_duration_average +'<br/>'+CURRENT_QUARTER_GOAL+': ' + average_duration_target + '<br> '+FISCAL_YEAR_GOAL+':' + average_duration_goal + '">',
			   	           "Build #",
			   	           "Build Time",
			   	       //    "Total #",
			   	       //    "Test Pass"
			   	           "Test Pass Ratio"
			   	            ],
			   	            
			   	colModel:[
			   	      
			   	    {name:'build_name',index:'build_name',width:170,sortable:true,
			   	    	cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;background-color: #e6e6e6;text-align:right;font-weight: normal !important;width:170px;height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	   
			   	    },
			   		{name:'build_total',index:'build_total',template:cmTemplate, width:40, shrinkToFit:true, editable:false,sortable:true,align:"center",
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:40px;height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}
			   		},	
			   		
			   		{name:'build_success',index:'build_success_ratio',template:cmTemplate, width:140,editable:true, sortable:true,align:"center",
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:140px;height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}
			   			
			   		},
		
			   		  
			   		{name:'total_repairs',index:'total_repairs',template:cmTemplate, width:50, align:"center",editable:false,sortable:true,
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:50px;height:30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	
			   		},	
			   		
			   		{name:'average_tat',index:'average_tat',template:cmTemplate, width:70, align:"center",editable:false,sortable:true,
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:70px;height:30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	
			   		},	
			   		
			   		{name:'tnr',index:'tnr',template:cmTemplate, width:70, align:"center",editable:false,sortable:true,
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:70px;height:30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	
			   		},	
			   		
			   		{name:'average_duration',index:'average_duration',template:cmTemplate, width:70, align:"center",editable:false,sortable:true,
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:70px;height:30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	
			   		},	
			   		
			   		{name:'build_number',index:'build_number',template:cmTemplate, width:50, align:"center",editable:false,sortable:true,
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:50px;height:30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	
			   		},	
			   		{name:'build_datetime',index:'build_datetime',template:cmTemplate, width:120, align:"center",editable:false,sortable:true,
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:120px;height:30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	
			   		},
			/*   		{name:'test_total',index:'test_total',template:cmTemplate, width:50, align:"center",editable:false,sortable:true,
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:50px;height:30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	
			   		},	*/
			   		{name:'test_pass',index:'test_pass_ratio',template:cmTemplate, width:110, align:"center",editable:false,sortable:true,
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:110px;height:30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	
			   		}
			
			   	],
			   	
			   	rowNum:10,
			   	rowList:[10,20,30,40,50],
			   	height:'auto',
			   	pager: '#p-detailed-' + buildType + '-build-grid',
			   	
			    viewrecords: true,
			   
				editurl: baseUrl+"/admin/jenkin-servers/save-single-jenkins-alias",
				width: 1400,
				loadComplete:function(data){
					$("tr.jqgrow:odd").css("background", "#EDF5FF");
					buildReportArr=data.rows;
		/*			var width="";
					if(($(window).width()-247)<1070){
						width='1100';
					//	alert(buildType);
					}else{
						
						width=$(window).width()-250;
					}  
					  
					$("#detailed-" + buildType + "-build-grid").jqGrid('setGridWidth',width , true);  */

					var selRowIds = jQuery("#detailed-" + buildType + "-build-grid").jqGrid('getDataIDs');
					for(var i=0;i<selRowIds.length;i++){
						var rowId=selRowIds[i];
						var build_test_status_arr = buildReportArr[i]['misc'];
					//	var size = getObjSize(build_test_status_arr);
					//	console.log("buildReportArr");
					//	console.log(buildReportArr[i]);
							
								var ret = jQuery("#detailed-" + buildType + "-build-grid").jqGrid('getRowData',rowId );
								// post handle build_name column
								var build_name_data = ret.build_name;
								var build_url = buildReportArr[i].misc.build_url;
								var build_name_cell = generateBuildNameURL(build_name_data, build_url);
								jQuery("#detailed-" + buildType + "-build-grid").jqGrid('setCell',rowId,'build_name', build_name_cell);
								
								// post handle build_success column
								var build_success_data = ret.build_success;
								var build_success_ratio = build_test_status_arr.build_success_ratio;	
								var bullet_build_success = getTheBulletImage(buildReportArr[i].bgcolor.build_success, buildType);
								var helpTipImageDataForBuildSuccess=constructToolTipForBuildSuccess(build_success_data,build_test_status_arr);
								var build_success_cell1 = generateBulletNumberPercentage(bullet_build_success, build_success_data, build_success_ratio);
								var build_success_cell2 = generateRatioCell(build_success_cell1, helpTipImageDataForBuildSuccess);
								jQuery("#detailed-" + buildType + "-build-grid").jqGrid('setCell',rowId,'build_success', build_success_cell2);
								
								// handle tat
								var average_tat_data= ret.average_tat;
								jQuery("#detailed-" + buildType + "-build-grid").jqGrid('setCell', rowId, 'average_tat', average_tat_data, buildReportArr[i].bgcolor.average_tat + "_background");
	
								var tnr_data= ret.tnr;
								var bullet_tnr=getTheBulletImage(buildReportArr[i].bgcolor.tnr, buildType);
								tnr_data=generateThePassCell(bullet_tnr, tnr_data, "");
								jQuery("#detailed-" + buildType + "-build-grid").jqGrid('setCell', rowId, 'tnr', tnr_data);
		
								var average_duration_data = ret.average_duration;
								var bullet_average_duration=getTheBulletImage(buildReportArr[i].bgcolor.average_duration, buildType);
								average_duration_data=generateThePassCell(bullet_average_duration, average_duration_data, "");
								jQuery("#detailed-" + buildType + "-build-grid").jqGrid('setCell', rowId, 'average_duration', average_duration_data);
	
								
								var build_number_data = ret.build_number;
							//	alert("build_number is " + build_number_data);
						//		var build_datetime = buildReportArr[i]['misc']['build_datetime'];
								var build_number_cell = generateNumberURL(build_number_data, build_url);
								jQuery("#detailed-" + buildType + "-build-grid").jqGrid('setCell', rowId, 'build_number', build_number_cell);   
	
								//
								var test_pass_data= generateURLForTestPassRatio(ret.test_pass, build_url+build_number_data+"/testReport");
								var bullet_test_pass=getTheBulletImage(buildReportArr[i].bgcolor.test_pass, buildType);
								var test_pass = buildReportArr[i]['misc']['test_pass'];
								var test_total = buildReportArr[i]['misc']['test_total'];
								var test_type = buildReportArr[i]['misc']['test_type'];
								var t_g = buildReportArr[i].t_g;
							//	var helpTipImageDataForTestPass=constructToolTipsForPassTargetGoal(test_pass_data, t_g, "test_pass");
								var testpasstooltip = constructToolTipForTestPass( test_pass_data, test_type,test_total,test_pass);
								test_pass_data=generateBulletNumberToolTipsTotalPass(bullet_test_pass, test_pass_data, testpasstooltip);
							//	test_pass_data=generateBulletNumberPercentage(bullet_test_pass, test_total, test_pass_data);
								jQuery("#detailed-" + buildType + "-build-grid").jqGrid('setCell',rowId,'test_pass',test_pass_data);
					
					}	
					jQuery("#detailed-" + buildType + "-build-grid").jqGrid('destroyGroupHeader');
					jQuery("#detailed-" + buildType + "-build-grid").jqGrid('setGroupHeaders', {
						  useColSpanStyle: true, 
						  groupHeaders:[
					//		{startColumnName: 'build_success', numberOfColumns: 1, titleText: 'Build Status'},
							{startColumnName: 'total_repairs', numberOfColumns: 2, titleText: 'TAT'},
							{startColumnName: 'build_number', numberOfColumns: 3, titleText: build_number_column}
						  ]
					});
					setuptooltip();
				},
		
				caption: "Build / Test Detail Report (Last One Month)"
			});
	});

}



function loadSecondaryBuildGrid(appTree, divID, buildType)
{

		var build_number_column = "Last Success Build";
				
		$.getJSON("/cidashboard/target-goal/get-build-test-target-goal/appTree/"+appTree, function(target_goal) {	
			
			
			var average_tat_target = target_goal['secondary']['tat_target'];
			var average_tat_goal = target_goal['secondary']['tat_goal'];
			var average_duration_target =  target_goal['secondary']['build_duration_target'];
			var average_duration_goal = target_goal['secondary']['build_duration_goal']; 
			var tat_target =  target_goal['secondary']['tat_target'];
			var tat_goal = target_goal['secondary']['tat_goal']; 
			var tnr_target =  target_goal['secondary']['tnr_target'];
			var tnr_goal = target_goal['secondary']['tnr_goal']; 
			var test_pass_target = target_goal['secondary']['test_pass_target']; 
			var test_pass_goal = target_goal['secondary']['test_pass_goal']; 
			var cc_line_ratio_target = target_goal['secondary']['cc_line_ratio_target']; 
			var cc_line_ratio_goal = target_goal['secondary']['cc_line_ratio_goal']; 
		
			jQuery("#" + divID).jqGrid({
			   	url:baseUrl+'/cidashboard/detail/get-build-test-status/appTree/'+appTree+'/buildType/' + buildType,
				datatype: "json",
			   	colNames:[ "Job Name", 
			   	           "Sonar Report",
			   	           "Total Builds",
			   	           "Success Builds",		   	          
			   	           'Total Repairs<br> <img src="/images/help.gif" class="helptipimage" title="' + help_total_repairs + '">',
			   	           'Avg. TAT (hrs) <img src="/images/help.gif" class="helptipimage" title="' + help_tat_average +'<br/>'+CURRENT_QUARTER_GOAL+': ' + average_tat_target + '<br> '+FISCAL_YEAR_GOAL+':' + average_tat_goal + '">',
			   	           'TNR (hrs) <img src="/images/help.gif" class="helptipimage" title="' + help_tnr +'<br/>'+CURRENT_QUARTER_GOAL+': ' + tnr_target + '<br> '+FISCAL_YEAR_GOAL+':' + tnr_goal + '">',
			   	           'Avg. Build Duration (min) <br><img src="/images/help.gif" class="helptipimage" title="'+help_duration_average +'<br/>'+CURRENT_QUARTER_GOAL+': ' + average_duration_target + '<br> '+FISCAL_YEAR_GOAL+':' + average_duration_goal + '">',
			   	           "Build #",
			   	           "Build Time",
			   	  //         "Type",
			   	  //         "Total #",
			   	  //         "Test Pass",
			   	           "Test Pass Ratio",
			   	           "Total Line",
			   	           'Line Ratio<img src="/images/help.gif" class="helptipimage" title="' + help_line_ratio +'<br/>'+CURRENT_QUARTER_GOAL+': ' + cc_line_ratio_target + '%<br> '+FISCAL_YEAR_GOAL+':' + cc_line_ratio_goal + '%">'
			   	            ],
			   	            
			   	colModel:[
			   	      
			   	    {name:'build_name',index:'build_name',width:170,sortable:true,  
			   	    	cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;background-color: #e6e6e6;text-align:right;font-weight: normal !important;width:170px;height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	   
			   	    },
			   	    
			   	    {name:'sonar_report',index:'sonar_report',width:40,sortable:false,  
			   	    	cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;background-color: #e6e6e6;text-align:right;font-weight: normal !important;width:40px;height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	   
			   	    },
			   	    
			   		{name:'build_total',index:'build_total',template:cmTemplate, width:40, shrinkToFit:true, editable:false,sortable:true,align:"center",
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:40px;height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}
			   		},	
			   		
			   		{name:'build_success',index:'build_success_ratio',template:cmTemplate, width:130,editable:true, sortable:true,align:"center",
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:130px;height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}
			   			
			   		},
			   		
			   		{name:'total_repairs',index:'total_repairs',template:cmTemplate, width:50, align:"center",editable:false,sortable:true,
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:210px;height:30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	
			   		},	
			   		
			   		{name:'average_tat',index:'average_tat',template:cmTemplate, width:70, align:"center",editable:false,sortable:true,
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:70px;height:30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	
			   		},	
			   		
			   		{name:'tnr',index:'tnr',template:cmTemplate, width:70, align:"center",editable:false,sortable:true,
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:70px;height:30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	
			   		},	
			   		
			   		{name:'average_duration',index:'average_duration',template:cmTemplate, width:80, align:"center",editable:false,sortable:true,
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:80px;height:30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	
			   		},	
			   		
			   		{name:'build_number',index:'build_number',template:cmTemplate, width:40, align:"center",editable:false,sortable:true,
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:40px;height:30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	
			   		},	
			   		{name:'build_datetime',index:'build_datetime',template:cmTemplate, width:120, align:"center",editable:false,sortable:true,
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:120px;height:30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	
			   		},
	/*
			   		{name:'test_type',index:'test_type',template:cmTemplate, width:40, align:"center",editable:false,sortable:true,
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:40px;height:30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	
			   		},  */
			   		
			  /* 		{name:'test_total',index:'test_total',template:cmTemplate, width:45, align:"center",editable:false,sortable:true,
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:45px;height:30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	
			   		},	 */
			   		{name:'test_pass',index:'test_pass_ratio',template:cmTemplate, width:110, align:"center",editable:false,sortable:true,
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:110px;height:30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	
			   		},
			   		{name:'total_line',index:'total_line',template:cmTemplate, width:50, align:"center",editable:false,sortable:true,
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:50px;height:30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	
			   		},
			   		{name:'cc_line',index:'cc_line_ratio',template:cmTemplate, width:70, align:"center",editable:false,sortable:true,
			   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:70px;height:30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}	
			   		}
			
			   	],
			   	
			   	rowNum:10,
			   	rowList:[10,20,30,40,50],
			   	height:'auto',
			   	pager: '#p-detailed-' + buildType + '-build-grid',
			   	
			    viewrecords: true,
			   
				editurl: baseUrl+"/admin/jenkin-servers/save-single-jenkins-alias",
				width: 1500,
				loadComplete:function(data){
					$("tr.jqgrow:odd").css("background", "#EDF5FF");
					buildReportArr=data.rows;
	
					var selRowIds = jQuery("#detailed-" + buildType + "-build-grid").jqGrid('getDataIDs');
					for(var i=0;i<selRowIds.length;i++){
						var rowId=selRowIds[i];
						var build_test_status_arr = buildReportArr[i]['misc'];
					//	var size = getObjSize(build_test_status_arr);
					//	console.log("buildReportArr");
					//	console.log(buildReportArr[i]);
							
						var ret = jQuery("#detailed-" + buildType + "-build-grid").jqGrid('getRowData',rowId );
						// post handle build_name column
						var build_name_data = ret.build_name;
						var build_url = buildReportArr[i].misc.build_url;
						var build_name_cell = generateBuildNameURL(build_name_data, build_url);
						jQuery("#detailed-" + buildType + "-build-grid").jqGrid('setCell',rowId,'build_name', build_name_cell);
								
						var sonar_report_data = ret.sonar_report;
					
						var sonar_report_cell = generateSonarReportURL(sonar_report_data);
						
						jQuery("#detailed-" + buildType + "-build-grid").jqGrid('setCell',rowId,'sonar_report', sonar_report_cell);
						
						// post handle build_success column
						var build_success_data = ret.build_success;
						var build_success_ratio = build_test_status_arr.build_success_ratio;							
						var bullet_build_success = getTheBulletImage(buildReportArr[i].bgcolor.build_success);
						var helpTipImageDataForBuildSuccess=constructToolTipForBuildSuccess(build_success_data,build_test_status_arr);
						var build_success_cell1 = generateBulletNumberPercentage(bullet_build_success, build_success_data, build_success_ratio);
						var build_success_cell2 = generateRatioCell(build_success_cell1, helpTipImageDataForBuildSuccess);
						jQuery("#detailed-" + buildType + "-build-grid").jqGrid('setCell',rowId,'build_success', build_success_cell2);
							
						// handle average_tat
						var average_tat_data= ret.average_tat;
						jQuery("#detailed-" + buildType + "-build-grid").jqGrid('setCell', rowId, 'average_tat', average_tat_data, buildReportArr[i].bgcolor.average_tat + "_background");
						
						//handle tnr
						var tnr_data= ret.tnr;
						var bullet_tnr=getTheBulletImage(buildReportArr[i].bgcolor.tnr);
						tnr_data=generateThePassCell(bullet_tnr, tnr_data, "");
						jQuery("#detailed-" + buildType + "-build-grid").jqGrid('setCell', rowId, 'tnr', tnr_data);
						
						//handle average_duration
						var average_duration_data = ret.average_duration;
						var bullet_average_duration=getTheBulletImage(buildReportArr[i].bgcolor.average_duration);
						average_duration_data=generateThePassCell(bullet_average_duration, average_duration_data, "");
						jQuery("#detailed-" + buildType + "-build-grid").jqGrid('setCell', rowId, 'average_duration', average_duration_data);
	
								
						var build_number_data = ret.build_number;
					//	var build_datetime = buildReportArr[i]['misc']['build_datetime'];
						var build_number_cell = generateNumberURL(build_number_data, build_url);
						jQuery("#detailed-" + buildType + "-build-grid").jqGrid('setCell', rowId, 'build_number', build_number_cell);
	
						//
						var test_pass_data = generateURLForTestPassRatio(ret.test_pass, build_url+build_number_data+"/"+buildReportArr[i].misc.test_report);
						var bullet_test_pass=getTheBulletImage(buildReportArr[i].bgcolor.test_pass);
						var test_total = buildReportArr[i]['misc']['test_total'];
						var test_pass = buildReportArr[i]['misc']['test_pass'];
						var test_type = buildReportArr[i]['misc']['test_type'];
						var t_g = buildReportArr[i].t_g;
						var testpasstooltip = constructToolTipForTestPass( test_pass_data, test_type,test_total,test_pass);
					//	var helpTipImageDataForTestPass=constructToolTipsForPassTargetGoal(test_pass_data, t_g, "test_pass");
						test_pass_data=generateBulletNumberToolTipsTotalPass(bullet_test_pass, test_pass_data, testpasstooltip);
						jQuery("#detailed-" + buildType + "-build-grid").jqGrid('setCell',rowId,'test_pass',test_pass_data);
					
						// total_line
						var total_line_data = generateURLForCCTotalLine(ret.total_line, build_url+build_number_data+"/"+buildReportArr[i].misc.cc_tool);
						jQuery("#detailed-" + buildType + "-build-grid").jqGrid('setCell',rowId,'total_line',total_line_data);
						
						var cc_line_data= ret.cc_line;
					//	var bullet_cc_line = getTheBulletImage(buildReportArr[i].bgcolor.cc_line);
					//	cc_line_data=generateThePassCell(bullet_cc_line, cc_line_data, "");
					//	var helpTipImageDataForCC = constructToolTipsForPassTargetGoal(cc_line_data, t_g, "cc_line_ratio");
					//	cc_line_data = generateThePassCell("", cc_line_data, helpTipImageDataForCC);
						jQuery("#detailed-" + buildType + "-build-grid").jqGrid('setCell',rowId,'cc_line',cc_line_data, buildReportArr[i].bgcolor.cc_line+"_background");
	
					}	
					jQuery("#detailed-" + buildType + "-build-grid").jqGrid('destroyGroupHeader');
					jQuery("#detailed-" + buildType + "-build-grid").jqGrid('setGroupHeaders', {
						  useColSpanStyle: true, 
						  groupHeaders:[
					//		{startColumnName: 'build_success', numberOfColumns: 1, titleText: 'Build Status'},
							{startColumnName: 'total_repairs', numberOfColumns: 2, titleText: 'TAT'},
							{startColumnName: 'build_number', numberOfColumns: 3, titleText: build_number_column},
							{startColumnName: 'total_line', numberOfColumns: 2, titleText: 'Code Coverage'}
						  ]
					});
					setuptooltip();
				},
	
				caption: "Build / Test Detail Report (Last One Month)"
			});
		
		});
	
	

	
	
	
}

