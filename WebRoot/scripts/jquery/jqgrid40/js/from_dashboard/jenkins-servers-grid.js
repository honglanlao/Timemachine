function loadJenkinsServerGrid(appTree)
{
	
	jQuery("#jenkins-server-grid").jqGrid({
		url:baseUrl+'/admin/jenkin-servers/get-jenkin-servers-for-grid/appTree/'+appTree,
		datatype: "json",
	   	colNames:['Jenkins Server', 'Modified By', 'Modified On','Action'],
	   	colModel:[
	  	   	{name:'jenkins_server',index:'jenkins_server', width:380,shrinkToFit:true, editable:false},
	   		{name:'user_name',index:'user_name', width:90, editable:false},
	   		{name:'modified_datetime',index:'modified_datetime', width:130,editable:true},
			{name:'act',index:'act', width:75,sortable:false}

	   	],
	   	rowNum:10,
	   	rowList:[10,20,30],
	   	pager: '#prow_jenkins_server',
	   	sortname: 'jenkins_server',
	    viewrecords: true,
	    sortorder: "desc",
		height:'auto',
		editurl: baseUrl+"/admin/jenkin-servers/delete-jenkin-server",
		ajaxGridOptions: {cache: false},		
		loadComplete: function(data){
			$("#jenkins-server-grid").parents('div.ui-jqgrid-bdiv').css("max-height","300px");
			var ids = jQuery("#jenkins-server-grid").jqGrid('getDataIDs');
			if(data.total>0 && data.accessToOrg=="1")
				{
			var dataRows=data['rows'];
			//console.log(dataRows[0].id);
		
			for(var i=0;i<dataRows.length;i++){
				var cl = dataRows[i].id;
				var confirmationMessage='';
				var NoOfAppsForAjenkinServer=dataRows[i].NoOfAppsForAjenkinServer;
				console.log("NoOfAppsForAjenkinServer"+NoOfAppsForAjenkinServer);
				if(NoOfAppsForAjenkinServer>1)
					confirmationMessage="This server might be used by other applications within this group .Are you sure you want to delete it?";
				else
					confirmationMessage="Are you sure you want to delete?";
				var ce="<a href='"+dataRows[i].cell[0]+"' target='_blank'>"+dataRows[i].cell[0]+"</a>";
				console.log(dataRows[i].cell[0]);
				be = "<input style='height:22px;width:70px;text-align:center' type='button' value='Delete' title='Delete Jenkins server' onclick=\"deleteGridRow('"+cl+"','"+dataRows[i].appTree+"','"+confirmationMessage+"')\");\"  />"; 
				jQuery("#jenkins-server-grid").jqGrid('setRowData',ids[i],{act:be,jenkins_server:ce});
				jQuery("#jenkins-server-grid").jqGrid('showCol', 'act');
			}
				}
			else
				{
				jQuery("#jenkins-server-grid").jqGrid('hideCol', 'act');
				}
			
			//setTooltipsOnColumnHeader($("#jenkins-server-grid"),1,"Add alias seperated by comma.");
		},
		caption: "Jenkins Servers"
	});
	
	
}

function deleteGridRow(cl,appTree,confirmationMessage)
{
	jQuery('#jenkins-server-grid').jqGrid('delGridRow',cl,
			{
		//delData:{appTree:appTree1,jenkins_id:cl},
		width:600,
		height:'auto',
		beforeShowForm: function ($form) { 
			$('td.delmsg', $form[0]).html(confirmationMessage);
		},
		mtype:"POST", 
		reloadAfterSubmit:true, 
		serializeDelData: function (postdata) {
	    var rowdata = jQuery('#jenkins-server-grid').getRowData(postdata.id);
	      // append postdata with any information 
	    return {jenkins_id: postdata.id, oper: postdata.oper, appTree: appTree};
		}
			});
}

