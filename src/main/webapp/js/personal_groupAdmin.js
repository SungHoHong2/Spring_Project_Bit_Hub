$(document).ready(function(){
	$('#input_page_body')
	.empty()
	.append($('#groupChange_body').html());
	
	var form = new FormData();
	var fileSize = 0;

	/*
	 * disappearing button at first look 
	 */
	var disappearedBtns =['#memberChange_btn_submit'
	                      ,'#memberChange_btn2_submit'
	                      ,'#titleChange_btn_submit'];
	
	for(var i=0; i<disappearedBtns.length; i++){
		$(disappearedBtns[i]).css('display','none');
	}
	
	$('#addTitle_Activate').css('display','none');
	var btnNames = ['#groupChange_btn','#groupChange_btn2','#memberChange_btn','memberChange_btn2','#titleChange_btn','#Q_AWatch_btn','#join_request_btn'];
	var count=0;
    var testing = 0;

	for(var i=0; i<btnNames.length; i++){
		$(btnNames[i]).click(function(){
			var btnName = $(this).attr('id');
			
			//disabling buttons
			for(var s=0; s<btnNames.length; s++){
				//disable top buttons
				$(btnNames[s]).attr('class','');
				//disable submit buttons
				$(btnNames[s]+'_submit').css('display','none');
			}
				
			//enable top button
			$(this).attr('class','active');
			//enable submit button			
			$('#'+$(this).attr('id')+'_submit').css('display','');
			
			//enable additional buttons
			if($(this).attr('id')=='titleChange_btn'){
				$('body').data('deletelist', new Array());
				count=0;
				$('#addTitle_Activate').css('display','');
			}else if($(this).attr('id')=='groupChange_btn'){
			    $('#groupChange_btn2_submit').css('display','');
			}else{
				$('#addTitle_wrapper').empty();
				$('#addTitle_Activate').css('display','none');
			}
			
			var bodyName = btnName.substring(0,btnName.lastIndexOf('_btn'));
			$('#input_page_body')
			.empty()
			.append($('#'+bodyName+'_body').html());	
						
			
	//title/contents 관리
			
			/*
			 * 제목 상세내역 확인 
			 */
			
			var titleTotalNum = $('#totalPage_titleAdd').val();
			for(var t=0; t<titleTotalNum; t++){
			$('#titleContentBtn_'+t).click(function(){
							
				for(var tt=0; tt<titleTotalNum; tt++){
					goBack($('#titleContentBtn_'+tt).attr('id'));
					
					//empty contentdisplay
					$('#titleContentBtn_'+tt+'_content').empty();
				}
				
					changeColors($(this).attr('id'));
					var buf = '#';
						buf+=$(this).attr('id');
						buf+='_content';
					
					/*
					 * Display Content
					 */
						
					$.ajax({
							type:'GET',
							url : '/Bit_Place/ajax/personal/groupAdmin_displayContent.do',
							data :'titleno='+$(this).attr('titleno'),
							async : true,
							contentType:'application/x-www-form-urlencoded;charset=UTF-8',
							success:function(response,status,request){
								$(buf).empty().append(response);
								var total = $('#groupAdmin_content_delete_Total').val();

								/*
								 * Pressing the delete button
								 */
								 
								for(var i=0; i<total; i++){
									$('#groupAdmin_content_deleteBtn_'+i).click(function(){		
										$.ajax({
											type:'GET',
											url : '/Bit_Place/ajax/personal/groupAdmin_deleteIndividuals.do',
											data :'contentno='+ $(this).attr('contentno')+
												  '&?groupno='+$('#groupno').val(),
											async : true,
											contentType:'application/x-www-form-urlencoded;charset=UTF-8',
											success:function(response,status,request){
											}
										});	
										$('#'+$(this).attr('deleteno')).empty();
									});
								}
								
							}					
					  });	
				});
			
			/*
			 * 제목 상세 내역 확인 끝
			 */
			
						
			/*
			 * Delete Button 
			 */			
				$('#titleContentBtnDel_'+t).click(function(){
					$('body').data('deletelist').push($(this).attr('titleno'));
					$('#'+$(this).attr('deletelabel')).empty();
				});
			}
				
			 /*
			  * Delete Button 끝  
			  */
			 
				//Member 관리  	
			$('#searchUsers_keyup').keyup(function(){
			    
				$.ajax({
					type:'GET',
					url : '/Bit_Place/ajax/personal/groupAdmin_searchUsers.do',
					data :'name='+$(this).val(),
					async : true,
					contentType:'application/x-www-form-urlencoded;charset=UTF-8',
					success:function(response,status,request){
						
						$('#groupAdmin_searchUsers').empty().append(response);
						
						
						//var total = $('#total_memberAddGroup').val();
					
						/*for(var i=0; i<total; i++){
							$('#memberAddGroup_'+i).click(function(){
								$('#addFolowers').append($(this).attr('email'));									
							});
						}*/
						
						$(".member-add-group").click(function(event){
							event.preventDefault();
							var photo = $(this).attr("data-photo");
							var email = $(this).attr("data-email");
							var name = $(this).attr("data-name");
							var memno = $(this).attr("data-memno");
							var isMember = false;
							var totalCount = $("#memno-count").val();
						
							for(var i=0; i<totalCount; i++){
							var memnoCount = $(".member-remove-"+i).attr("data-memno");
						
							if(memno == memnoCount){
								isMember = true;
								alert("ì´ë¯¸ ê·¸ë£¹ì— ê°€ìž…ë˜ì–´ ìžˆìŠµë‹ˆë‹¤");
								
							}
							}
							
							
							
							if(isMember == false){
							var addCount =Number($("#add-count").val());
							
							$(".hidden-space").remove();
							$("<table>").addClass("follower-table").attr("id", "follower-table-"+addCount)
							.attr("data-memno", memno).css("width", "393px")
							.append($("<tr>").append($("<td>").css("width", "90px")
							.append($("<img>").attr("src", "../img/userimages/"+photo)
							.addClass("img-circle").addClass("follower-circle")))
							.append($("<td>").css("width", "160px").css("align", "center").html(name))
							.append($("<td>").css("width", "250px").css("align", "center").html(email))
							.append($("<td>").css("width", "50px").append($("<a>").attr("data-addCount", addCount)
							.addClass("add-remove").attr("href", "#")
							.append($("<span>").addClass("glyphicon").addClass("glyphicon-remove")))))
							.appendTo($(".follower-border"))
							
							$("<div>").addClass("hidden-space")
							.appendTo($(".follower-border"))	
							
							++addCount;
							$("#add-count").val(addCount);
							
							var height = $(".follower-border").css("height");
							var end = height.lastIndexOf("px");
							var numHeight = height.substring(0, end);
							if(Number(numHeight)>52){
								$("#follower-invitation").attr("disabled", false);
							}else{
								$("#follower-invitation").attr("disabled", true);
							}
							
							$(".add-remove").click(function(event){
								event.preventDefault();
								
								var addCount = $(this).attr("data-addCount");
								$("#follower-table-"+addCount).remove();
								
								var height = $(".follower-border").css("height");
								var end = height.lastIndexOf("px");
								var numHeight = height.substring(0, end);
								if(Number(numHeight)>52){
									$("#follower-invitation").attr("disabled", false);
								}else{
									$("#follower-invitation").attr("disabled", true);
								}
							});
							}
							
						});
												
					}
				});						
			});
			//member ë
			
			
			
			
			
			
			
			$("#follower-invitation").click(function(event){
				event.preventDefault();
				
				$(this).data("list", new Array());
				var totalCount = $("#add-count").val();
				
				for(var i=0; i<totalCount; i++){
					var memno=$("#follower-table-"+i).attr("data-memno");
					
					if(memno != undefined){
					$(this).data("list").push(memno);
					}
				}
				
				var receiverno = $(this).data("list").toString();
				var groupno = $("#groupno").val();
				var content = $("#invitation-message").val();
				
				$.ajax({
					type:'GET',
					url : '/Bit_Place/ajax/personal/followerInvitationByLeader.do?receiverno='
					+receiverno+"&groupno="+groupno+"&m_content="+content,
					success:function(response){
						alert(response);
						location.reload();
						
					}
				  });	
			})
			
			$(".leader-request").click(function(event){
				event.preventDefault();
				var memnoCount = $(this).attr("data-memnoCount");
				/*var receiver = $(this).attr("data-memno");
				var groupno = */
				$(".invisible-message-tr-"+memnoCount).show();
				$(".invitation-message2-"+memnoCount).keyup(function(event){
					event.preventDefault();
				var content = $(".invitation-message2-"+memnoCount).val();
				if(content != ""){
					$(".leader-invitation-"+memnoCount).attr("disabled", false);
				}else{
					$(".leader-invitation-"+memnoCount).attr("disabled", true);
				}
				});
				
			});
			
			$(".leader-invitation").click(function(event){
				event.preventDefault();
				var memnoCount = $(this).attr("data-memnoCount");
				var content = $(".invitation-message2-"+memnoCount).val();
				var groupno = $("#groupno").val();
				var receiver = $(this).attr("data-memno");
				
				$.ajax({
					type:'GET',
					url : '/Bit_Place/ajax/personal/LeaderInvitationByLeader.do?receiver='
					+receiver+"&groupno="+groupno+"&m_content="+content,
					success:function(response){
						alert(response);
						location.reload();
						
					}
				  });	
				
			});
			
			$(".member-remove").click(function(event){
				event.preventDefault();
				var groupno = $("#groupno").val();
				var memno = $(this).attr("data-memno");
				
				$.ajax({
					type:'GET',
					url : '/Bit_Place/ajax/personal/memberRemove.do?memno='
					+memno+"&groupno="+groupno,
					success:function(response){
						alert(response);
						location.reload();
						
					}
				  });
			});
			
			// getElementById
			function $id(id) {
				return document.getElementById(id);
			}

			//
			// output information
			function Output(msg) {
				var m = $id("filedrag");
				m.innerHTML = msg + m.innerHTML;
			}
			
			// call initialization file
			if (window.File && window.FileList && window.FileReader) {
				Init();
			}

			//
			// initialize
			function Init() {

				var fileselect = $id("fileselect"),
					filedrag = $id("filedrag");
					
				// file select
				fileselect.addEventListener("change", FileSelectHandler, false);
				
					
				

				// is XHR2 available?
				var xhr = new XMLHttpRequest();
				if (xhr.upload) {
				
					// file drop
					filedrag.addEventListener("dragover", FileDragHover, false);
					filedrag.addEventListener("dragleave", FileDragHover, false);
					filedrag.addEventListener("drop", FileSelectHandler, false);
					filedrag.style.display = "block";
					
					
				}

			}
			
			// file drag hover
			function FileDragHover(e) {
				e.stopPropagation();
				e.preventDefault();
				e.target.className = (e.type == "dragover" ? "hover" : "");
			}
			
			// file selection
			function FileSelectHandler(e) {
				 

				// cancel event and hover styling
				FileDragHover(e);

				// fetch FileList object
				var files = e.target.files || e.dataTransfer.files;
				
				
				
				// process all File objects
				for (var i = 0, f; f = files[i]; i++) {
					var fileCount = $("#fileCount").val();
					++fileCount;
					ParseFile(f);
					fileSize += f.size;
						
					form.append("file_"+fileCount, f);
					$("#fileCount").val(fileCount);
				}
				
				
				if(fileSize  < 1024){
					totalFileSize=fileSize+"bytes";
				}else if(fileSize  < 1048576){
					totalFileSize=Math.round((fileSize/1024)*100)/100+"KB";
				}else if(fileSize < 3145728){
					totalFileSize=parseInt((fileSize/1048576)*100)/100+"MB";
				}else{
					totalFileSize=parseInt((fileSize/1048576)*100)/100+"MB";
					$("#select-filesize").css("color", "red");
				}
				$("#select-filesize").empty().append(totalFileSize);
				
				$("#fileselect").css("position","absolute").css("top","0").css("right", "0")
				.css("margin", "0").css("padding", "0").css("font-size", "20px").css("cursor","pointer")
				.css("opacity", "0").css("filter", "alpha(opacity=0)");
			}
			
			function ParseFile(file) {
				var size = 0;
				if(file.size < 1024){
					size=file.size+"</strong> bytes</p>";
				}else if(file.size < 1048576){
					size=Math.round((file.size/1024)*100)/100+"</strong> KB</p>";
				}else{
					size=Math.round((file.size/1048576)*100)/100+"</strong> MB</p>";
				}
				$("#filedrag-p").remove();

				Output(
					"<p class='file-detail'>파일명:<strong>" + file.name +
					/*"</strong> type: <strong>" + file.type +*/
					"</strong>&nbsp;  í¬ê¸°:<strong>" + size+"</strong></p>" 
					
				);
				
			}
			
			
			
			 
		});
	}
	
	
	$("#join_request_btn").click(function(event){
		event.preventDefault();
		
		var groupno = $("#groupno").val();
		
		$.ajax({
			type:'GET',
			url : '/Bit_Place/ajax/personal/joinRequestPage.do?groupno='+groupno,
			success:function(response){
				$("#request-content").empty().append(response);
			}
		  });	
	});
	

	$("#Q_AWatch_btn_submit").click(function(event){
		event.preventDefault();
		var title = $("#announce_title").val();
		var content = $("#announce_content").val();
		var groupno = $("#groupno").val();
		
		form.append("title", title);
		form.append("m_content", content);
		form.append("groupno", groupno);
		
		if(fileSize > 3145727 ){
			alert("파일 용량이 초과되었습니다");
		}
		if(title == ""){
			$("#announce_title").css("border", "1px solid red").css("background-color", "rgb(255, 199, 199)")
			.attr("placeholder", "제목을 입력해 주세요")
		}
		if(content == ""){
			$("#announce_content").css("border", "1px solid red").css("background-color", "rgb(255, 199, 199)")
			.attr("placeholder", "내용을 입력해 주세요")
		}
		if(fileSize < 3145728 && title != "" && content != ""){
		
		$.ajax({
		      url: "../upload/postAnnounce.do",
		      data: form,
		
		      processData: false,
		      contentType: false,
		      type: 'POST',
		      success: function (data) {
		       location.reload();
		      }
		      
		    });
		}
	});
	
	
	function changeColors(value){
			$('#'+value).css('border','2px solid #eb9316');
			var test='#';
			test+=$('#'+value).attr('id');
			test+='_selector';
			$(test).css('border','2px solid #eb9316');
			
			test='#';
			test+=$('#'+value).attr('id');
			test+='_date';
			$(test).css('border','2px solid #eb9316');		
			
			test='#';
			test+=$('#'+value).attr('id');
			test+='_name';
			$(test).css('border','2px solid #eb9316');	
	}
	
	function goBack(value){
			$('#'+value).css('border','1px solid #ccc');
			var test='#';
			test+=$('#'+value).attr('id');
			test+='_selector';
			$(test).css('border','1px solid #ccc');
			
			test='#';
			test+=$('#'+value).attr('id');
			test+='_date';
			$(test).css('border','1px solid #ccc');	
			
			test='#';
			test+=$('#'+value).attr('id');
			test+='_name';
			$(test).css('border','1px solid #ccc');	
	}
	
	
	$('#addTitle_Activate_Btn').click(function(){
		var data=
		'<span class="titleChange_labels">'+
		'<div class="col-sm-2">'+
		'<select class="form-control">'+
		'<option>1</option>'+
		'<option>2</option>'+
		'</select></div>'+
		'<div class="col-sm-2">'+
		'<input type="text" class="form-control" name="list2['+count+'].title">'+
		'</div><div class="col-sm-3">'+
		'<input type="text" class="form-control" disabled>'+
		'</div>'+
		'<div class="col-sm-1">'+
		'<button type="button" class="btn btn-danger">삭제</button>'+				
		'</div></span>';								
		$('#addTitle_wrapper').append(data);
		count++;
	});
	
	$('#groupChange_btn_submit').click(function(){
		$('#frm').attr('action','/Bit_Place/ajax/personal/groupChange_btn_submit.do'+
				'?groupno='+$('#groupno').val())
		.submit().attr('action','');	
	});
	
	$('#memberChange_btn_submit').click(function(){
		var memData = $('#addFolowers').val();
		var memDataArray = memData.split(', ');
		var ArrayCounts=0;
	    var data='';

	    
		for(var i=0; i<memDataArray.length; i++){			
			$.ajax({
				type:'GET',
				url : '/Bit_Place/ajax/personal/groupAdmin_memDataValidation.do',
				data :'email='+memDataArray[i]+
				      '&count='+ArrayCounts 
			    ,
				async : true,
				contentType:'application/x-www-form-urlencoded;charset=UTF-8',
				error : function(request, status, error){
			          alert($(this).val()+' 유효하지 않은 메일입니다.');
			    },
				success:function(response,status,request){
					   $('#groupAdmin_validEmails').append(response);
					   
					   	data += $('#groupAdmin_validEmails').html();
						var key = data.lastIndexOf('유효하지 않은 이메일');
						if(key>0){
							//alert('problem : '+data);
							$('#truefalse').val('false');
						}
				  }
			});		
		    	ArrayCounts++;		
		    	
		    	$('#memberChange_btn_submit').css('display','none');
		    	$('#memberChange_btn2_submit').css('display','');
		}
	});
	
	
	
	$('#memberChange_btn2_submit').click(function(){
		if($('#truefalse').val()=='false'){
			alert('잘못되었습니다.');
		}else{
			//alert('성공입니다.');
			$('#frm').attr('action','/Bit_Place/ajax/personal/memberChange_btn_submit.do'+
					'?groupno='+$('#groupno').val())
			.submit().attr('action','');
		}		
	});

	
	
	$('#titleChange_btn_submit').click(function(){		
		$('#frm').attr('action','/Bit_Place/ajax/personal/groupAdminTitle_submit.do'+
				'?groupno='+$('#groupno').val()+
				'&deletelist='+$('body').data('deletelist'))
		.submit()
		.attr('action','');
	});	
	
	


	
	
	
});
