$(document).ready(function(){

	$('#addmoreResults').css('display','none');
	
	/*
	 * click the recent Action 
	 */

	recentEvents('#logged_recent_Action');
	
	$('.logged_display_image')
	.click(function(){
			alert($(this).attr('repo'));
	});
		
	
	
	/*
	 * click the recent Action End 
	 */
	
	
	
	
	$.ajax({
		type:'GET',
		url : '/Bit_Place/ajax/groups/logged_mainPage.do',
		data : 'memno='+$('#memNo').val(),
		async : true,
		contentType:'application/x-www-form-urlencoded;charset=UTF-8',
		success:function(response,status,request){
		
			$('#logged_output').empty().append(response);	
						
			$('.logged_display_image').click(function(){
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
	});
			

	$('#logged_searchData').keyup(function(e){
		if(e.keyCode==8){
			$('#logged_searchResults_Ul').empty();
			$('#addmoreResults').css('display','none');
		}
	});
	
	$('#logged_search_btn').stop().click(function(){
		$('#addmoreResults').css('display','');
		
	      var limitNum=10;

		if($('#searchType').val()=='repo'){
		var repositories = $("#logged_searchResults_Ul");
	    Gh3.Repositories.search($('#logged_searchData').val(), {start_page : parseInt($('#startingPage').val())}, function (err, res) {
	      if(err) { throw "outch ..." }

	      console.log(Gh3.Repositories.getAll());
	      
	      
	      Gh3.Repositories.each(function (repository) {
	    	  limitNum--;
	        console.log(repository.name, repository.username, repository.description, repository)
	        		console.log('limitNum : '+limitNum);
	        		/*
	        		 * finding the user
	        		 */	        		
	        		
	        		if(limitNum>0){
	        		 var users = new Gh3.User(repository.username)
	        	        ,	userInfos = $("#user");
	        
	        
	        		users.fetch(function (err, resUser){
	        		if(err) {
	        			throw "outch ..."
	        		}else{	
		        		console.log("user_data : "+'avatar_url'+" : "+resUser['avatar_url']);
		        		console.log("user_data : "+'followers'+" : "+resUser['followers']);
		        		console.log("user_data : "+'public_repos'+" : "+resUser['public_repos']);
		        		
		    	        repositories.append(
		    	  	          $('<div/>')
		    	  	          .attr('class','logged_githubRepoBox')
		    	  	          .append($('<span/>')
		    	  	        		  .attr('class','logged_repoAvatar')
		    	  	        		  .append($('<img/>')
		    	  	        				  .attr('src',resUser['avatar_url'])
		    	  	        				  .attr('class','img-circle')
		    	  	        		  		 )
		    	  	        		  )
		    	  	           .append(
		    	  	        		   $('<span/>')
		    	  	        		   .attr('class','logged_repoTitle')
		    	  	        		   .text('제목   |   '+repository.name)
		    	  	        		   )
		    	  	            .append(
		    	  	        		   $('<span/>')
		    	  	        		   .attr('class','logged_repoName')
		    	  	        		   .html('개발자  |   '+repository.username+'    <span>( follower | '+resUser['followers']+'   Repositories | '+resUser['public_repos']+' )</span>')
		    	  	        		   )
		    	  	           .append(
		    	  	        		   $('<span/>')
		    	  	        		   .attr('class','logged_repoDesc')
		    	  	        		   .text(repository.description)
		    	  	        		  )
		    	  	        	.click(function(){
		    	  	        			window.open(repository.url);
		    	  	        		 })
		    	  	         );
	        			 }
	        		});      				

	      	      }else{ 
	      	    	  
	      	    	  return false;
	      	      }
	        		
	        		/*
	        		 * finding the User End 
	        		 */
	      });
	    });		
		}else if($('#searchType').val()=='user'){
			//alert('df');
			
			Gh3.Users.search($('#logged_searchData').val(), {start_page : 1}, function (err, response) {
			    if(err) {
			        throw "outch ..."
			    }
			    response.each(function (user) {
	        		if(limitNum>0){
			    	  limitNum--;
			        console.log(user.name, user.login, user.repos, user)
			        
			        var users = new Gh3.User(user.username)
        	        ,	userInfos = $("#user");
        
        
        		users.fetch(function (err, resUser){
        		if(err) {
        			throw "outch ..."
        		}else{	
	        		console.log("user_data : "+'avatar_url'+" : "+resUser['avatar_url']);
	        		console.log("user_data : "+'followers'+" : "+resUser['followers']);
	        		console.log("user_data : "+'public_repos'+" : "+resUser['public_repos']);
	        		
	        		/*
	        		 * users output 
	        		 */
	        		
	    	        $('#logged_searchResults_Ul').append(
	    	  	          $('<div/>')
	    	  	          .attr('class','logged_githubRepoBox')
	    	  	          .append($('<span/>')
	    	  	        		  .attr('class','logged_repoAvatar')
	    	  	        		  .append($('<img/>')
	    	  	        				  .attr('src',resUser['avatar_url'])
	    	  	        				  .attr('class','img-circle')
	    	  	        		  		 )
	    	  	        		  )
	    	  	           .append(
	    	  	        		   $('<span/>')
	    	  	        		   .attr('class','logged_repoTitle')
	    	  	        		   .html('이름   |   '+user.name+'   <span>'+user.created+'</span>')
	    	  	        		   )
	    	  	            .append(
	    	  	        		   $('<span/>')
	    	  	        		   .attr('class','logged_repoName')
	    	  	        		   .html(user.language+' 개발자  |    <span>( follower | '+resUser['followers']+'   Repositories | '+resUser['public_repos']+' )</span>')
	    	  	        		   )
	    	  	           .append(
	    	  	        		   $('<span/>')
	    	  	        		   .attr('class','logged_repoDesc')
	    	  	        		   .text(user.location)
	    	  	        		  )
	    	  	        	.click(function(){
	    	  	        			window.open('http://github.com/'+user.login);
	    	  	        		 })
	    	  	         );
        			 }
        		});      	
			        
        		/*
        		 * users output end
        		 */
			        
			        
			        
	        		}else{
	        			return false;
	        		}
			    });
			});
		
						
			
		}
	    
	});
	
	

	$('#addmoreResults').click(function(){
		
		var addingPageNum = parseInt($('#startingPage').val());		
		alert(addingPageNum);
		$('#startingPage').val(++addingPageNum);
		$('#logged_search_btn').trigger('click');
		
	});
	
	
	
	
	$('#character').click(function(){
		alert('');
	});
	
	$('#logged_background').css('display','none');
	$('#logged_output').css('opacity','0');

	
	function recentEvents(btnId){

		$(btnId)
		.hover(function(){
			$('#logged_output').css('opacity','1');
			$(this).stop().animate({opacity:0},400).css('display','none');
			
			$('#menu').hover(function(){
				$('#logged_background')
				.css('display','')
				.stop()
				.animate({opacity:1},400);
				
				$('.logged_display_image')
				.css('opacity','1');
			},function(){
				$('#logged_background').stop().animate({opacity:0},400)
				$('.logged_display_image')
				.css('opacity','0.4');
				
				$('#logged_output').css('opacity','0');
				
				$('#logged_recent_Action').stop().animate({opacity:1},400).css('display','');
								
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
	
	
	
});