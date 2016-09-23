/*
 *  undone task
 *  top and the sub jquery have to be separated 
 *  for the sake of loading efficiency
 * 
 */

$(document).ready(function(){
	$('#black_screen').css('display','none');
	$('#loading_icon').css('display','none');
	var pathname = window.location.pathname;	
	var data = pathname;
	var arr = data.split('/');
	var sub = arr[arr.length-2];    
	var file = arr[arr.length-1].split('.');
	
	
//top.jsp class.jsp 
	var groupflag = false;
		
	$('#submenGroups_searchOutput').css('display','none');
	$('#submenGroups_describe').css('display','none');

	$("#submenu_groupbtn_wrapper").stop().hover(
		  function(){		
			var heights = $('#submenuWrapper').css('height');
			$('#submenu').stop().animate({opacity:'0.8', height : heights},300);	
						
			$('#submenGroups_searchInput').keyup(function(){
				var height = $('#submenu').height();
				$('#submenGroups_searchOutput').css('top',height).css('display','');
				
				if($(this).val()!=''){
				$.ajax({
					type:'GET',
					url : '/Bit_Place/ajax/groups/searchGroup.do',
					data : 'data='+$(this).val(),
					async : true,
					contentType:'application/x-www-form-urlencoded;charset=UTF-8',
					success:function(response,status,request){
						$('#submenGroups_searchOutput').empty().append(response);
						
						/*
						 * Invite Friends 
						 * by clicking on the btn .groupInviteBtn (no ids) 
						 * in searchGroup.jsp 
						 */						
						
						var totalNum = $('#searchedGrouptotal').val();
	
						for(var s=0; s<totalNum; s++){
							$('#searchedGroupsDescBtn_'+s).hover(function(){
								$.ajax({
									type:'GET',
									url : '/Bit_Place/ajax/groups/searchGroupDetail.do',
									data : 'data='+$(this).attr('groupNo'),
									async : true,
									contentType:'application/x-www-form-urlencoded;charset=UTF-8',
									success:function(response,status,request){
										$('#submenGroups_describe')
										.empty()
										.append(response)
										.css('top',height).css('display','');
									}
								});
								
							},function(){
							});
						}	
					}
				});
				}
				
			});			
		  }
	      ,function(){
			 $('#submenGroups_describe').css('display','none');
	    	 $('#submenGroups_searchOutput').css('display','none');
	    	 $('#submenu').stop().animate({opacity:'0', height : '0px'},400);
	      }
	);

	
	/*
	 * top.jsp title.jsp 
	 */
	
	var totalTitleNum = $('#totalTitleNum').val();	
	
	if($('#titlefirstPageCheck').val()=='true'){
		$('#title_Paging_Custom').css('left','1px');
	};
	
	
	if(totalTitleNum==3){

	}else if(totalTitleNum==2){
		$('#title_ul').css('margin-left','-69px');
	}else if(totalTitleNum==1){
		$('#title_ul').css('margin-left','-121px');
	}else{
		$('#nextBtn_wrapper').css('display','none');
	}	
	
	for(var i=0; i<totalTitleNum; i++){
		$('.title_btn_'+i).click(function(){
			
			var titlenum = $(this).attr('titleno');		

			console.log(titlenum);
		    if(file[0]=='logged'){
			$.ajax({
				type:'GET',
				url : '/Bit_Place/main/frame/displayContentByTitle.do',
				data : 'logged=true&titleno='+titlenum,
				async : true,
				contentType:'application/x-www-form-urlencoded;charset=UTF-8',
				success:function(response,status,request){
					$('#sub_data').empty();
					$('#sub_data').append(response);	
					}
			  });	
		    }else if(sub=='groups'){
		    	$.ajax({
					type:'GET',
					url : '/Bit_Place/main/frame/displayContentByTitle.do?groupno='+file[0]+'&titleno='+titlenum,
					async : true,
					contentType:'application/x-www-form-urlencoded;charset=UTF-8',
					success:function(response,status,request){
						$('#sub_data').empty();
						$('#sub_data').append(response);	
						}
				  });	
		    }
		    
		});
	}
	
	
	$('#nextBtn').click(function(){
		
	    if(file[0]=='logged'){
	    	$.ajax({
				type:'GET',
				url : '/Bit_Place/main/frame/title_Paging.do?logged=true&startPage='+$(this).attr('value'),
				async : true,
				contentType:'application/x-www-form-urlencoded;charset=UTF-8',
				success:function(response,status,request){
					$('#title_sub_output')
					.empty()
					.append(response);	
					}
			  });	
	    }else if(sub=='groups'){
	    	$.ajax({
				type:'GET',
				url : '/Bit_Place/main/frame/title_Paging.do?groupNo='+file[0]+'&startPage='+$(this).attr('value'),
				async : true,
				contentType:'application/x-www-form-urlencoded;charset=UTF-8',
				success:function(response,status,request){
					$('#title_sub_output')
					.empty()
					.append(response);	
					}
			  });
	    }
		
	 
	});
	
	
	$('#prevBtn').click(function(){
		
	    if(file[0]=='logged'){
	    	$.ajax({
				type:'GET',
				url : '/Bit_Place/main/frame/title_PagingRe.do?logged=true&prevPage='+$('.title_btn_0').attr('id'),
				async : true,
				contentType:'application/x-www-form-urlencoded;charset=UTF-8',
				success:function(response,status,request){
					$('#title_sub_output')
					.empty()
					.append(response);	
					}
			  });	 
	    }else if(sub=='groups'){
	    	$.ajax({
				type:'GET',
				url : '/Bit_Place/main/frame/title_PagingRe.do?groupNo='+file[0]+'&prevPage='+$('.title_btn_0').attr('id'),
				async : true,
				contentType:'application/x-www-form-urlencoded;charset=UTF-8',
				success:function(response,status,request){
					$('#title_sub_output')
					.empty()
					.append(response);	
					}
			  });	 
	    }
	});
	
	
	/*
	 * 개발자 장윤용
	 */
		
	
	$("#groupFollower").click(function(event){
		event.preventDefault();
		var groupno = null;
		if(file[0] == 'logged'){
			groupno = $(this).attr("data-groupno");
		}else{
			groupno = file[0];
		}
		$.ajax({
			type: 'GET',
			url : '/Bit_Place/ajax/personal/viewAnnounce.do?groupno='+groupno,
			success:function(response){
				$('#body_output')
				.empty()
				.append(response);
				
				$(".page").eq(0).css("color", "blue").css("text-decoration", "underline");
				
				$(".announceDetail").click(function(event){
					event.preventDefault();
					var leadno = $(this).attr("data-leadno");
					$.ajax({
						type: 'GET',
						url : '/Bit_Place/ajax/personal/announceDetail.do?leadno='+leadno,
						success:function(response){
							$("#body_output").empty().append(response);
							
						}
					});
					
				});
				
				$(".page").click(function(event){
					event.preventDefault();
					var index = $(this).attr("data-index");
					var groupno = $("#groupno").val();
					$(".page").not(this).css("color", "black").css("text-decoration", "");
					$(this).css("color", "blue").css("text-decoration", "underline");
					
					$.ajax({
						type: 'GET',
						url : '/Bit_Place/ajax/personal/changeViewAnnounce.do?groupno='+groupno+"&index="+index,
						success:function(response){
							$("#announce-table-body").empty().append(response);
							$(".announceDetail").click(function(event){
								event.preventDefault();
								var leadno = $(this).attr("data-leadno");
								$.ajax({
									type: 'GET',
									url : '/Bit_Place/ajax/personal/announceDetail.do?leadno='+leadno,
									success:function(response){
										$("#body_output").empty().append(response);
										
									}
								});
								
							});
						}
					});
					
				});
				
				$(".pageSize").click(function(event){
					event.preventDefault();
					var groupno = $("#groupno").val();
					var pageName = $(this).attr("data-pageName");
					var page = $(this).attr("data-page");
					var pageSize = $(this).attr("data-pageSize");
					var totalSize = $(this).attr("data-totalSize");
					++page;
					
					$.ajax({
						type: 'GET',
						url : '/Bit_Place/ajax/personal/changePageAnnounce.do?groupno='+groupno+
						"&page="+page+"&pageSize="+pageSize+"&pageName="+pageName+"&totalSize="+totalSize,
						success:function(response){
							$("#body_output").empty().append(response);
							$(".page").eq(0).css("color", "blue").css("text-decoration", "underline");
							
						}
					});
					
				});
			}
		});
	})
	

	
		
	
	$('#personalInfo').click(function(){
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
					    // ie Ã¬ÂÂ¼Ã«â€¢Å’ input[type=file] init.
					    $("#fileId").replaceWith( $("#fileId").clone(true) );
					} else {
					    // other browser Ã¬ÂÂ¼Ã«â€¢Å’ input[type=file] init.
					    $("#fileId").val("");
					}
					$('#hiddenPhoto').val("https://avatars.githubusercontent.com/u/7775019?v=2");
				})
				}
		  });	
	});
	
	/*
	 * 개발자 장윤용
	 */
	
	
	$('#groupAdmin').click(function(){
		var pathname_body = window.location.pathname;	
    	var arr_body = pathname_body.split('/');
    	var sub_body = arr_body[arr_body.length-2];    
    	var file_body = arr_body[arr_body.length-1].split('.');
          		
    	$('#body_output').css('height','');
    	
	    if(file_body[0]=='logged'){
			$.ajax({
				type:'GET',
				url : '/Bit_Place/ajax/personal/groupAdmin.do',
				data : 'sessionGo=true',
				async : true,
				contentType:'application/x-www-form-urlencoded;charset=UTF-8',
				success:function(response,status,request){
					$('#body_output')
					.empty()
					.append(response);	
					}
			  });		    		    	
	    	
	    }else if(sub_body=='groups'){
			$.ajax({
				type:'GET',
				url : '/Bit_Place/ajax/personal/groupAdmin.do',
				data : 'groupNo='+file_body[0],
				async : true,
				contentType:'application/x-www-form-urlencoded;charset=UTF-8',
				success:function(response,status,request){
					$('#body_output')
					.empty()
					.append(response);	
					}
			  });		    	    	
	    }		
	});
	
	
	
//displayContent.jsp and frame/sub.jsp	
/*
 * body
 * Paging 
 */			

	
	//submenGroups.jsp
	$('#createGroupsBtn').click(function(){
		$.ajax({
		type:'GET',
		url : '/Bit_Place/ajax/groups/createGroup.do',
		async : true,
		contentType:'application/x-www-form-urlencoded;charset=UTF-8',
		success:function(response,status,request){
			$('#body_output').css({'height':'300px'})
			.empty()
			.append(response);	
			
			$('#submitContent').click(function(){
				$('#groupfrm').attr('action','/Bit_Place/ajax/groups/insertGroup.do').submit();
			});
			
		}
	});			
		
});
	

//end	
});