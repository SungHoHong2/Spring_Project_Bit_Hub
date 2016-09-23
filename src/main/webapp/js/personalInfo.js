$(document).ready(function(){
	$(".invisible_btn").hide();
	
	$('#input_page_body')
	.empty()
	.append($('#box1_body').html());
	
	var btnNames = ['#box1_btn','#box2_btn','#box3_btn','#box4_btn'];

	for(var i=0; i<btnNames.length; i++){
		$(btnNames[i]).click(function(){
			var btnName = $(this).attr('id');
			
			for(var s=0; s<btnNames.length; s++){
				$(btnNames[s]).attr('class','');
			}
			$(this).attr('class','active');
						
			var bodyName = btnName.substring(0,btnName.lastIndexOf('_btn'));
			
			if(bodyName=='box1'){
				$('#BtnInfoUpdate').css('display','');
			}else{
				$('#BtnInfoUpdate').css('display','none');
			}
			
			
		/*	if(bodyName=='groupInvited'){
				$.ajax({
					type:'GET',
					url : '/Bit_Place/ajax/personal/personal_groupInvited.do',
					data :'memno='+$(this).val(),
					async : true,
					contentType:'application/x-www-form-urlencoded;charset=UTF-8',
					success:function(response,status,request){
						$('#input_page_body')
						.empty()
						.append(response);
						
						 groupInvited();
					}
				});
				
			}else{
					
			}*/
			$('#input_page_body')
			.empty()
			.append($('#'+bodyName+'_body').html());
			
			/*
			 * 개발자 장윤용 
			 */
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
		
		/*
		 * 개발자 장윤용 끝 
		 */
	
	}
	
	/*
	 * 개발자 장윤용 
	 */
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
	
	$('#box4_btn').click(function(event){
		event.preventDefault();
		$.ajax({
			type:'GET',
			url : '/Bit_Place/ajax/personal/groupInvitation.do',
			success:function(response){
				$('#invitation-content')
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
		        alert('수정 완료되었습니다');
		       
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
	/*
	 * 개발자 장윤용 끝 
	 */

	/*
	 * 개발자 홍성호
	 */
	
	function groupInvited(){
		var invitationCount = $('#invitationCount').val();
		for(var i=0; i<invitationCount.length; i++){
			$('#invite_btn_'+i).click(function(){
				$.ajax({
					type:'GET',
					url : '/Bit_Place/ajax/personal/personal_answerInvite.do',
					data :'invitno='+$(this).attr('invitno')+
					       '&groupno='+$(this).attr('groupno')+
					       '&memno='+$('#memno').val(),
					async : true,
					contentType:'application/x-www-form-urlencoded;charset=UTF-8',
					success:function(response,status,request){	
					}
				});				
				$('#'+$(this).attr('divid')).empty().css('display','none');								
			});
			
		}
	}
	
	/*
	 * 개발자 홍성호 끝 
	 */
	
});

/*
 * 개발자 장윤용 
 */

function valid_email(email){
	var pattern = new RegExp(/^[\w-]+(\.[w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);
	return pattern.test(email);
}