$(document).ready(function(){
	
	var btnNames = ['#box1_btn','#box2_btn','#box3_btn'];

	for(var i=0; i<btnNames.length; i++){
		$(btnNames[i]).click(function(){
			var btnName = $(this).attr('id');
			
			for(var s=0; s<btnNames.length; s++){
				$(btnNames[s]).attr('class','');
			}
			$(this).attr('class','active');
						
			var bodyName = btnName.substring(0,btnName.lastIndexOf('_btn'));
			
			$('#input_page_body')
			.empty()
			.append($('#'+bodyName+'_body').html());
			
			//my
			var count = $("#count").val();
			for(i=0; i<count; i++){
				$("."+i).change(function(){
					alarm = $(this);
					
					alarmChecked(alarm);
					
					
				});
			};
			
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
			
			
			
			});	
		
		//my end
	
	}
	
	//my 
	$('#box1_btn').click(function(event){
		event.preventDefault();
		$.ajax({
			type:'GET',
			url : '/Bit_Place/ajax/personal/personalInfo.do',
			success:function(response){
				$('#body_output')
				.empty()
				.append(response);
				
				$('#input_page_body')
				.empty()
				.append($('#box1_body').html());
				
				$("#BtnInfoUpdate").show();
				$("#btn-group-update").hide();
				
				$('#phone').mask("999-9999-9999");
				$("#alarm").bootstrapSwitch();
				
				$('#fileId').on('change', function () {
				    console.log('btn-upload');
				    var form = new FormData(document.getElementById('frm'));
				   
				     $.ajax({
				      url: "../upload/photoChange.do",
				      data: form,
				      dataType: 'json',
				      processData: false,
				      contentType: false,
				      type: 'POST',
				      success: function (data) {
				        $("#photo").attr("src", "../img/userimages/"+data);
				        console.log('success');
				        console.log(data);
				      },
				      error: function (jqXHR) {
				        console.log('error');
				      }
				    });
				  });
				
				$("#btnPhotoDelete").click(function(event){
					event.preventDefault();
					$("#photo").attr("src", "https://avatars.githubusercontent.com/u/7775019?v=2");
					if (/(MSIE|Trident)/.test(navigator.userAgent)) { 
					    // ie ì¼ë•Œ input[type=file] init.
					    $("#fileId").replaceWith( $("#fileId").clone(true) );
					} else {
					    // other browser ì¼ë•Œ input[type=file] init.
					    $("#fileId").val("");
					}
					$('#hiddenPhoto').val("https://avatars.githubusercontent.com/u/7775019?v=2");
				})
				
			}
		  });	
		
	});
	
	$('#box2_btn').click(function(event){
		event.preventDefault();
		$.ajax({
			type:'GET',
			url : '/Bit_Place/ajax/personal/groupManage.do',
			success:function(response){
				$('#group-body')
				.empty()
				.append(response);
				
				$("#BtnInfoUpdate").hide();
				$("#btn-group-update").show();
				
			}
		  });	
		
	});
	
	$('#box3_btn').click(function(event){
		event.preventDefault();
		$.ajax({
			type:'GET',
			url : '/Bit_Place/ajax/personal/messageContainer.do',
			success:function(response){
				$('#message-content')
				.empty()
				.append(response);	
				$(".btn-update").hide();
			}
		  });	
	});
	
	
	$('#BtnInfoUpdate').on('click', function (event) {
		 	event.preventDefault();
		    console.log('btn-upload');
		    var data=$('#email').val();
		    var form = new FormData(document.getElementById('frm'));
		    
		    if($("#pwdChange").val()!=$("#pwdChangeConfirm").val()){
		    	$(".x-pwdFail").show().css("color", "#F70C4F");
		    }else if(!valid_email(data) && data!=""){
		    	$(".x-validEmail").show().css("color", "#F70C4F");
		    }
		    
		    
		    else{
		   
		     $.ajax({
		      url: "../update/infoUpdate.bit",
		      data: form,
		      dataType: 'json',
		      processData: false,
		      contentType: false,
		      type: 'POST',
		      success: function (bean) {
		        
		        console.log('success');
		        alert('ì €ìž¥ ì™„ë£Œ');
		       
		        if(bean.email != null){
		        $("#email").val(bean.email);
		        }
		        
		        if(bean.phone != null){
		        $("#phone").val(bean.phone);
		        }
		        
		        $("#emailChange").val("");
		        $("#pwdChange").val("");
		        $("#pwdChangeConfirm").val("");
		        $("#phoneChange").val("");
		        
		        $(".x-pwdFail").hide();
		        $(".x-validEmail").hide();
		        
		      },
		      error: function (jqXHR) {
		        console.log('error');
		      }
		    });
		     
		    }
			
		  });
	//my end
	
});

//my
function valid_email(email){
	var pattern = new RegExp(/^[\w-]+(\.[w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);
	return pattern.test(email);
}



/*function alarmChecked(alarm){
	var groupno = alarm.attr("id");
	var alarmCheck=false;
	
	if(alarm.is(":checked")==true){
		alarmCheck=true;
	}else{
		alarmCheck=false;
	}
	
	$.ajax("../ajax/personal/alarmChecked.do?groupno=" 
			+ groupno + "&alarm=" + alarmCheck, {
			type: "GET",
			dataType: "json",
			success: function(response) {
				if(response.status=="success"){
				
				}
				else{
				alert("fail");
				
				}
			}
			
		});
	
}*/

/*function messageWrite(){
	$.ajax({
		type:'GET',
		url : '/Bit_Place/ajax/personal/messageWrite.do',
		success:function(response){
			$('#message-content')
			.empty()
			.append(response);	
			}
	alert("success");
	  });	
}*/
//end