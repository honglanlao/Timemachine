
var summaryReportArr={};
var cmTemplate={title:false};
function loadEngagementSummaryGrid(appTree)
{
	
		jQuery("#rowed4").jqGrid({
		   	url:baseUrl+'/cidashboard/summary/get-summary-report/appTree/'+appTree,
			datatype: "json",
		   	colNames:[	"id",
		   	            "accordion_index",
		   	            "",
		   	            "",
		   	            'Actual', 
		   	         CURRENT_QUARTER_GOAL,
		   	      FISCAL_YEAR_GOAL,
		   	            //'Avg.TAT (hrs) <img src="/images/help.gif" class="helptipimage" title="'+help_tat_average+'">',
		   	      'Actual (Last One Month)',
		   	      FISCAL_YEAR_GOAL,
		   	          //  'Avg.Build Duration (mins) <img src="/images/help.gif" class="helptipimage" title="'+help_duration_average+'">',
		   	         'Actual (Last One Month)',
		   	      FISCAL_YEAR_GOAL,
		   	           // 'Test Pass Ratio', 
		   	         'Total',
		   	         'Passed Ratio',
		   	         
		   	         //   'Code Coverage(Line Ratio) <img src="/images/help.gif" class="helptipimage" title="'+help_line_ratio+'">'
		   	      'Actual',
		   	         'Goal',
		   	      ''
		   	         ],
		   	colModel:[
		   	       {name:'id',index:'id',hidden:true},
		   	    {name:'accordion_index',index:'accordion_index',hidden:true},
		   	    {name:'builds_hidden',index:'builds_hidden',hidden:true},

		   	    {name:'build_type',index:'build_type',width:200,
		   	    	cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="border:1px solid #FFFFFF;background-color: #e6e6e6;background: #e6e6e6;text-align:right;font-weight: bold !important;width:215px;height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}	   
		   	    },
		   		{name:'prod_on_jenkins',index:'prod_on_jenkins',template:cmTemplate, width:110,shrinkToFit:true, editable:false,sortable:false,align:"center",
		   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="border:1px solid #FFFFFF;width:110px;height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}
		   		},	
		   		{name:'ci_engage_target',index:'ci_engage_target',template:cmTemplate, width:100,shrinkToFit:true, editable:false,sortable:false,align:"center",
		   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return ' style="border:1px solid #FFFFFF;width:100px;height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}
		   		},	
		   		{name:'ci_engage_goal',index:'ci_engage_goal',template:cmTemplate, width:100,shrinkToFit:true, editable:false,sortable:false,align:"center",
		   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return ' style="border:1px solid #FFFFFF;width:100px;height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}
		   		},	
		   		{name:'avg_tat',index:'avg_tat',template:cmTemplate, width:110,editable:true, sortable:false,align:"center",
		   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="border:1px solid #FFFFFF;width:110px;height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}
		   			
		   		},
		   		{name:'avg_tat_target',index:'avg_tat_target',template:cmTemplate, width:100,editable:true, sortable:false,align:"center",
		   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="border:1px solid #FFFFFF;width:100px;height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}
		   			
		   		},
		   		{name:'average_duration',index:'average_duration',template:cmTemplate, width:110,editable:true, sortable:false,align:"center",
		   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="border:1px solid #FFFFFF;width:110px;height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}
		   			
		   		},
		   		{name:'average_duration_target',index:'average_duration_target',template:cmTemplate, width:100,editable:true, sortable:false,align:"center",
		   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="border:1px solid #FFFFFF;width:100px;height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}
		   			
		   		},
		   		{name:'test_total',index:'test_total',template:cmTemplate, width:100, align:"center",editable:false,sortable:false,
	   				cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="border:1px solid #FFFFFF;width:100px;height: auto  !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}
	   		},	
		   		{name:'test_pass',index:'test_pass',template:cmTemplate, width:120, align:"center",editable:false,sortable:false,
		   				cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:120px;height: auto  !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}
		   		},		
		   		
		   			
	   		
		   		{name:'code_coverage',index:'code_coverage',template:cmTemplate, width:100, align:"center",editable:false,sortable:false,
		   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="border:1px solid #FFFFFF;width:100px;height:30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}	
		   		},		
		   		{name:'code_coverage_target',index:'code_coverage_target',template:cmTemplate, width:150, align:"center",editable:false,sortable:false,
		   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="border:1px solid #FFFFFF;width:150px;height:30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}	
		   		},	
		   		{name:'code_coverage_goal',index:'code_coverage_goal',hidden:true
		   		},	
		
		   	],
		   	
		   	rowNum:10,
		   	height:'auto',
		   	pager: '#prowed4',
		   	
		   	rowList: [],        // disable page size dropdown
		    pgbuttons: false,     // disable page control like next, back button
		    pgtext: null,         // disable pager text like 'Page 0 of 10'
		    viewrecords: false ,   // disable current view record text like 'View 1-10 of 100'
		   
			editurl: baseUrl+"/admin/jenkin-servers/save-single-jenkins-alias",
			
			loadComplete:function(data){
				var goal_header='Goal<img src="/images/help.gif" class="helptipimage" title="'+data.code_coverage_goal_help+'">';
				jQuery("#rowed4").jqGrid('setLabel', 'code_coverage_target',goal_header );
				
				//alert("load complete");
				$("tr.jqgrow:odd").css("background", "#EDF5FF");
				summaryReportArr=data.rows;
				var width="";
				  if(($(window).width()-247)<1070)
					  {
					  width='1100';
					  }
				  else
					  {
					  width=$(window).width()-200;
					  }
				 // console.log("width"+width);
				$("#rowed4").jqGrid('setGridWidth',width , true);
				var selRowIds = jQuery("#rowed4").jqGrid('getDataIDs');
				$("#red_jobs").html('');
				for(var i=0;i<selRowIds.length;i++){
					
					var rowId=selRowIds[i];
					var ret = jQuery("#rowed4").jqGrid('getRowData',rowId );
					var build_test_status_arr=summaryReportArr[i].build_test_status;
					
					var size = getObjSize(build_test_status_arr);
					//console.log("summaryReportArr");
					//console.log(summaryReportArr[i]);
					var helpTipImageDataForTAT='';
					var build_name=ret.builds_hidden;
					if(size>0)
						{
						
						console.log("build_name"+build_name);
						genarteRedFlags(build_test_status_arr['tnr_red'],'red_job_table_'+i,build_name);
						
						helpTipImageDataForTAT=constructRedFlagForTAT(build_test_status_arr['tnr_red']['job_count'],'red_job_'+i,'red_job_table_'+i);
						 
						}
						
							
							var accordion_index = ret.accordion_index;
							var build_type= ret.build_type;
							
							var build_url=generateLinkForTheBuildType(data.appTree, accordion_index, build_type);
							console.log("build_url"+build_url)
							jQuery("#rowed4").jqGrid('setCell',rowId,'build_type',build_url);
							var avg_tat_data = ret.avg_tat;
							
							//avg_tat_data+=" "+helpTipImageDataForTAT;
							avg_tat_data=generateRatioCellForAvgTAT(avg_tat_data,helpTipImageDataForTAT);
							
							jQuery("#rowed4").jqGrid('setCell',rowId,'avg_tat',avg_tat_data,summaryReportArr[i].bgcolor.tat_bgcolor+"_background");
							
							var prod_on_jenkins_data= ret.prod_on_jenkins;
							var helpTipImageDataForProdOnJenkins=constructToolTipForProdOnJenkins(prod_on_jenkins_data,summaryReportArr[i].onJenkins['apps'],summaryReportArr[i].notOnJenkins,'','','summary');
							//prod_on_jenkins_data="<span class='summary_report_prod_on_jenkins_cell'>"+prod_on_jenkins_data+"</span>"+helpTipImageDataForProdOnJenkins;
							prod_on_jenkins_data=generateRatioCell(prod_on_jenkins_data,helpTipImageDataForProdOnJenkins);
							jQuery("#rowed4").jqGrid('setCell',rowId,'prod_on_jenkins',prod_on_jenkins_data,summaryReportArr[i].bgcolor.onJenkins_bgcolor+"_background");
							
							var average_duration_data = ret.average_duration;
							var bullet_average_duration = getTheBulletImage(summaryReportArr[i].bgcolor.average_duration_bgcolor);
							average_duration_data = generateThePassCellForSummary(bullet_average_duration, average_duration_data, "");
							jQuery("#rowed4").jqGrid('setCell',rowId,'average_duration',average_duration_data);
							
							var test_pass_data= ret.test_pass;
							var test_type="";
							var test_total="";
							var test_pass="";
							var test_fail="";
							//var size = getObjSize(build_test_status_arr);
							if(size>0)
								{
								test_type=build_test_status_arr.test_type;
								test_total=build_test_status_arr.test_total;
								test_pass=build_test_status_arr.test_pass;
								}
							//var helpTipImageDataForTestPass=constructToolTipForTestPass(test_pass_data,test_type,test_total,test_pass);
							var bullet_test_pass=getTheBulletImage(summaryReportArr[i].bgcolor.test_pass_bgcolor);
							//test_pass_data=bullet_test_pass+"  "+test_pass_data+"  "+helpTipImageDataForTestPass;
							test_pass_data=generateThePassCellForSummary(bullet_test_pass,test_pass_data);
							jQuery("#rowed4").jqGrid('setCell',rowId,'test_pass',test_pass_data);
							
							var code_coverage_data= ret.code_coverage;
							//var helpTipImageDataForcc=constructToolTipsForTotalPass(build_test_status_arr['total_line'],build_test_status_arr['cc_line']);
							code_coverage_data=generateRatioCell(code_coverage_data);
							jQuery("#rowed4").jqGrid('setCell',rowId,'code_coverage',code_coverage_data,summaryReportArr[i].bgcolor.cc_line_ratio_bgcolor+"_background");
							
							var code_coverage_target_data=ret.code_coverage_target;
							if(code_coverage_target_data!='-' && code_coverage_target_data!='' && code_coverage_target_data!=null)
							 code_coverage_target_data=">"+ret.code_coverage_target+"<br/> (>"+ret.code_coverage_goal+" for new Prod)";
							
							jQuery("#rowed4").jqGrid('setCell',rowId,'code_coverage_target',code_coverage_target_data);
						
					//console.log(ret);
							if(size>0 && build_test_status_arr['tnr_red']['job_count']>0)
							{
							open_dialog_on_red_flag_click('red_job_'+i,'red_job_table_'+i,build_name);
							}
				}
				
				
				setuptooltip();
				
					jQuery("#rowed4").jqGrid('destroyGroupHeader');
					jQuery("#rowed4").jqGrid('setGroupHeaders', {
						  useColSpanStyle: true, 
						  groupHeaders:[
							{startColumnName: 'prod_on_jenkins', numberOfColumns: 3, titleText: 'CI Engagement <img src="/images/help.gif" class="helptipimage" title="Compliant Products on Jenkins">'},

							{startColumnName: 'avg_tat', numberOfColumns: 2, titleText: 'Avg.TAT (hrs) <img src="/images/help.gif" class="helptipimage" title="'+help_tat_average+'">'},
							{startColumnName:'average_duration', numberOfColumns: 2,titleText: 'Avg.Build Duration (mins) '},
							{startColumnName:'test_total', numberOfColumns: 2,titleText: 'Test (Last Success Build)'},

							{startColumnName:'code_coverage', numberOfColumns: 2,titleText:'Code Coverage(Line Ratio)'},

						  ]
					});
				
				
			},
			gridComplete: function(){
			///	alert("grid complete");
				$("#rowed4").parents('div.ui-jqgrid-bdiv').css("max-height","300px");
	
				var ids = jQuery("#rowed4").jqGrid('getDataIDs');
				for(var i=0;i<ids.length;i++){
					var cl = ids[i];
					//console.log(cl);
				}
				
				//setTooltipsOnColumnHeader($("#rowed4"),1,"Add alias seperated by comma.");
			},
			
			caption: "Summary Report"
		});
	
}
function getUrlForTheBuild(build_type,build_name)
{
	var index;
	
}
function genarteRedFlags(tnr_arr,tableId,build_name)

{
    
	$("#red_jobs").append("<table id='"+tableId+"'>");
    $("#red_jobs").append("</table>");
	var red_job_count=tnr_arr['job_count'];
	if(red_job_count>0)
		{
	var jsonStr='[';
		for(var i=0;i<red_job_count;i++)
			{
				var myObj = {};
				myObj["job_name"] = "<a target='_blank' title='click to view the job detail page on jenkins' href='"+tnr_arr['build_url'][i]+"' >"+tnr_arr['build_name'][i]+"</a>";
				myObj["tnr"] =  tnr_arr[tnr_arr['build_name'][i]];
				jsonStr+=JSON.stringify(myObj)+",";
			}
		 jsonStr+=']';
		 var mydata = eval(jsonStr);
	      jQuery("#"+tableId).jqGrid({
	      datatype: "local",
	      height: 'auto',
	      colNames:['Job Name','TNR(hrs)'],
	      colModel:[
	          {name:'job_name',index:'job_name', width:240},
	          {name:'tnr',index:'tnr', width:60}
	      ],
	    //  caption:build_name,
	      
	          data: mydata
	       });	
	
	     
		}
}
function open_dialog_on_red_flag_click(red_flag_id,red_dialog_id,build_name)
{
	//alert(("#"+dialog_id)
	//alert($("#red_jobs").html());
	//alert("gbox_"+red_dialog_id);
	jQuery("#"+red_flag_id).click(function(e){
		
	$red_flag_dialog=jQuery("#gbox_"+red_dialog_id).dialog({
	    autoOpen: false,
	    title: "",
	    modal: true,
	 position: [e.clientX,e.clientY],
	  // position: 'center',
	    width: 'auto',
	    height: 'auto',	
	    margin: 'auto',
	    title:build_name
	});
	e.preventDefault();
	$red_flag_dialog.dialog('open');
	});
} 
 function constructRedFlagForTAT(job_count,red_flag_id,red_dialog_id)
 {
	 if(job_count>0)
		 {
		 //open_dialog_on_red_flag_click(red_flag_id,red_dialog_id);
		 	return "<a href='#' style='clear:both'  id='"+red_flag_id+"'  > <img style='clear:both' src='/images/red-flag.gif' /></a>";
		 }
	 else
		 {
		 return '';
		 }
 }

 