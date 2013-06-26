
var ciEngagementArr={};
var cmTemplate={title:false};
function loadCIEngagementGrid(appTree)
{
		jQuery("#ci-engagment-grid").jqGrid({
		   	url:baseUrl+'/cidashboard/summary/get-engage-rollup-new/appTree/'+appTree,
			datatype: "json",
		  // 	colNames:['','',"Product(Group) Name",'#Of Compliant Products', '','% Prod With <br/> Build <br/> On Jenkins', '','% With Unit Test On Jenkins <img src="/images/help.gif" class="helptipimage" title="'+help_unit_test+'">', '','% Prod With Code Coverage On Jenkins<img src="/images/help.gif" class="helptipimage" title="'+help_code_coverage_avg+'">','','% Prod With BAT On Jenkins <img src="/images/help.gif" class="helptipimage" title="'+help_bat+'">','','% Prod With Functional Test On Jenkins <img src="/images/help.gif" class="helptipimage" title="'+help_functional_test+'">'],
		   	colNames:['','',"Product(Group) Name",'#Of Compliant Products', '','% Prod With <br/> Build <br/> On Jenkins', '','% With Unit Test On Jenkins <img src="/images/help.gif" class="helptipimage" title="'+help_unit_test+'">', '','% Prod With BAT On Jenkins <img src="/images/help.gif" class="helptipimage" title="'+help_bat+'">','','% Prod With Functional Test On Jenkins <img src="/images/help.gif" class="helptipimage" title="'+help_functional_test+'">'],

			colModel:[
		   	    {name:'id',index:'id',hidden:true},
		   	    {name:'product_name_hidden',index:'product_name_hidden',hidden:true},
		   	    {name:'product_name',index:'product_name',sortable:true,
		   	     sorttype: function (cell, obj) {
		  // alert(obj.product_name_hidden);
		   	        return  obj.product_name_hidden.toLowerCase();
		   	    },
		   	    	cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="border:1px solid #FFFFFF;background-color: #e6e6e6;background: #e6e6e6;text-align:right;width:125px;height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}	   
		   	    },
		   	
		   		{name:'no_of_products',index:'no_of_products',template:cmTemplate, width:125,shrinkToFit:true, editable:false,sortable:true,sorttype:'int',align:"center",
		   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="border:1px solid #FFFFFF;width:100px;height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}
		   		},	
		   		{name:'build_hidden',index:'build_hidden',hidden:true},
		   		{name:'build',index:'build',template:cmTemplate, width:125,editable:true, sortable:true,align:"center",
		   		 sorttype: function (cell, obj) {
				   	        return  obj.build_hidden;
				   	    },
		   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="border:1px solid #FFFFFF;width:125px;height: auto !important;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}
		   			
		   		},
		   		{name:'unit_hidden',index:'unit_hidden',hidden:true},
		   		
		   		{name:'unit',index:'unit',template:cmTemplate, width:125, align:"center",editable:false,sortable:true,
		   		 sorttype: function (cell, obj) {
			   	        return  obj.unit_hidden;
			   	    },
	   				cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="border:1px solid #FFFFFF;width:125px;height: auto;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}
	   		},		
	   		/*{name:'cc_hidden',index:'cc_hidden',hidden:true},
		   		{name:'cc',index:'cc',template:cmTemplate, width:100, align:"center",editable:false,sortable:true, 
	   			sorttype: function (cell, obj) {
		   	        return  obj.cc_hidden;
		   	    },
		   				cellattr:function (rowId, tv, rawObject, cm, rdata) 
			   			{ 
			   				return 'style="border:1px solid #FFFFFF;width:100px;height: auto;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
			   			}
		   		},		
		   		*/
		   		{name:'bat_hidden',index:'bat_hidden',hidden:true},
		   		{name:'bat',index:'bat',template:cmTemplate, width:125, align:"center",editable:false,sortable:true,
		   			sorttype: function (cell, obj) {
			   	        return  obj.bat_hidden;
			   	    },
		   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="border:1px solid #FFFFFF;width:125px;height: auto;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}	
		   		},	
		   		{name:'functional_hidden',index:'functional_hidden',hidden:true},
		   		{name:'functional',index:'functional',template:cmTemplate, width:125,height:100, align:"center",editable:false,sortable:true,
		   			sorttype: function (cell, obj) {
			   	        return  obj.functional_hidden;
			   	    },
		   			cellattr:function (rowId, tv, rawObject, cm, rdata) 
		   			{ 
		   				return 'style="border:1px solid #FFFFFF;width:125px;height: 30px;position:relative;vertical-align: middle; overflow:hidden;word-wrap: break-word;white-space: pre-wrap;white-space: -moz-pre-wrap; white-space: -pre-wrap;white-space: -o-pre-wrap; "' 
		   			}	
		   		}	
		   		
		
		   	],
		   	width:1070,
		   	rowNum:1000,
		   	height:'auto',
		   	pager: '#p-ci-engagment-grid',
			sortable:true,
		 	loadonce:true,
		    rowList: [],        // disable page size dropdown
		    pgbuttons: false,     // disable page control like next, back button
		    pgtext: null,         // disable pager text like 'Page 0 of 10'
		    viewrecords: false ,   // disable current view record text like 'View 1-10 of 100' 

		   
			
			loadComplete:function(data){
				 if ($("#ci-engagment-grid").jqGrid('getGridParam', 'sortname') === '') {
			        	//alert("inside second if");
					 ciEngagementArr=data.rows;
			            // we need reload grid only if we use sortname parameter,
			            // but the server return unsorted data
			      }
				 var width="";
				  if(($(window).width()-247)<1070)
					  {
					  width='1060';
					  }
				  else
					  {
					  width=$(window).width()-247;
					  }
			
				  $("#ci-engagment-grid").jqGrid('setGridWidth', width, true);
				$("tr.jqgrow:odd").css("background", "#EDF5FF");
				var selRowIds = jQuery("#ci-engagment-grid").jqGrid('getDataIDs');
				for(var i=0;i<selRowIds.length;i++){
					
					var rowId=selRowIds[i];
					var ret = jQuery("#ci-engagment-grid").jqGrid('getRowData', selRowIds[i]);
					var id=ret.id;
					var engageArr=ciEngagementArr[id];
					var build_test_status_arr=engageArr.build_test_status;
					
					//var row=getCellValue(selRowIds[i], 'avg_tat');
					//jQuery("#ci-engagment-grid").jqGrid('setRowData',selRowIds[i],{act:be+se+ce});
					
					//constructToolTipForProdOnJenkins(summaryReportArr[i].onJenkins,summaryReportArr[i].notOnJenkins);
					var product_name_data=ret.product_name;
					var build_data=ret.build;
					var unit_data=ret.unit;
				//	var cc_data=ret.cc;
					var bat_data=ret.bat;
					var functional_data=ret.functional;
					//alert($("#ci-engagment-grid").jqGrid('getGridParam', 'sortname'));
					 if ($("#ci-engagment-grid").jqGrid('getGridParam', 'sortname') === '') {
					product_name_data =generateLinkForTheProductName(engageArr.taxonomy['appTree'],engageArr.taxonomy['app_id'],engageArr.taxonomy['appName']);
					jQuery("#ci-engagment-grid").jqGrid('setCell',rowId,'product_name',product_name_data);
					////console.log(engageArr.build.onJenkins);
					//console.log('engageArr');
					//console.log(engageArr);
					var target_goal_arr=engageArr.t_g;
					var helpTipImageDataForBuild=constructToolTipForProdOnJenkins(build_data,engageArr.build.onJenkins,engageArr.build.notOnJenkins,target_goal_arr.build_target,target_goal_arr.build_goal,'CI Engagement');
					build_data=generateRatioCell(build_data+"%",helpTipImageDataForBuild);
					jQuery("#ci-engagment-grid").jqGrid('setCell',rowId,'build',build_data,engageArr.bgcolor.build+"_background");

					var helpTipImageDataForUnit=constructToolTipForProdOnJenkins(unit_data,engageArr.unit.onJenkins,engageArr.unit.notOnJenkins,target_goal_arr.unittest_target,target_goal_arr.unittest_goal,'CI Engagement');
					//unit_data+="% "+helpTipImageDataForUnit;
					unit_data=generateRatioCell(unit_data+"%",helpTipImageDataForUnit);

					//var helpTipImageDataForcc=constructToolTipForProdOnJenkins(cc_data,engageArr.cc.onJenkins,engageArr.cc.notOnJenkins,target_goal_arr.cc_target,target_goal_arr.cc_goal,'CI Engagement');
					//cc_data=generateRatioCell(cc_data+"%",helpTipImageDataForcc);

					var helpTipImageDataForbat=constructToolTipForProdOnJenkins(bat_data,engageArr.bat.onJenkins,engageArr.bat.notOnJenkins,target_goal_arr.bat_target,target_goal_arr.bat_goal,'CI Engagement');
					//bat_data+="% "+helpTipImageDataForbat;
					bat_data=generateRatioCell(bat_data+"%",helpTipImageDataForbat);

					var helpTipImageDataForfunctional=constructToolTipForProdOnJenkins(functional_data,engageArr.functional.onJenkins,engageArr.functional.notOnJenkins,target_goal_arr.functest_target,target_goal_arr.functest_goal,'CI Engagement');
					//functional_data+="% "+helpTipImageDataForfunctional;
					//functional_data=geneateTheOnJenkinsCell(functional_data,helpTipImageDataForfunctional);
					//functional_data= "<span class='item_Cell item_ratio item_ratio_only'>"+functional_data+"%</span>"+helpTipImageDataForfunctional;
					var bullet_img="<span class='item_Cell item_bullet'><img src=/images/"+engageArr.bgcolor.functional+"_bullet.png></span>";
					//functional_data=bullet_img+"   "+functional_data;
					functional_data=generateThePassCell(bullet_img,functional_data+"%",helpTipImageDataForfunctional);
					
					  }
					 jQuery("#ci-engagment-grid").jqGrid('setCell',rowId,'build',build_data,engageArr.bgcolor.build+"_background");
						jQuery("#ci-engagment-grid").jqGrid('setCell',rowId,'unit',unit_data,engageArr.bgcolor.unit+"_background");
						//jQuery("#ci-engagment-grid").jqGrid('setCell',rowId,'cc',cc_data,engageArr.bgcolor.cc+"_background");
						jQuery("#ci-engagment-grid").jqGrid('setCell',rowId,'bat',bat_data,engageArr.bgcolor.bat+"_background");
						jQuery("#ci-engagment-grid").jqGrid('setCell',rowId,'functional',functional_data);
				}
				setuptooltip();
				
			},
			gridComplete: function(){ 
				 $("#ci-engagment-grid").setGridParam({datatype: 'local'}); 
				},
			caption: "CI Engagement Report"
		});
	
}


