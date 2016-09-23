$(document).ready(function() {
	
		var width = $(window).width() + 'px';
		var height = 1000 + 'px';

		$('body').css('background-size', width + ' ' + height);
		$('#login_black').css('width', width);
		$('#login_black').css('height', 1000);
		
		
		$("#login_black").animate({
			opacity : 1
		}, 1000);
	
		$('#login_body').append($('#logins_form_booth').html());
		
		
		$('#loginBtn').click(function(){
			$.ajax({
				type:'GET',
				url : '/Bit_Place/ajax/login/loginBtn.do',
				data : 'email='+$('#idinput').val()+
				       '&pwd='+$('#pwdinput').val()	
				,
				async : true,
				contentType:'application/x-www-form-urlencoded;charset=UTF-8',
				success:function(response,status,request){
					var validationOutput = $.trim(response);	
					if(validationOutput=='success'){			
						   $('#frm').submit();
					}else if(validationOutput=='failure'){
					   $('.checkforIdValidation').empty();
					   $('.checkforIdValidation').append('<span class="negativeOutcome">Wrong Password</span>');	 
					}
				}
			});	
		});
		
		$("#idinput").keyup(function() {		
			validationProcess('idinput','idValidation');	
		});
		
		$('#registerBtn').click(function(){
				$('#frm').attr('action','../ajax/login/registersubmit_withFiles.do');
				$('.checkforIdValidation').empty();
				$('#logged_members_box_Wrapper').css({'display':'none'});
				$('#login_body').empty().append($('#register_form_booth').html());
				$(this).css('display','none');
				$('#pwdFindBtn').css('display','none');
				$('#loginBtn_wrapper').css('display','none');
				$('#submit_Register').css('opacity','1');
				$('#goBack_wrapper').css('opacity','1');
				
				
				$('#emailCheck').keyup(function(){
					
					var buf1 = $('#emailCheck').val();
					var count = buf1.indexOf('@');
					
					$('.checkforIdValidation').empty();
					if(count==-1){
						$('.checkforIdValidation').append('<span class="negativeOutcome">Insert "@"</span>');	
					}else{
						var buf2 = buf1.substr(count);
						var count2 = buf2.indexOf('.');				
						if(count2==-1){
							$('.checkforIdValidation').append('<span class="negativeOutcome">Insert "."</span>');	
						}else{
							var buf3 = buf2.substr(count2);
							
							var count3 =0;
							var searchList = ['.com','.co.kr','.or.kr']; 
							
							for(var i =0; i<searchList.length;i++){
								count3 = buf3.search(searchList[i]);
								if(count3!=-1){
									break;
								}
							}
		
							if(count3==-1){
								$('.checkforIdValidation').append('<span class="negativeOutcome">com co.kr or.kr</span>');
								$('#email_validation').prop( "disabled", true);
								$('#email_validation').css('background','rgb(16, 22, 53)');
								$('#validation_to_email').prop( "disabled", true);
								validationProcess('emailCheck','email_Reg');
							}else{
								$('#validation_to_email').prop( "disabled", false);
								validationProcess('emailCheck','email_Reg');
							}
						}						
					}					
			 });
								
				$('#validation_to_email').click(function(){			
					$('#validation_to_email').prop('disabled',true);
					$.ajax({
						type:'GET',
						url : '/Bit_Place/ajax/login/sendingValidation.do',
						data : 'emailCheck='+$('#emailCheck').val(),
						async : true,
						contentType:'application/x-www-form-urlencoded;charset=UTF-8',
						success:function(response,status,request){
							
							var validationOutput = $.trim(response);	
							$('#validationCode').val(validationOutput);			
						}
					});		
					$('#email_validation').prop("disabled", false).css('background','white');
				});
				
				$('#email_validation').keyup(function(){
					$('.checkforIdValidation').empty();
						var str = $('#validationCode').val().match($(this).val());
						
						if(str!=-1){
							if(str.toString().length==5){
								$('.checkforIdValidation').append('<span class="positiveOutcome">Valid Authentication</span>');
								$('#reg_pwd').prop('disabled',false).css('background','white');
							}else{
								$('.checkforIdValidation').append('<span class="negativeOutcome">Invalid Authentication</span>');
							}
						}				
				});
				
				$('#reg_pwd').keyup(function(){
					var buf = $('#reg_pwd').val().toString().length;					
					if(buf>3){
					$('#reg_pwd2').prop('disabled',false).css('background','white');
					}
				});

				$('#reg_pwd2').keyup(function(){	
					$('.checkforIdValidation').empty();
					if($('#reg_pwd').val()==$('#reg_pwd2').val()){
						$('.checkforIdValidation').append('<span class="positiveOutcome">CorrectPassword</span>');
						$('#git_id').prop('disabled',false).css('background','white');					
						$('#git_pwd').prop('disabled',false).css('background','white');					
						$('#validation_to_github').prop('disabled',false);					

					}else{
						$('.checkforIdValidation').append('<span class="negativeOutcome">IncorrectPassword</span>');
					}
				});
				
				var github_id;
				
			  //github
				$('#validation_to_github').click(function(){
					$(this).prop('disabled',true);
				    $('.checkforIdValidation').empty();
					$.ajax({
					    type:"GET"
					    ,async : true
					          , url : '/Bit_Place/ajax/login/validation_to_github.do'
					          , dataType : "html"
					          , data : "git_id="+$('#git_id').val()+
					                   "&git_pwd="+$('#git_pwd').val()
					          , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
					          , error : function(request, status, error) {
								  $(this).prop('disabled',false);
						    	  $('.checkforIdValidation').append('<span class="negativeOutcome">Invalid Github ID</span>'); 
					          }
					    	  , success : function(response, status, request) {     
					    		  $('.checkforIdValidation').append('<span class="positiveOutcome">Valid GitHub ID</span>'); 
					    		  $('#photo').prop('disabled',false).css('background','white');	
					    		  
					    		  var gitidValue = response;
					    		  var k33g = new Gh3.User(gitidValue)
					    	        ,	userInfos = $("#user");

					    		  k33g.fetch(function (err, resUser){
					    			     if(err) {
					    			       throw "outch ..."
					    			     }
					    			     $('#usingGithubPhoto_wrapper').css({'display':'block'});
					    			     $('#usingGithubPhoto').empty().append('<img id="github_photo" class="img-circle" src="'+resUser['avatar_url']+'"/>');
					    			     $('#validationCode').val(resUser['avatar_url']);	    			     
					    		  });					    		  
					    	  }
					   });					   				
				});	
				
				$('#insertPhotoFileManually').css({'display':'none'});
				
				$('#git_id').keyup(function(){
					$('.checkforIdValidation').empty().append('<span class="negativeOutcome">Git_Id USERNAME ONLY</span>');
				});
				
				$('#usingGithubPhoto_wrapper').click(function(){
					$('#photo').attr('type','text').attr('name','photo');
					$('#frm').attr('action','../ajax/login/registersubmit.do');
					$('#photo').val($('#validationCode').val());
					$('#insertPhotoFileManually').css({'display':'block'});
					$('#usingGithubPhoto_wrapper').css({'display':'none'});
					$('#name').prop('disabled',false).css('background','white');					
				});
								
				$('#insertPhotoFileManually').click(function(){ 
					$('#frm').attr('action','../ajax/login/registersubmit_withFiles.do');
					$('#photo').attr('type','file').attr('name','photoUpfile');
					$('#usingGithubPhoto_wrapper').css({'display':'block'});
					$('#name').prop('disabled',false).css('background','white');					
				});
				
				
				$('#name').keyup(function(){
					$('#phone').prop('disabled',false).css('background','white');
				});
				
				$('#phone').mask("999-9999-9999");				
				
				$('#phone').keyup(function(){
					$('#submit').prop('disabled',false);	
				})
				
				$('#submit').click(function(){					
					$('#frm').submit();					
				});
				
				
		});
		
		$('#goBack').click(function(){
			$('.checkforIdValidation').empty();
			$('#submit_Register').css('margin-left','40px')
			$('#logged_members_box_Wrapper').css({'display':''});
			$('#login_body').empty().append($('#logins_form_booth').html());
			$('#registerBtn').css('display','');
			$('#pwdFindBtn').css('display','');
			$('#loginBtn_wrapper').css('display','');
			$('#goBack_wrapper').css('opacity','0');
			$('#submit_Register').css('opacity','0');
			$('#loginBtn_wrapper').css('display','');
		});		
		
		$('#pwdFindBtn').click(function(){
			$('#findemail').css('display','none');
			$('#findemail_wrapper').css('display','none');
			
			$('.checkforIdValidation').empty();
			$('#logged_members_box_Wrapper').css({'display':'none'});
			$('#login_body').empty().append($('#idspwd_booth').html());
			$(this).css('display','none');
			$('#registerBtn').css('display','none');
			$('#pwdFindBtn').css('display','none');
			$('#loginBtn_wrapper').css('display','none');
			$('#submit_Register').css('margin-left','10px');
			$('#goBack_wrapper').css('opacity','1');
			
			var i=0;
			$('#findname').keyup(function(){
				$('#findname_list').empty();
				
				$.ajax({
					type:'GET',
					url : '/Bit_Place/ajax/login/findname.do',
					data : 'searchValue='+$(this).val(),
					async : true,
					contentType:'application/x-www-form-urlencoded;charset=UTF-8',
					success:function(response,status,request){	
						$('#findname_list').empty().append(response);	
						
						var totalNum = $('#findId_email_totalNum').val();
						for(var i=0; i<totalNum; i++){
							$('#findId_email_'+i).click(function(){
								$('#findemail').css('display','');
								$('#findemail').val($(this).attr('value'));	
							});		
						  }
						
						$('#findemail_wrapper').css('display','');
						$('#findphone').mask('999-9999-9999');
						$('#findBtn').stop().click(function(){
							$.ajax({
								type:'GET',
								url : '/Bit_Place/ajax/login/findBtn.do',
								data : 'findemail='+$('#findemail').val()+
									   '&findphone='+$('#findphone').val()
								,
								async : true,
								contentType:'application/x-www-form-urlencoded;charset=UTF-8',
								success:function(response,status,request){	
									$('.checkforIdValidation').empty().append(response);
								}
							});
						});
						}
					});
								
			});
			
		});
	});	


	function validationProcess(inputId,service){
		var test = $('#'+inputId).val();
		$.ajax({
			type:'GET',
			url : '/Bit_Place/ajax/login/'+service+'.do',
			data : 'searchValue='+test,
			async : true,
			contentType:'application/x-www-form-urlencoded;charset=UTF-8',
			success:function(response,status,request){	
				$('.checkforIdValidation').empty();
				$('.checkforIdValidation').append(response);
			}
		});			
	}
