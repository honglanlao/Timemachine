// var date_today = new Date();
// console.log("today date->" + date_today);
// var tenantid;
// var upn;

/*$(function() {


	
	
	var date_today = new Date();
	console.log("today date ->" + date_today);
	var startDate = getStartEndDates(date_today).startDate;
	var endDate = getStartEndDates(date_today).endDate;
	var weekly_dates_obj = getWeeklyDates(date_today);
	//draw the table
	var handler = eval("dashboardCallBack");
	handler(upn, date_today, weekly_dates_obj, startDate, endDate);
	
});*/

var dashboardCallBack = function(objectId, upn, date_picked_obj, weekly_dates_obj, startDate, endDate) {   //role to be dicussed
	// window.console.clear();													 
	console.log("in dashboardCallBack");

	jQuery("#time-entry-table").jqGrid('setGridParam',{url:'/sample/User?action=loadTimeEntry&tenantid=' + tenantid + '&objectId=' + objectId + '&upn=' + upn + '&startDate=' + startDate + "&endDate=" + endDate + "&weekly_dates_str="+JSON.stringify(weekly_dates_obj), 
		                                               rowNum:10, datatype:"json", postData:weekly_dates_obj});
	loadTimeEntry("time-entry-table", tenantid, objectId, upn, date_picked_obj, weekly_dates_obj, startDate, endDate);	
	jQuery("#time-entry-table").jqGrid('setGridParam',{datatype:'json'}).trigger("reloadGrid");
	
//	fillDateToCalendar(date_picked_obj, weekly_dates_obj);

};




