$(document).ready(function(){
	
	var pathname = window.location.pathname;	
	var data = pathname;
	var arr = data.split('/');
	var sub = arr[arr.length-2];    
	var file = arr[arr.length-1].split('.');
	
	$.ajax({
		type:'GET',
		url : '/Bit_Place/main/frame/selectedGroup.do?groupNo='+file[0],
		async : true,
		contentType:'application/x-www-form-urlencoded;charset=UTF-8',
		success:function(response,status,request){
			$("#groupbtn").append(response);	
			}
		});
	
	$.ajax({
		type:'GET',
		url : '/Bit_Place/main/frame/submenGroups.do',
		async : true,
		contentType:'application/x-www-form-urlencoded;charset=UTF-8',
		success:function(response,status,request){
			$("#submenu").append(response);	
			
			$('#sub_date_btn').css('background-image','url("../img/top/white_btn.png")');

			}
	});
	
	
	
});