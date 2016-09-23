$(document).ready(function(){
	
	$('#logged_background').css('display','none').css('opacity','0');
	$('#logged_output').css('opacity','0');
	
	$.ajax({
		type:'GET',
		url : '/Bit_Place/ajax/groups/logged_mainPage.do',
		data : 'memno='+$('#memNo').val(),
		async : true,
		contentType:'application/x-www-form-urlencoded;charset=UTF-8',
		success:function(response,status,request){
		
			$('#logged_output').empty().append(response);	
		}
	});
			

	$('#logged_search_btn').stop().click(function(){
		var repositories = $("#logged_searchResults_Ul");
	    Gh3.Repositories.search($('#logged_searchData').val(), {start_page : parseInt($('#startingPage').val())}, function (err, res) {
	      if(err) { throw "outch ..." }

	      console.log(Gh3.Repositories.getAll());
	      
	      var limitNum=10;
	      
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
		    	  	        		  .attr('id','logged_repoName')
		    	  	        		  .append($('<img/>')
		    	  	        				  .attr('src',resUser['avatar_url'])
		    	  	        				  .attr('class','img-circle')
		    	  	        		  		 )
		    	  	        		  )
		    	  	           .append(
		    	  	        		   $('<span/>')
		    	  	        		   .attr('id','logged_repoDesc')
		    	  	        		   .text('이름 : '+repository.name+"  설명 : "+repository.description)
		    	  	        		   )
		    	  	           .append(
		    	  	        		   $('<span/>').text(" 개발자 : "+repository.username)
		    	  	        		  )
		    	  	        	.click(function(){
		    	  	        			  alert(repository.name+" : "+repository.url+" : "+repository.username);
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
	});
	

	recentEvents('#logged_recent_Action');
	
	
	
	
	
	$('#character').click(function(){
		alert('');
	});
	
	
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
	
	
	
	
});