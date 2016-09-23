$(document).ready(function(){

	var pathname = window.location.pathname;	
	var data = pathname;
	var arr = data.split('/');
	var sub = arr[arr.length-2];    
	var file = arr[arr.length-1].split('.');
	
	var textRandom = [
	                	'Fetch와 Pull은 유사하면서도 다른 개념입니다. Pull이 Fetch를 포함하고 있는 더 큰 개념입니다. - Bithub'
	                     ,'Bit학원은 별관과 본관으로 분리되어 있습니다. - Bithub'
	                     ,'파일을 업로드했다고 해서 Git서버에 저장되는 것은 아닙니다. Commit이 필요합니다. - Bithub'
	                     ,'Bit학원의 무선 wifi는 저녁이 되면 매우 느려집니다. - 홍성호'
	                     ,'느린 wifi에서 Git서버로 자료를 Push하면 오류가 날 확률이 매우 높습니다. - Bithub'

	                       ];
	                	
    var iconRandom = [
	                    '../img/content/loading_1.png'
	                	,'../img/content/loading_2.png'
	                	,'../img/content/loading_3.png'
	                	,'../img/content/loading_4.png'
	                	,'../img/content/loading_5.png'

	                       ];    
    
	function loadingGitFiles(activate){
		    
		   if(activate=='on'){ 
		   var num = Math.floor(Math.random()*iconRandom.length);
			$('#loading_image')
			.append(
			 $('<img/>')
			 .attr('src',iconRandom[num])
			 );			
			$('#loading_text')
			.append(textRandom[num]
			);
		   }else if(activate=='off'){
			$('#loading_image').empty();
			$('#loading_text').empty();
		   }	
	 }
	
	var datanumberresult= $('#datanumberresult').val();	
	for(var i=0; i<datanumberresult;i++){
		$('.subbtn_'+i).click(function(){
						
			/*
			 * loading screen 
			 */
			
			loadingGitFiles('on');
			
			$('#black_screen')
			.css('opacity','0.6')
			.css('display','');
			
		    $('#loading_icon')
		    .css('opacity','1')
			.css('display','');

		    /*
		     * loading screen end 
		     */
		    
			
		    
		    
			var contentno = $(this).attr('contentno');	
			var git_id=$(this).attr('git_id');
			var git_rep=$(this).attr('git_rep');
			var git_pwd=$(this).attr('git_pwd');
			var commitsha=$(this).attr('commitsha');
			
			$.ajax({
				xhrFields: {
					 onprogress: function (e) {
						if (e.lengthComputable) {
						console.log(e.loaded / e.total * 100 + '%');}}
						},
						success: function (response) {
					},
				type:'GET',
				url : '/Bit_Place/ajax/groups/displayContent.do'+
				'?contentno='+contentno+
				'&git_id='+git_id+
				'&git_rep='+git_rep+
				'&git_pwd='+git_pwd+
				'&commitsha='+commitsha,
				async : true,
				contentType:'application/x-www-form-urlencoded;charset=UTF-8',
				success:function(response,status,request){
					$('#body_output').empty();
					$('#body_output').append(response);
					
					/*
					 * disable loading screen
					 */
					loadingGitFiles('off');
					
					$('#black_screen')
					.css('opacity','0')
					.css('display','none');
					
				    $('#loading_icon')
				    .css('opacity','0')
					.css('display','none');
				    
					/*
					 * disable loading screen end
					 */
				   
				    
				    $('#changedDataChecker').css('display','none');
				    $('#changedDataChecker').css('height',$('#output').css('height'));
				 
				
					$('#opendetail_wrapper').hover(function(){$(this).css('opacity','1')},function(){$(this).css('opacity','0.3')});

					
				    $('#downloadAll').click(function(){
				    	window.open('http://github.com/'+git_id+'/'+git_rep);
				    })
				    
				    $('#typeintoContent').keyup(function(){
				    	$('#content').empty().val($(this).val());				    	
				    });
				   
					
				   $('#newFile_total').val($('#folderNum').val()); 
				    
					//flagkkk
					$('.content_commitsha').click(function(){
						var contentno = $('#contentno').val();
						$('#uniqueSubbtn_'+contentno).attr('commitsha',$(this).attr('sha'));
						console.log('testdata : '+$('#'+contentno).attr('class'));
						$('.'+$('#uniqueSubbtn_'+contentno).attr('class')).trigger('click');
					});
				   				    
				
					
				 	var folderNum = parseInt($('#folderNum').val());
				 	folderNum+=1;
				 	
					$('#output')
					.append($('<ul/>')
				    .attr('class','ui-sortable')
					.attr('id','folder_'+folderNum+'_')
					);
				 	
					$('#output_addFiles').click(function(){
						
					 	var folderNum = parseInt($('#folderNum').val());
					 	folderNum+=1;

						console.log(folderNum);
						$('#folder_'+folderNum+'_')
						.append($('<li/>')
						.attr('id','tempFile')
						.css('color','black')
						.attr('class','gitfiles')
						.append($('<input/>')
								.attr('id','buffile')
								.attr('type','text')
								.attr('place-holder','insert filename')
							   )
						);
						
						
						$('#opendetail_buttonGroup')
						.empty()
						.append(
							   $('<span/>')
							   .append($('<img/>')
									   .attr('src',"../img/content/upload.png")
									   .css('margin-top','10px')
									   .css('margin-left','14px')
							   		  )
							   .click(function(){

								   var buffingfile = $('#buffile').val();
								   console.log('newfile upload data : '+buffingfile);
								   
								   var newFileNum =parseInt($('#newFile_total').val()); 
								   var totalFileNum = $('#fileNum').val();
								   $('#tempFile').empty().text(buffingfile); 
								   $('#tempFile')
								   .css('color','rgb(68, 206, 101)')
								   .attr('id','folder_sub_'+(++newFileNum))
								   .attr('path','/'+buffingfile)
								   .attr('sha','undefined')
								   .attr('newFile','true');

								   	$('#newFile_total').val(newFileNum);
							   })
						);
						
						$.ajax({
							type:'GET',
							url : '/Bit_Place/ajax/groups/content_write.do',
							async : true,
							contentType:'application/x-www-form-urlencoded;charset=UTF-8',
							success:function(response,status,request){
								$('#opendetail_contents')
								.empty()
								.append(response);
								
								$('#opendetail_wrapper').css('height',$('#output').height()); 
						    }
						});						
					});
					
					
					$('#output_addDir').click(function(){

						var folderNum = parseInt($('#folderNum').val());
					 	folderNum+=1;
						console.log(folderNum);
						$('#folder_'+folderNum+'_')
						.append($('<li/>')
							    .attr('class','gitfolders')
								.attr('id','newfolderLi')	
								.append($('<span/>')
										.attr('id','spanfolderName')
										)
								.append($('<input/>')
										.css('color','black')
										.attr('id','newfolderName')
										)
								.append($('<span/>')
										.attr('id','insertnewfolderName')
										.text('폴더입력')
										.click(function(){
											
											$('#spanfolderName')
											.append($('#newfolderName').val());
											$('#folder_add')
											.append('<li class="gitnothing" id="erasefolder">'+'insertfolder'+'</li>');
																					
											$('#newfolderLi')
											.attr('type','folder')
									        .attr('path','/'+$('#newfolderName').val());
											
											
											
											$('#folder_add')
									        .attr('path','/'+$('#newfolderName').val())
											
									        $('#newfolderName').remove();
											$('#insertnewfolderName').remove();											
										})
										)		
								.append(
									    $('<ul/>')
									    .attr('class','ui-sortable')
									    .attr('id','folder_add')
								 		));
								  

						$('#folder_add')
				 		.sortable({
				 			placeholder:'highlight',
				 			start : function(event, ui){
				 					
				 			}
				 			,receive : function(event, ui){	
				 				$('#erasefolder').remove();
				 				console.log('folder_add : '+$('#'+this.id).attr('path'));	
				 				console.log('folder_add : '+$('#'+ui.item.attr('id')).attr('path'));
				 							 		
				 				  var idAfter = '#'+this.id;
					 		      var idBefore = '#'+ui.item.attr('id');
					 		      var addData = $('#addList_total').val();
					 		      var moveData = $('#moveList_total').val();
					 		      var updatedPath = $(idBefore).attr('path').substring($(idBefore).attr('path').lastIndexOf('/')+1);
				 				
					 		      
					 		 
					 		      
				 				/*
					    		 * remove sha duplicates
					    		 */	
					 		      
					 		      
					    			for(var u=0; u<moveData; u++){
					    				
					    				console.log('remove sha duplicates activated33333 : '+$(idBefore).attr('sha'));
					    			
					    				
					    				if($(idBefore).attr('sha')!='undefined'){
					    				if($(idBefore).attr('sha')==$('#move_data_wrapper_'+u).attr('sha') && $(idBefore).attr('sha')!='undefined'){
					    										    					
					    					$('#move_data_wrapper_'+u)
					    					.empty().remove();
					    					$('#fakeMove_'+u).empty().remove();
					    					$('#moveList_total').val(--moveData);
					    				}
					    				}
					    			}
					 		       
					    			console.log('testing newFIles : '+$(idBefore).attr('newFile'));
					
					    
					    			
					    			
					    			$('#changeList')
							    	.append(  //actual data for input 
									    	$('<div/>')
									    	.css('display','none')
									    	.attr('id','move_data_wrapper_'+moveData)
									    	.attr('sha',$(idBefore).attr('sha'))
									    	.attr('path',$(idBefore).attr('path'))  
									    	// used for removing 
									    	.append(
									    			$('<input/>')  //used for updating
									    			.attr('name','list3['+moveData+'].sha')
									    			.val($(idBefore).attr('sha'))
									    	).append(
									    			$('<input/>')
									    			.attr('name','list3['+moveData+'].path')
									    			.val($(idAfter).attr('path')+'/'+updatedPath)
									    	).append(
									    			$('<input/>')
									    			.attr('name','list3['+moveData+'].pathBefore')
									    			.val($(idBefore).attr('path'))
									    	).append(
									    			$('<input/>')
									    			.attr('name','list3['+moveData+'].newcontent')
									    			.val('false')
									    	)
							    	).append(   //fake data for displaying 
							    			$('<div/>')
							    			.attr('class','updateList')
							    			.attr('id','fakeMove_'+moveData)
							    			.css('color','rgb(105, 95, 95)')
							    			.append('<img src="../img/content/updatelist.png" width="25px" height="25px">')
							    			.append('자료 이동 '+$(idBefore).attr('path')+' >>>> '+$(idAfter).attr('path')+'/'+updatedPath)
							    	);	
				        			
					    			if($(idBefore).attr('newFile')=='true'){
					    				$('#move_data_wrapper_'+moveData)
					    				.attr('newFile','true')
					    				.append(
					    						$('<textarea/>')
					    						.attr('name','list3['+moveData+'].newcontent')
					    						.text($('#after').val())
					    				       );
					    				
					    				       
					    				$(idBefore).attr('newFile','enabled');
					    			}
					    			
							    	$('#moveList_total').val(++moveData);	
						 		     }
					    			
				 			
				 		});
						
						/*
						 * console.log('updatePath : '+$('#'+this.id).attr('path'));
					  	   console.log('updatePath : '+$('#'+ui.item.attr('id')).attr('path'));
						 * 
						 */
						
						
					});
					
		
			 		        
					
				    $('#changeList_wrapper')
				    .css('min-height',$('#content_data_wrapper').height()+'px');
				    
				    /*
				     * arrange Git Files from RAW
				     */
					 	var folderNum = $('#folderNum').val();
					 	folderNum = parseInt(folderNum);
					 	
					 	//div, totalNumber of folders, parentNum 
					 	listingFiles('#output',folderNum, 0);
					 	
					  /*
					   * arrange Git Files from RAW End 
					   */
					 	
					  
					  /*
					   * action Folders 
					   */	 
					 	 		
					 	
					 	for(var i=0; i<folderNum+9; i++){
					 		
					 		$('#folder_'+i+'_')
					 		.sortable({
					 			placeholder:'highlight',
					 			start : function(event, ui){
								    $('#testoutput').append();
					 			}
					 			,receive : function(event, ui){					 		       
					 		        
					 		        console.log('updatePath : '+$('#'+this.id).attr('id'));
					 		        console.log('updatePath : '+$('#'+this.id).parent('path'));

					 		        console.log('updatePath Type : '+$('#'+ui.item.attr('id')).attr('type'));
					 		        console.log('updatePath children : '+$('#'+ui.item.attr('id')).children());
					 		        
					 		   
					 		        
					 		        $('#'+ui.item.attr('id')).css('color','rgb(241, 255, 81)');
					 		        
					 		        var idAfter = '#'+this.id;
					 		        var idBefore = '#'+ui.item.attr('id');
					 		         
					 		        var addData = $('#addList_total').val();
					 		        var moveData = $('#moveList_total').val();
					 		        					 		        
					 		        console.log('_____updatedClass : '+$(idBefore).attr('class'));
					 		        console.log('_____updatedPath : '+$(idBefore).attr('path'));
					 		        console.log('_____updatedId : '+$(idBefore).attr('id'));

					 		     	var updatedPath = $(idBefore).attr('path').substring($(idBefore).attr('path').lastIndexOf('/')+1);
					 		     	console.log('updatedPath '+updatedPath);
					 		     	console.log('updatedPath ____'+$(idBefore).attr('class'));

					 		     	
					 		     	
					 		     	
					 		     	if($(idBefore).attr('class')=='gitfolders' || $(idBefore).attr('class')=='noDesign'){
	
					 		     		console.log('this is a folder for different purpose only');
					 		     		
					 		     			$('#'+ui.item.attr('id')).children().each(function(){
					 		     		  		
					 		     		  		console.log('additional files : '+$(this).attr('id'));
					 		     		  							 		     		  		
					 		     		  		$(this).children().each(function(){
					 		     		  			console.log('addtional files : '+$(this).attr('sha'));
					 		     		  			$(this).children().each(function(){
					 		     		  				
					 		     		  				if($(this).attr('class')=='gitfiles'){
					 		     		  					console.log('realfiles : '+$(this).attr('sha')+' '+$(this).attr('path'));
					 		     		  					
					 		     		  					var buffdata = $(this).attr('path');
					 		     		  					var alteredPath = $(idAfter).attr('path')+$(idBefore).attr('path');
					 		     		  					
					 		     		  					
					 		     		  					
					 		     		  					/*
					 		     		  					 *  under construction
					 		     		  					 * 
					 		     		  					 */
					 		     		  					
					 		     		  					
					 		     		  				    /*
					 							    		 * remove sha duplicates
					 							    		 */	
					 							    			for(var u=0; u<moveData; u++){
					 							    				console.log('remove sha duplicates activated 1111'+$(idBefore).attr('sha'));
	

					 							    				if($(this).attr('sha')==$('#move_data_wrapper_'+u).attr('sha') && $(idBefore).attr('sha')!='undefined'){
					 							    					

					 							    					$('#move_data_wrapper_'+u)
					 							    					.empty().remove();
					 							    					$('#fakeMove_'+u).empty().remove();
					 							    					$('#moveList_total').val(--moveData);
					 							    				}
					 							    				
					 							    			}
					 		     		  										 		     		  					
					 		     		  					
					 		     		  					
					 		     		  					
					 		     		  					console.log('childname fullpath'+buffdata);
					 		     		  					buffdata = buffdata.substring(buffdata.lastIndexOf('/'));
					 		     		  					console.log('children beforefilename : '+$(idBefore).attr('path'));
					 		    						
					 		     		  					console.log('children filename : '+buffdata);
					 		     		  					console.log('childeren altered path : '+alteredPath);
					 		     		  					console.log('childeren sha  : '+$(this).attr('sha'));

					 		    						
					 		     		  					$(this).attr('path', alteredPath+buffdata);
					 		    													 		    										 		    											 		     		  					
					 		     		  			
					 		     		  					
					 		     		  					$('#changeList')
					 		     		  					.append(  //actual data for input 
					 		     		  							$('<div/>')
					 		     		  							.css('display','')
					 		     		  							.attr('id','move_data_wrapper_'+moveData)
					 		     		  							.attr('sha',$(this).attr('sha'))// used for removing 
					 		     		  							.append(
					 		     		  									$('<input/>')  //used for updating
					 		     		  									.attr('name','list3['+moveData+'].sha')
					 		     		  									.val($(this).attr('sha'))
					 		     		  							).append(
					 		     		  									$('<input/>')
					 		     		  									.attr('name','list3['+moveData+'].path')
					 		     		  									.val($(this).attr('path'))
					 		     		  							).append(
					 		     		  									$('<input/>')
					 		     		  									.attr('name','list3['+moveData+'].pathBefore')
					 		     		  									.val($(idBefore).attr('path')+buffdata)
					 		     		  							).append(
					 		     		  									$('<input/>')
					 		     		  									.attr('name','list3['+moveData+'].newcontent')
					 		     		  									.val('false')
					 		     		  							)
					 		     		  					).append(   //fake data for displaying 
					 		     		  							$('<div/>')
					 		     		  							.attr('class','updateList')
					 		     		  							.attr('id','fakeMove_'+moveData)
					 		     		  							.css('color','rgb(68, 68, 68)')
					 		     		  							.append('<img src="../img/content/updatelist.png" width="25px" height="25px">')
					 		     		  							.append('자료 이동 '+$(idBefore).attr('path')+' >>ff>> '+alteredPath+buffdata)
					 		     		  					);	
					 		    						
					 		    						
					 		    						
					 		    						
					 		   		    			if($(idBefore).attr('newFile')=='true'){
									    				$('#move_data_wrapper_'+moveData)
									    				.attr('newFile','true')
									    				.append(
									    						$('<textarea/>')
									    						.attr('name','list3['+moveData+'].newcontent')
									    						.text($('#after').val())
									    				       );
									    				
									    				       
									    				$(idBefore).attr('newFile','enabled');
									    			}
									        			
					 		   		    			

					
							 		     			
											    	$('#moveList_total').val(++moveData);		
						
					 		     		  										 		     		  					
					 		     		  				}
					 		     		  			
					 		     		  			});					 		     		  			
					 		     		  		});
						 		     	    });
						 		     	    
					 		     	  
					 		     		
					 		     	    $('#'+ui.item.attr('id')).children().each(function(){
					 		     	    	var moveData = parseInt($('#moveList_total').val());
					 		        		
							 		    	   console.log('children each : '+$(this).attr('id'));
							 		    	   
							 		    	   
							 		    	   
							 		    	   
							 		    	   if($(this).attr('class')=='ui-sortable'){
							 		    		   $(this).children().each(
							 		    			function(){
							 		    				console.log('children each each '+$(this).attr('id'));
							 		    				
							 		    		
							 		    				
							 		    				if($(this).attr('class')=='gitfiles'){
							 		    					
							 		    						var buffdata = $(this).attr('path');
							 		    						var alteredPath = $(idAfter).attr('path')+$(idBefore).attr('path');


							 		    						console.log('childname fullpath'+buffdata);
							 		    						buffdata = buffdata.substring(buffdata.lastIndexOf('/'));
							 		    						console.log('children beforefilename : '+$(idBefore).attr('path'));
							 		    						
							 		    						console.log('children filename : '+buffdata);
							 		    						console.log('childeren altered path : '+alteredPath);
							 		    						console.log('childeren sha  : '+$(this).attr('sha'));

							 		    						
							 		    						$(this).attr('path', alteredPath+buffdata);
							 		    													 		    				
							 		    						
							 		    					   
													 		      if($(this).attr('sha')=='undefined'){
													 		    	  
													 		    		for(var u=0; u<moveData; u++){
													 		    			console.log(buffdata+'--------'+$('#move_data_wrapper_'+u).attr('path'));
														    				if(buffdata==$('#move_data_wrapper_'+u).attr('path')){
														    					console.log('redirect data - input[name="list3['+u+'].path"   '+alteredPath+buffdata);
														    					
														    					$('input[name="list3['+u+'].path"').val(alteredPath+buffdata);
														    				}							    				
														    			}
													 		       }else{
							 		    													 		    						
							 		    						
							 		    						$('#changeList')
														    	.append(  //actual data for input 
																    	$('<div/>')
																    	.css('display','')
																    	.attr('id','move_data_wrapper_'+moveData)
																    	.attr('sha',$(this).attr('sha'))// used for removing 
																    	.append(
																    			$('<input/>')  //used for updating
																    			.attr('name','list3['+moveData+'].sha')
																    			.val($(this).attr('sha'))
																    	).append(
																    			$('<input/>')
																    			.attr('name','list3['+moveData+'].path')
																    			.val($(this).attr('path'))
																    	).append(
																    			$('<input/>')
																    			.attr('name','list3['+moveData+'].pathBefore')
																    			.val($(idBefore).attr('path')+buffdata)
																    	).append(
																    			$('<input/>')
																    			.attr('name','list3['+moveData+'].newcontent')
																    			.val('false')
																    	)
														    	).append(   //fake data for displaying 
														    			$('<div/>')
														    			.attr('class','updateList')
														    			.attr('id','fakeMove_'+moveData)
														    			.css('color','rgb(68, 68, 68)')
														    			.append('<img src="../img/content/updatelist.png" width="25px" height="25px">')
														    			.append('자료 이동 '+$(idBefore).attr('path')+buffdata+' >>kk>> '+alteredPath+buffdata)
														    	);	
							 		    						
							 		    						
							 		    						
							 		    						
							 		   		    			if($(idBefore).attr('newFile')=='true'){
											    				$('#move_data_wrapper_'+moveData)
											    				.attr('newFile','true')
											    				.append(
											    						$('<textarea/>')
											    						.attr('name','list3['+moveData+'].newcontent')
											    						.text($('#after').val())
											    				       );
											    				
											    				       
											    				$(idBefore).attr('newFile','enabled');
											    			}
											        			
									 		     			
													    	$('#moveList_total').val(++moveData);		
								
							 		    				}
							 		    				}
							 		    				
							 		    				/*
							 		    				 * inner circle 
							 		    				 */
							 		    				
					
							 		    				
							 		    				
							 		    			  }	   
							 		    		   );
							 		    	   }					 		    	   
							 		       });
					 		     		
					 		     	    
					 		     		
					 		     		
					 		     	
					 		     		
					 		     	}else if($(idBefore).attr('class')=='gitfiles'){
					 		     	     var idAfter = '#'+this.id;
							 		        var idBefore = '#'+ui.item.attr('id');
					 		     		
					 		     		/*
							    		 * remove sha duplicates
							    		 */	

							 		       var idBeforeSha = $(idBefore).attr('sha');
							    			for(var u=0; u<moveData; u++){
							    				
							    				console.log('remove sha duplicates activated2222   '+$(idBefore).attr('sha')+'  '+idBeforeSha );

							    				
							    				if(idBeforeSha!='undefined'){

							    				if($(idBefore).attr('sha')==$('#move_data_wrapper_'+u).attr('sha')){
							    					

							    					$('#move_data_wrapper_'+u)
							    					.empty().remove();
							    					$('#fakeMove_'+u).empty().remove();
							    					$('#moveList_total').val(--moveData);
							    				}
							    				}
							    			}
							 		       
							    			console.log('testing newFIles : '+$(idBefore).attr('newFile'));
							
							    			console.log('Before : ');	   			
							    			
							    			
							    			$('#changeList')
									    	.append(  //actual data for input 
											    	$('<div/>')
											    	.css('display','none')
											    	.attr('id','move_data_wrapper_'+moveData)
											    	.attr('sha',$(idBefore).attr('sha'))// used for removing 
											    	.append(
											    			$('<input/>')  //used for updating
											    			.attr('name','list3['+moveData+'].sha')
											    			.val($(idBefore).attr('sha'))
											    	).append(
											    			$('<input/>')
											    			.attr('name','list3['+moveData+'].path')
											    			.val($(idAfter).attr('path')+'/'+updatedPath)
											    	).append(
											    			$('<input/>')
											    			.attr('name','list3['+moveData+'].pathBefore')
											    			.val($(idBefore).attr('path'))
											    	).append(
											    			$('<input/>')
											    			.attr('name','list3['+moveData+'].newcontent')
											    			.val('false')
											    	)
									    	).append(   //fake data for displaying 
									    			$('<div/>')
									    			.attr('class','updateList')
									    			.attr('id','fakeMove_'+moveData)
									    			.css('color','rgb(58, 58, 58)')
									    			.append('<img src="../img/content/updatelist.png" width="25px" height="25px">')
									    			.append('자료 이동 '+$(idBefore).attr('path')+' >>>> '+$(idAfter).attr('path')+'/'+updatedPath)
									    	);	
						        			
							    			
							    			if($(idBefore).attr('newFile')=='true'){
							    				$('#move_data_wrapper_'+moveData)
							    				.attr('newFile','true')
							    				.append(
							    						$('<textarea/>')
							    						.attr('name','list3['+moveData+'].newcontent')
							    						.text($('#after').val())
							    				       );
							    				
							    				       
							    				$(idBefore).attr('newFile','enabled');
							    			}
							    			
							    			
									    	$('#moveList_total').val(++moveData);	
							    			
					 		     		
					 		     		
					 		     	}		     						    					    								    			
					 			}
					 		});
					 		
					 	}
					 		
					 	/*
					 	 * insert contentno  
					 	 */
					 
					 	$('#contentno').val(contentno);	
					 	if(file[0]!='logged'){
					 		$('#groupno').val(file[0]);
					 	}
					    
					 	/*
					 	 * connnecting all possible files with sortable
					 	 */
					    
					 	var connectData='';
					 	var folderNumRenew = parseInt(folderNum);
					 	folderNumRenew+=9;
					 	for(var t=0; t<=folderNumRenew; t++){
					 		
					 		console.log('connectData : '+folderNumRenew+' : '+t);
					 		if(t==folderNumRenew){
						 		connectData+='#folder_'+t+'_, #folder_add';
					 		}else{
						 		connectData+='#folder_'+t+'_, ';
					 		}
					 	}				
					 	
					     $(connectData).sortable({
					            connectWith: connectData			 
					     });
					     
					     console.log('test : '+connectData);
					     
						 /*
						  * connnecting all possible files with sortable End
						  */
						    
					     
					     
					     /*
						  * action Folders End
						  */	  
					     
					     $('#submitUpdate').click(function(){
					    	 $('#changeList')
					    	 .attr('action','/Bit_Place/ajax/groups/content_update.do')
					    	 .attr('method','POST')
					    	 .submit();					    	 
					    	 
					    		$('#black_screen')
								.css('opacity','0.6')
								.css('display','')
								.css('height','2000px');
					   
					    	 
					     });
					     
					     
					     /*
				 		     * removing duplicates 
				 		     */
				 			var totalFilez = $('#fileNum').val();	 			
				 			for(var z=0; z<totalFilez; z++){
				 				
				 				for(var y=z+1; y<totalFilez; y++){
					 				if($('#folder_sub_'+z).attr('sha')==$('#folder_sub_'+y).attr('sha')){
					 					$('#folder_sub_'+y).remove();
					 				}
				 				}
				 			}
					     
				 			totalFilez = $('#folderUniqueNum').val();	 			
				 			for(var z=0; z<totalFilez; z++){
				 				
				 				for(var y=z+1; y<totalFilez; y++){
					 				if($('#folderUniqueNum_'+z).attr('sha')==$('#folderUniqueNum_'+y).attr('sha')){
					 					$('#folderUniqueNum_'+y).remove();
					 				}
				 				}
				 			}
					     					     
					     }
				});						
		});
	}
	
	
	
	function listingFiles(div, folderNum, par, color){
	 	
	 	for(var i=0; i<folderNum; i++){
	 		
	 	if($('#foldername_'+i).attr('par')==par){
	 		
			var folderHtml = $('#foldername_'+i).attr('path');
			var folderLastIndexOf = folderHtml.lastIndexOf('/');
	 		
	 		var folderUniqueNum = $('#folderUniqueNum').val();					 							 		

	 		$('<ul/>')
	 		.attr('id','folder_'+i)
	 		.css('margin-bottom','15px')
	 		.css('margin-left','20px')

	 		.append($('<li/>')
	 		 		 .attr('class','gitfolders')
	 		 		 .attr('id','folderUniqueNum_'+folderUniqueNum)
	 		 		 .attr('path',$('#foldername_'+i).attr('path'))
	 		 		 .attr('sha',$('#foldername_'+i).attr('sha'))
	 				 .append(folderHtml.substring(folderLastIndexOf+1))
	 				 .click(function(){
	 					openDetail($(this).attr('sha'), $(this).attr('path'), $(this).attr('id'),'folder');	 		 				 }) 
	 			    )
	 		.appendTo(div);		
	 		
	 		$(div).attr('path',$('#foldername_'+i).attr('path'));
	 		
	 		$('#folderUniqueNum').val(++folderUniqueNum);

	 		var fileNum = $($('#foldername_'+i).attr('total')).val();					 							 		
	 	    
	 		/*
	 		 *  total number of files in each folder
	 		 */	
	 		$('#folder_'+i)
	 		.append(
		 			   $('<ul/>')
		 			    .attr('class','folderUniqueNum_'+folderUniqueNum)
		 			    .attr('path',$('#foldername_'+i).attr('path'))
		 			    .attr('sha',$('#foldername_'+i).attr('sha'))
		 			    .attr('id','folder_'+i+'_')
	 		);
	 		
	 		
	 		for(var s=0; s<fileNum; s++){    	
	 			
	 			var RandomIdNum = $('#fileNum').val();
	 			
	 			/*
	 			 * listing files
	 			 */
	 			
	 			if($($('#foldername_'+i).attr('files')+'_'+s).attr('type')=='blob'){
	 				
	 				var fileHtml = $($('#foldername_'+i).attr('files')+'_'+s).text();
	 				var fileLastIndexOf = fileHtml.lastIndexOf('/');
	 				
	 			/*
	 			 * under construction 
	 			 */	
	 				var trimmedText = fileHtml.substring(fileLastIndexOf+1);
	 				var result;
	 				if(trimmedText.length>39){
		 				result = trimmedText.substring(0,22)+'...';
	 				}else{
		 				result = trimmedText;
	 				}
	 				
	 			$('#folder_'+i+'_').append(
	 			   $('<li/>')
	 		 			   .attr('id','folder_sub_'+RandomIdNum)
	 		 			   .attr('class','gitfiles')
	 		 		       .attr('sha',$($('#foldername_'+i).attr('files')+'_'+s).attr('sha'))
	 		 		       .attr('path',$($('#foldername_'+i).attr('files')+'_'+s).attr('path'))
	 		 			   .append(result)
	 			);
	 				 			
	 			/*
	 			 * click on files to see the details 
	 			 */
	 			
	 			$('#folder_sub_'+RandomIdNum).click(function(){
	 				openDetail($(this).attr('sha'), $(this).attr('path'), $(this).attr('id'),'file');	 				
	 			});
	 			
	 			$('#fileNum').val(++RandomIdNum);
	 			
	 			/*
	 			 * click on files to see the details end
	 			 */
	 			
	 			}else{
	 			$('#folder_'+i+'_').append(
				    $('<li/>')
				    .attr('class','noDesign')
				    .attr('id','folder_'+i+'_'+s)
				 );
	 			
	 			     listingFiles('#folder_'+i+'_'+s, folderNum, $('#filename_'+i+'_'+s).attr('par'));
	 			   } 		
	 			}		 		
	 	    }
	 	}
	}
	
	
	/*
	 * open detail with parameter sha 
	 */	
	function openDetail(sha, path, id, type){
		

		
		var heightOfList = $('#output').height();
		
		$('#opendetail_wrapper')
		.css('height',heightOfList-$(window).scrollTop());
		
		
		$(window).scroll(function(){
			
		if($('#output').height()!=500){

			if($(window).scrollTop()<heightOfList-520){			
			$('#opendetail_wrapper')
			.css('top',$(window).scrollTop()+'px')
			.css('margin-top','50px')
			.css('height',heightOfList-$(window).scrollTop());
			}
		}
			//output =1220
			//675+594 = 1269
			console.log($(window).scrollTop()+'px');
		})
		
		/*
		 * under construction 
		 */		
		
		if(type=='file'){
		$.ajax({
			type:'GET',
			url : '/Bit_Place/ajax/groups/content_commitinfo_contents.do',
			data : 'sha='+sha,
			async : true,
			contentType:'application/x-www-form-urlencoded;charset=UTF-8',
			success:function(response,status,request){
				
				$('#opendetail_contents')
				.empty()
				.append(response);

				
				 //	$('body').data('afterData',$('#editor').text());					
				//	var textz = $('body').data('originalData');


			     //	console.log(textz.contains('import'));
			  	

					
				/*
				 * change the height based on the height of the file icons
				 */			    
			    
			    $('#opendetail_buttonGroup')
			    .empty()
			       .append(
			    		$('<span/>')
			    		.attr('id','download_btn')
			    		.attr('sha',sha)
			    		.attr('path',path)
			    		.click(function(){
			    			$.ajax({
			    				type:'GET',
			    				url : '/Bit_Place/ajax/groups/download_Content.do',
			    				data : 'sha='+$(this).attr('sha')+
			    				       '&git_id='+$('#git_id').val()+
			    				       '&git_pwd='+$('#git_pwd').val()+
			    				       '&git_repository='+$('#git_repo').val()+
			    				       '&path='+$(this).attr('path')
			    				,
			    				async : true,
			    				contentType:'application/x-www-form-urlencoded;charset=UTF-8',
			    				success:function(response,status,request){
			    						 window.location.href = response;
			    				}
			    			})
			    		})
			    ).append(
			    		$('<span/>')
			    		.attr('id','update_btn')			    		
			    		.attr('sha',sha)
			    		.attr('path',path)
			    		.click(function(){
			    						    						    			
			    			/*
			    			 * remove the same sha 
			    			 */
			    			$('#changedDataChecker').css('display','none');
			    			
			    			var updateData = $('#changeList_total').val();
			    			//	function removeLists(totalNumId, data_wrapper, fakeId){
			    			// removeLists('#changeList_total', '#update_data_wrapper_', '#fakeUpdate_');			    			
			    			
			    			
			    			for(var u=0; u<updateData; u++){
			    				if($(this).attr('sha')==$('#update_data_wrapper_'+u).attr('sha')){
			    					$('#update_data_wrapper_'+u)
			    					.empty().remove();
			    					$('#fakeUpdate_'+u).empty().remove();
			    					$('#changeList_total').val(--updateData);
			    				}
			    			}
			    			
			    			/*
			    			 * remove the same sha end 
			    			 */
			    			
					    	$('#changeList')
					    	.append(  //actual data for input 
							    	$('<div/>')
							    	.css('display','none')
							    	.attr('id','update_data_wrapper_'+updateData)
							    	.attr('sha',$(this).attr('sha'))// used for removing 
							    	.append(
							    			$('<textarea/>')  //used for updating 
							    			.attr('name','list['+updateData+'].update_data')
							    			.val($('#after').val())
							    	).append(
							    			$('<input/>')  //used for updating
							    			.attr('name','list['+updateData+'].sha')
							    			.val($(this).attr('sha'))
							    	).append(
							    			$('<input/>')
							    			.attr('name','list['+updateData+'].path')
							    			.val($(this).attr('path'))
							    	)
					    	).append(   //fake data for displaying 
					    			$('<div/>')
					    			.attr('class','updateList')
					    			.attr('id','fakeUpdate_'+updateData)
					    			.css('color','rgb(78, 78, 78)')
							    	.append('<img src="../img/content/updatelist.png" width="25px" height="25px">')
					    			.append('내용 수정 '+$(this).attr('path'))
					    	);
					    	
					    	$('#changeList_total').val(++updateData);					    	
			    		})
			    )
			    .append(
			    		$('<span/>')
			    		.attr('id','delete_btn')	
			    		.attr('sha',sha)
			    		.attr('path',path)
			    		.click(function(){
			    			
			    			    var updateData = $('#changeList_total').val();
			    			    var deleteTotal = $('#deleteList_total').val();
			    			    var changeUpdateListTotal = $('#changeList_total').val();
			    			    			    			    
			    			    /*
			    			     * remove prev update 
			    			     */
			    			   
			    			    for(var ct=0; ct<changeUpdateListTotal; ct++){
			    			    	
			    			    	if($('#update_data_wrapper_'+ct).attr('sha')==$(this).attr('sha')){
				    			    	$('#update_data_wrapper_'+ct).empty().remove();
				    			    	$('#fakeUpdate_'+ct).empty().remove();
				    					$('#changeList_total').val(--updateData);				    					
			    			    	}
			    			    }
			    			    
			    			    /*
			    			     * remove prev delete
			    			     */
			    			    
			    			  
			    			    for(var ct=0; ct<deleteTotal; ct++){
			    			    	if($('#delete_data_wrapper_'+ct).attr('sha')==$(this).attr('sha')){
			    			    		$('#delete_data_wrapper_'+ct).empty().remove();
			    			    		$('#fakeDelete_'+ct).empty().remove();
			    			    		$('#deleteList_total').val(--deleteTotal);			    
			    			    	}
			    			    }
			    			    
			    			    
			    			    /*
			    			     * remove from list 
			    			     */
			    			    $('#'+id).empty().remove();
			    			    /*
			    			     * remove from list end 
			    			     */
			    			    
			    			    
			    				$('#changeList')
			    				.append(
			    					$('<div/>')
			    					.css('display','none')
							    	.attr('id','delete_data_wrapper_'+deleteTotal)
							    	.attr('sha',$(this).attr('sha'))// used for removing 
							    	.append(
			    						$('<input/>')
			    						.attr('name','list2['+deleteTotal+'].sha')
			    						.val($(this).attr('sha'))
			    				     ).append(
			    						$('<input/>')
			    						.attr('name','list2['+deleteTotal+'].path')
			    						.val(path)	
			    				     ))
			    				     .append(   //fake data for displaying 
						    			$('<div/>')
						    			.attr('class','updateList')
						    			.attr('id','fakeDelete_'+deleteTotal)
						    			.css('color','rgb(255, 255, 255)')
							    		.append('<img src="../img/content/deletelist.png" width="25px" height="25px">')
						    			.append('삭제 내용 '+$(this).attr('path'))
			    				     );
			    				$('#deleteList_total').val(++deleteTotal);
			    		})
			    	);			    
			   	}			
			});
		}else if(type=='folder'){
			  $('#opendetail_buttonGroup')
			    .empty()
			       .append(
			    		$('<button/>')
			    		.attr('class','btn btn-success')
			    		.text('다운로드')
			    		.attr('sha',sha)
			    		.attr('path',path)
			    		.click(function(){
				    		 alert(sha);	
			    		
			    		})
			       ).append(
				    	$('<button/>')
				    	.attr('class','btn btn-danger')
				    	.text('삭제')
				    	.attr('sha',sha)
				    	.attr('path',path)
				    	.click(function(){
				    		 
				    		    var updateData = $('#changeList_total').val();
			    			    var deleteTotal = $('#deleteList_total').val();
			    			    var changeUpdateListTotal = $('#changeList_total').val();
			    			    			    			    
			    			    /*
			    			     * remove prev update 
			    			     */
			    			   
			    			    for(var ct=0; ct<changeUpdateListTotal; ct++){
			    			    	
			    			    	if($('#update_data_wrapper_'+ct).attr('sha')==$(this).attr('sha')){
				    			    	$('#update_data_wrapper_'+ct).empty().remove();
				    			    	$('#fakeUpdate_'+ct).empty().remove();
				    					$('#changeList_total').val(--updateData);				    					
			    			    	}
			    			    }
			    			    
			    			    
			    			    /*
			    			     * remove prev delete
			    			     */
			    			    
			    			    for(var ct=0; ct<deleteTotal; ct++){
			    			    	if($('#delete_data_wrapper_'+ct).attr('sha')==$(this).attr('sha')){
			    			    		$('#delete_data_wrapper_'+ct).empty().remove();
			    			    		$('#fakeDelete_'+ct).empty().remove();
			    			    		$('#deleteList_total').val(--deleteTotal);			    
			    			    	}
			    			    }
			    			    
			    			    
			    			    /*
			    			     * remove from list 
			    			     */

			    			    			    			    
			    			    var testParent = $('#'+id).parent();
			    			    
			    			    var lists = testParent.children();
			    			    
			    			    console.log(testParent[0]+' '+testParent.length);
			    			    
			    			    
			    			    $('#'+id).parent().empty().remove();
 
			    			    
			    			    
			    			    //$('#'+id).empty().remove();
			    			    
			    			    /*
			    			     * remove from list end 
			    			     */
			    			    
			    			    
			    				$('#changeList')
			    				.append(
			    					$('<div/>')
			    					.css('display','none')
							    	.attr('id','delete_data_wrapper_'+deleteTotal)
							    	.attr('sha',$(this).attr('sha'))// used for removing 
							    	.append(
			    						$('<input/>')
			    						.attr('name','list2['+deleteTotal+'].sha')
			    						.val($(this).attr('sha'))
			    				     ).append(
			    						$('<input/>')
			    						.attr('name','list2['+deleteTotal+'].path')
			    						.val(path)	
			    				     ))
			    				     .append(   //fake data for displaying 
						    			$('<div/>')
						    			.attr('class','updateList')
						    			.attr('id','fakeDelete_'+deleteTotal)
						    			.append('<img src="../img/content/deletelist.png">')
						    			.append('삭제 내용 '+$(this).attr('path'))
			    				     );
			    				$('#deleteList_total').val(++deleteTotal);
			    
				    	 })			       
				    );
		}	
		
	}
	
	

	
	
	$('#subNextBtn').click(function(){
	    if(file[0]=='logged'){
	    	$.ajax({
				type:'GET',
				url : '/Bit_Place/main/frame/subPaging.do?logged=true&nextPage='+$('#nextPage').val(),
				async : true,
				contentType:'application/x-www-form-urlencoded;charset=UTF-8',
				success:function(response,status,request){
					$('#sub_data')
					.empty()
					.append(response);	
					
					$('#prevPage').val($('.subbtn_0').attr('contentno'));
					$('#nextPage').val($('.subbtn_4').attr('contentno'));
					
					if($('#nextPage').val()==null||$('#nextPage').val()==''){
						$('.arrow_bottom_wrapper').css('display','none');
					}else{
						$('.arrow_bottom_wrapper').css('display','');
					}
					
					}
			  });	 
	    }else if(sub=='groups'){
	    	$.ajax({
				type:'GET',
				url : '/Bit_Place/main/frame/subPaging.do?groupNo='+file[0]+'&nextPage='+$('#nextPage').val(),
				async : true,
				contentType:'application/x-www-form-urlencoded;charset=UTF-8',
				success:function(response,status,request){
					$('#sub_data')
					.empty()
					.append(response);	
					
					$('#prevPage').val($('.subbtn_0').attr('contentno'));
					$('#nextPage').val($('.subbtn_4').attr('contentno'));
					
					if($('#nextPage').val()==null||$('#nextPage').val()==''){
						$('.arrow_bottom_wrapper').css('display','none');
					}else{
						$('.arrow_bottom_wrapper').css('display','');
					}
					
					}
			  });	 
	    }
	});
	

	
	$('#subPrevBtn').click(function(){
	    if(file[0]=='logged'){
	    	$.ajax({
				type:'GET',
				url : '/Bit_Place/main/frame/prevsubPaging.do?logged=true&prevPage='+$('#prevPage').val(),
				async : true,
				contentType:'application/x-www-form-urlencoded;charset=UTF-8',
				success:function(response,status,request){
					$('#sub_data')
					.empty()
					.append(response);	
					
					$('#prevPage').val($('.subbtn_0').attr('contentno'));
					$('#nextPage').val($('.subbtn_4').attr('contentno'));
					
					if($('#prevPage').val()==$('#startPage').val()){
						$('.arrow_top_wrapper').css('display','none');
					}else{
						$('.arrow_top_wrapper').css('display','');	
					}
					
					}
			  });	 
	    }else if(sub=='groups'){	
	    	$.ajax({
				type:'GET',
				url : '/Bit_Place/main/frame/prevsubPaging.do?groupNo='+file[0]+'&prevPage='+$('#prevPage').val(),
				async : true,
				contentType:'application/x-www-form-urlencoded;charset=UTF-8',
				success:function(response,status,request){
					$('#sub_data')
					.empty()
					.append(response);				
					
					$('#prevPage').val($('.subbtn_0').attr('contentno'));
					$('#nextPage').val($('.subbtn_4').attr('contentno'));
														
					if($('#prevPage').val()==$('#startPage').val()){
						$('.arrow_top_wrapper').css('display','none');
					}else{
						$('.arrow_top_wrapper').css('display','');	
					}
					
					}
			  });	 
	    
	    
	    }
	});
	
	
		
	$('#postBtn').click(function(){
		
		var value;
		
	    if(file[0]=='logged'){
	    	value = $('#firstGroup').val();	
	    }else if(sub=='groups'){
	    	value = file[0];
	    }

		
		$.ajax({
			type:'GET',
			url : '/Bit_Place/ajax/groups/submitPost.do?groupNo='+value,
			async : true,
			contentType:'application/x-www-form-urlencoded;charset=UTF-8',
			success:function(response,status,request){
				$('#body_output').empty();
				$('#body_output').append(response);	
				}
		});	
	});

	
	var topBtns =['#sub_date_btn','#sub_leader_btn','#sub_follower_btn'];
	
	
	for(var t=0; t<topBtns.length; t++){		
		$(topBtns[t]).stop().click(function(){		
			var id = $(this).attr('id');			
			
			if(file[0]=='logged'){		 	
			$.ajax({
				type:'GET',
				url : '/Bit_Place/main/frame/'+id+'.do',
				data : 'logged=true',
				async : true,
				contentType:'application/x-www-form-urlencoded;charset=UTF-8',
				success:function(response,status,request){
					$('#sub_data').empty().append(response);
				}
			});
			}else{
				$.ajax({
					type:'GET',
					url : '/Bit_Place/main/frame/'+id+'.do',
					data : 'groupno='+file[0],
					async : true,
					contentType:'application/x-www-form-urlencoded;charset=UTF-8',
					success:function(response,status,request){
						$('#sub_data').empty().append(response);	
					}
				});
				
				
			}
			
			$('#'+id).css('background-image','url("../img/top/white_btn.png")');
			for(var y=0; y<topBtns.length; y++){
				if($(this).attr('id')!=$(topBtns[y]).attr('id')){
					var bufid = $(topBtns[y]).attr('id');
					$('#'+bufid).css('background-image','');
				}
			}
		});
	}
	
	
	$('#formGroupInputSmall').keyup(function(){
		
		
	});
	
});