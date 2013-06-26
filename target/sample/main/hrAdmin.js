/**
 * HR Admin accordion
 *
 */
function loadHRAdmin(tenantid, upn, objectId){
	$.getJSON( "/sample/User?action=loadHrAdminData&tenantid=" + tenantid + "&upn=" + upn + "&objectId=" + objectId, 
		function(data){
			var isITAdmin = data.isITAdmin;
			var isHRAdmin = data.isHrAdmin;
			if(! isITAdmin && ! isHRAdmin){
				$('h3#hr-admin-h3').hide();
	   			$('div#hr-admin').hide();
	   			return;
			}
			var jsonArr = data.userList;
			console.log(jsonArr);
		//	var jsonArr = JSON.parse("'" + jsonStr + "'");
		//	var jsonArr = eval('(' + jsonStr + ')');
		//	console.log(jsonArr);
			var hrAdminToUpdate = "";
			$('textarea#debug').attr("rows", jsonArr.length - 1);
			for (var i = 0; i < jsonArr.length; i++) {
				var thisObjectId = jsonArr[i].ObjectId;
				var displayName = jsonArr[i].DisplayName;
				var isHRAdmin = jsonArr[i].IsHrAdmin;
				/* String objectId = allUserDaoList.getDirectoryObjectObjectId(i);
				String displayName = allUserDaoList.getDirectoryObjectDisplayName(i);
				boolean isHrAdmin = allUserDaoList.getSingleDatabaseObject(i).IsHrAdmin(); */
				if(isHRAdmin){
					hrAdminToUpdate += "<input type=\"checkbox\" checked=\"\" name=\"hrAdminToRemove\" value=\"" + thisObjectId + "\"/>" 
					                + "&nbsp;&nbsp;<label for=\"" + thisObjectId + "\">" + displayName + "</label><br/>";
				}else{
					hrAdminToUpdate += "<input type=\"checkbox\"  name=\"hrAdminToAdd\" value=\"" + thisObjectId + "\"/>" 
					 				+ "&nbsp;&nbsp;<label for=\"" + thisObjectId + "\">" + displayName + "</label><br/>";
				}
			} 
			$('div#hrAdminToUpdate span').html(hrAdminToUpdate);	
			$('div#hrAdminToUpdate input').change(function(){
				hrAdminUpdateArray[$(this).val()] = $(this).is(':checked');
			});
			$('input#turnOnDebugButton').click(function(){
				$('label#monitoring').html("Syncing with AD graph every 20 sec");
				var refreshInterval = setInterval(function(){loadHRAdminIterative(tenantid, upn, objectId);}, 20*1000);
			//	loadHRAdminIterative(tenantid, upn, objectId);

				
			});
			
	}); 
	
	
	var hrAdminUpdateArray = {};
	$('div#hrAdminToUpdate input').change(function(){
		hrAdminUpdateArray[$(this).val()] = $(this).is(':checked');
	});
	$('input[id="hrAdminUpdateButton"]').click(function(){
		// show pending gif
		$('div#hrAdminToUpdate img').removeClass("hidden");
		$.ajax({
			type: "POST",
			url: "/sample/User?action=updateHrAdmin",
			data: hrAdminUpdateArray,
			success: function(msg){
				console.log("hrAdminUpdateButton success");
				$('#hr-admin-submit-confirm').html("Update Success !");
				$hr_admin_submit_confirm = $('#hr-admin-submit-confirm').dialog({
				  autoOpen: false,
				    title: 'Confirm',
				    modal: true,
				    position: 'center',
				    width: 'auto',
				    height: 'auto',	
				    margin: 'auto',
				    hide: {
				    	effect: "explode", 
				    	duration: 1000}
				});
				$hr_admin_submit_confirm.dialog('open');
				$('#hr-admin-submit-confirm').fadeTo(2000, 0.33, function() {
					  $("#hr-admin-submit-confirm").dialog('close');
				});
			//	$('div#hrAdminUpdate img').addClass("hidden");
			//	$('div#hrAdminUpdate span').html("Update success");	
			},
			error:function(){
				alert("Update Failure");
	
			}
		});
		// 
	});
}


function loadHRAdminIterative(tenantid, upn, objectId){
	$.getJSON( "/sample/User?action=loadHrAdminData&tenantid=" + tenantid + "&upn=" + upn + "&objectId=" + objectId,
			function(data){
			
		var minusUsers = data.minusUserList;
		var addUsers = data.addUserList;
		var updateUsers = data.updateUserList;
		$.each(minusUsers, function(key, value) {
			$('textarea#debug').append("\n " + new Date().toLocaleFormat() + "   " + value.displayName + " removed");
	//		$('textarea#debug').animate({scrollTop: $('textarea#debug').prop("scrollHeight")}, 500);
			// cross line the removed one and mark red
			var $checkbox = $('div#hrAdminToUpdate label[for="' + value.objectId + '"]');
			$checkbox.css("text-decoration", "line-through");
			$checkbox.css("color", "red");
			$('img#' + value.objectId).css("visibility", "hidden");
		});
		$.each(addUsers, function(key, value) {
			var rows = parseInt($('textarea#debug').attr("rows"));
			$('textarea#debug').attr("rows", rows + 1);
			$('textarea#debug').append("\n " + new Date().toLocaleFormat() + "   " + value.displayName + " ADDED");
	//		$('textarea#debug').animate({scrollTop: $('textarea#debug').prop("scrollHeight")}, 500);
			$('div#hrAdminToUpdate span').append("<input type=\"checkbox\" value=\"" + value.objectId + "\" name=\"hrAdminToAdd\" style=\"color:green\">" 
					                               +"&nbsp;&nbsp;<label for=\"" + value.objectId + "\" style=\"color:green\">" + value.displayName + "</label>&nbsp;&nbsp;<img id=\"" + value.objectId + "\" src=\"../images/new.gif\"><br/>");
			
		});
		$.each(updateUsers, function(key, value) {
			var $checkbox2 = $('div#hrAdminToUpdate label[for="' + value.objectId + '"]');
			var rows = parseInt($('textarea#debug').attr("rows"));
			$('textarea#debug').attr("rows", rows + 1);
			$('textarea#debug').append("\n " + new Date().toLocaleFormat() + "   " + $checkbox2.html() + " UPDATED");
			
			$checkbox2.html(value.displayName);
			$checkbox2.css("text-decoration", "blink");
			$checkbox2.css("color", "blue");
		});
		
		
		if(minusUsers.length == 0 && addUsers.length == 0 && updateUsers.length == 0 ){
			$('textarea#debug').append("\n " + new Date().toLocaleFormat() + "   No change FOUND");
		}
		$('textarea#debug').animate({scrollTop: $('textarea#debug').prop("scrollHeight")}, 500);
		
	});
}