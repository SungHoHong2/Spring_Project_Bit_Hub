$(document).ready(function(){
    	var pathname = window.location.pathname;	
    	var data = pathname;
    	var arr = data.split('/');
    	var sub = arr[arr.length-2];    
    	var file = arr[arr.length-1].split('.');
          	
	    if(file[0]=='logged'){
	    	getLogged('top', '#class','true');
	    	getLoggedPaging('title', '#title','true',0);
	    	getLogged('sub','#sub','true');
		    getBody(sub, file[0]);   
	    }else if(sub=='groups'){
		    getData('top', '#class', file[0]);
		    getData('title', '#title',file[0]);
		    getData('sub','#sub',file[0]);
	    	getGroupBody(sub, file[0]);
	    }
	    
	    
	    setInterval(newMessageAlarm, 10000);
});


function getLogged(url, div, value){
	$.ajax({
	type:'GET',
	url : '/Bit_Place/main/frame/'+url+'.do?logged='+value,
	async : true,
	contentType:'application/x-www-form-urlencoded;charset=UTF-8',
	success:function(response,status,request){
		$(div).append(response);	
		
		if(url=='sub'){
			$('#nextPage').val($('.subbtn_4').attr('contentno'));
		}
		
		}
	});
};

function getLoggedPaging(url, div, value, startPage){
	$.ajax({
	type:'GET',
	url : '/Bit_Place/main/frame/'+url+'.do?logged='+value+'&startPage='+startPage,
	async : true,
	contentType:'application/x-www-form-urlencoded;charset=UTF-8',
	success:function(response,status,request){
		$(div).append(response);	
		
		}
	});
};


function getData(url, div, value){
	$.ajax({
	type:'GET',
	url : '/Bit_Place/main/frame/'+url+'.do?groupNo='+value,
	async : true,
	contentType:'application/x-www-form-urlencoded;charset=UTF-8',
	success:function(response,status,request){
		$(div).append(response);	
		
		if(url=='sub'){
			$('#nextPage').val($('.subbtn_4').attr('contentno'));
		}
		
		}
	});
};


function getBody(sub, url){	
	$.ajax({
	type:'GET',
	url : '/Bit_Place/ajax/'+sub+'/'+url+'.do',
	async : true,
	contentType:'application/x-www-form-urlencoded;charset=UTF-8',
	success:function(response,status,request){
		$('#body_output').append(response);	
		}
	});	
};


function getGroupBody(sub, value){
	$.ajax({
	type:'GET',
	url : '/Bit_Place/ajax/'+sub+'/home.do?groupNo='+value,
	async : true,
	contentType:'application/x-www-form-urlencoded;charset=UTF-8',
	success:function(response,status,request){
		$('#body_output').append(response);	
		}
	});	
};

function newMessageAlarm(){
	$.ajax({
		type: 'GET',
		url: '/Bit_Place/ajax/personal/messageAlarm.do',
		
		success:function(response){
			var visible = $("#invisible-messgeAlarm").attr("data-visible");
			/*if(response[0].memno != 0){
				if(visible == "off"){
					$("#invisible-messgeAlarm").show()
					.removeAttr("data-visible").attr("data-visible", "on");
				}
					for(var i in response){
						$("<div>").addClass("alarm-body")
						.attr("data-roomno", response[i].roomno)
						.attr("data-groupno", response[i].groupno)
						.append($("<div>").addClass("alarm-photo")
						.append($("<img>").addClass("alarm-thumnail")
						.attr("src", response[i].photo)))
						.append($("<span>").addClass("alarm-name")
						.append($("<label>").addClass("alarm-label-Name")
						.html(response[i].name)))
						.append($("<span>").addClass("alarm-date")
						.html(new Date(response[i].date).toString("yyyy-MM-dd")))
						.append($("<span>").addClass("alarm-content")
						.append($("<span>").addClass("glyphicon")
						.addClass("glyphicon-share-alt")
						.append($("<span>").html(response[i].m_content))))
						.prependTo($(".alarm-body-warp"));
					}
				}*/
			$(".alarm-body-warp").prepend(response);
			
			var isData = $("#isData").val();
			if(isData == "true"){
				$("#invisible-messgeAlarm").show()
				.removeAttr("data-visible").attr("data-visible", "on");
			}
			
			$(".alarm-remove").click(function(event){
				event.preventDefault();
				$(".alarm-body-warp").empty();
				$("#invisible-messgeAlarm").hide().removeAttr("data-visible").attr("data-visible", "off");
			});
			
			$(".alarm-label-header").click(function(event){
				event.preventDefault();
				$.ajax({
					type:'GET',
					url : '/Bit_Place/ajax/personal/messageContainerFromAlarm.do',
					success:function(response){
						$('#body_output')
						.empty()
						.append(response);
						
						$('#input_page_body')
						.empty()
						.append($('#box3_body').html());
						
						$(".btn-update").hide();
						
						var count = $("#idCount").val();
						
						for(var i=0; i<count; i++){
							
						$("#media-"+i).click(function(event){
						 	event.preventDefault();
						 	
						 	var roomno=$(this).attr("data-roomno");
						 	var name=$(this).attr("data-name");
						 	var receiverno=$(this).attr("data-receiverno");
						 	
						 	  $.ajax('/Bit_Place/ajax/personal/messageRoom.do?roomno='
							          +roomno+"&name="+name+"&receiverno="+receiverno, {
							      type: "GET",
							      
							      success: function(response) {
							    	  $('#message-content')
										.empty()
										.append(response);
							      }
							      });   
						})
						
						
						} 
						
						$("#message-write").click(function(){
							$.ajax({
								type:'GET',
								url : '/Bit_Place/ajax/personal/messageWrite.do',
								success:function(response){
									$('#message-content')
									.empty()
									.append(response);	
								}
							  });	
						});
						
						$("#message-container").click(function(){
							$.ajax({
								type:'GET',
								url : '/Bit_Place/ajax/personal/messageContainer.do',
								success:function(response){
									$('#message-content')
									.empty()
									.append(response);
									
								}
							  });	
						});
						
					}
				  });	
			});
			
			}
		
	});
};