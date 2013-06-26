// var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
//var date_picked;
function getStartEndDates(date_picked_obj){
	var curr = new Date(date_picked_obj.getTime());
	var first = curr.getDate() - curr.getDay();
	var last = first + 6;
	var startDate  = processDate(new Date(curr.setDate(first)));
	//recover curr
	curr = new Date(date_picked_obj.getTime());
	var endDate  = processDate(new Date(curr.setDate(last)));
	
	return {"startDate": startDate, "endDate": endDate};
	
}

function getWeeklyDates(date_picked_obj){
	
	var curr = new Date(date_picked_obj.getTime());
	var first = curr.getDate() - curr.getDay();
	console.log("first ->" + first);

//	var last = first + 6;
	var sun_date = processDate(new Date(curr.setDate(first)));
	curr = new Date(date_picked_obj.getTime());
	var mon_date = processDate(new Date(curr.setDate(first + 1)));
	curr = new Date(date_picked_obj.getTime());
	var tue_date = processDate(new Date(curr.setDate(first + 2)));
	curr = new Date(date_picked_obj.getTime());
	var wed_date = processDate(new Date(curr.setDate(first + 3)));
	curr = new Date(date_picked_obj.getTime());
	var thu_date = processDate(new Date(curr.setDate(first + 4)));
	curr = new Date(date_picked_obj.getTime());
	var fri_date = processDate(new Date(curr.setDate(first + 5)));
	curr = new Date(date_picked_obj.getTime());
	var sat_date = processDate(new Date(curr.setDate(first + 6)));
	curr = new Date(date_picked_obj.getTime());
	
	return {'picked': processDate(date_picked_obj),
			'sun': sun_date,
			'mon': mon_date,
			'tue': tue_date,
			'wed': wed_date,
			'thu': thu_date,
			'fri': fri_date,
			'sat': sat_date
	        };
}

function fillDateToCalendar(weekly_dates_str){
	
	$('input#datepicker').val(weekly_dates_str.picked);

	var sun_date = new Date(weekly_dates_str.sun.replace(new RegExp('-',"g"),"/")).getDate();
	var mon_date = new Date(weekly_dates_str.mon.replace(new RegExp('-',"g"),"/")).getDate();
	var tue_date = new Date(weekly_dates_str.tue.replace(new RegExp('-',"g"),"/")).getDate();
	var wed_date = new Date(weekly_dates_str.wed.replace(new RegExp('-',"g"),"/")).getDate();
	var thu_date = new Date(weekly_dates_str.thu.replace(new RegExp('-',"g"),"/")).getDate();
	var fri_date = new Date(weekly_dates_str.fri.replace(new RegExp('-',"g"),"/")).getDate();
	var sat_date = new Date(weekly_dates_str.sat.replace(new RegExp('-',"g"),"/")).getDate();
	
	var startMonth = new Date(weekly_dates_str.sun.replace(new RegExp('-',"g"),"/")).getMonth()+1;
	var startYear = new Date(weekly_dates_str.sat.replace(new RegExp('-',"g"),"/")).getFullYear();
	
	// fill in left upper corner
	$('div#gview_time-entry-table div[id="jqgh_time-entry-table_timeoff_type"]').html(months[startMonth] + " " + startYear);
	
	// append date to all sunday column input id attribute
	$('div#gview_time-entry-table div[id="jqgh_time-entry-table_sun"]').html("Sun " + sun_date);
	$('div#gview_time-entry-table div[id="jqgh_time-entry-table_mon"]').html("Mon " + mon_date);
	$('div#gview_time-entry-table div[id="jqgh_time-entry-table_tue"]').html("Tue " + tue_date);
	$('div#gview_time-entry-table div[id="jqgh_time-entry-table_wed"]').html("Wed " + wed_date);
	$('div#gview_time-entry-table div[id="jqgh_time-entry-table_thu"]').html("Thu " + thu_date);
	$('div#gview_time-entry-table div[id="jqgh_time-entry-table_fri"]').html("Fri " + fri_date);
	$('div#gview_time-entry-table div[id="jqgh_time-entry-table_sat"]').html("Sat " + sat_date);

}

function processDate(date_picked_obj){
	
	if(date_picked_obj instanceof Date){
		var month = date_picked_obj.getMonth() + 1;
		var date = date_picked_obj.getDate();
		var year = date_picked_obj.getFullYear();
		return month + "-" + date + "-" + year;
	}

}

/*function processWeeklyDates(weekly_dates_obj){
	var weekly_dates_str = {};
	for(var each in weekly_dates_obj){
		weekly_dates_str[each] = processDate(weekly_dates_obj[each]);		
	}
	return weekly_dates_str;
}*/

$(function() {	
    $("#datepicker").datepicker({
    	onSelect:function(){
    		var date_picked = $(this).val();
    		// shuffle calendar grid
    		var date_picked_obj = new Date(date_picked);   	
    		console.log("date_picked_obj ->" + date_picked_obj);
    		
    		var startDate = getStartEndDates(date_picked_obj).startDate;
    		console.log("startDate ->" + startDate);
    		var endDate = getStartEndDates(date_picked_obj).endDate;
    		console.log("endDate ->" + endDate);
    		var weekly_dates_str = getWeeklyDates(date_picked_obj);
    	//	var weekly_dates_str = processWeeklyDates(weekly_dates_obj);
    		// send out ajax request, def is in jqgrid.js
    		var handler = eval("dashboardCallBack");
    		console.log("in onselect, date picked obj ->" + date_picked_obj);
    		handler(objectId, upn, date_picked_obj, weekly_dates_str, startDate, endDate);
    		
    	}
    });
});

