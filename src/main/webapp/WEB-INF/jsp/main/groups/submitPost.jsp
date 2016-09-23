<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- https://github.com/krams915/spring-fileupload-tutorial/blob/master/spring-fileupload-tutorial/src/main/webapp/WEB-INF/jsp/form.jsp -->
<c:url value="/upload/upload.do" var="uploadUrl"/>
<c:url value="/upload/message.do" var="messageUploadUrl"/>
<c:url value="/upload/file.do" var="fileUploadUrl"/>
<script type='text/javascript' src='<c:url value="../js/upload/jquery-ui-custom.min.js"/>'></script>
<script type='text/javascript' src='<c:url value="../js/upload/util.js"/>'></script>
<script type='text/javascript' src='<c:url value="../js/upload/jquery-ui-widget.js"/>'></script>
<script type='text/javascript' src='<c:url value="../js/upload/jquery-iframe.js"/>'></script>
<script type='text/javascript' src='<c:url value="../js/upload/jquery-fileupload.js"/>'></script>

<%-- github api --%>
<script src="../js/content/underScore.js"></script>
<script src="../js/content/gh3.js"></script>

<link rel="stylesheet" href="../css/upload.css">

<script type='text/javascript'>
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
             //alert('it is on 1');
	   var num = Math.floor(Math.random()*iconRandom.length);
       	   //alert('it is on 1 : '+num);
       	   //alert('it is on 1 : '+iconRandom[num]);
              
		$('#loading_image')
		.append(
		 $('<img/>')
		 .attr('src',iconRandom[num])
		 );			
		$('#loading_text')
		.append(textRandom[num]
		);
	   }else if(activate=='off'){
                    //alert('it is on 2');

		$('#loading_image').empty();
		$('#loading_text').empty();
	   }	
}

 	$('#returntoSearch').css('display','none');
          $('.searchRepo_wrapper').css('display','none');
	var numbers=0;	
	//where the actual upload begins
	$('#createFolder').click(function(){
		$('#folder_output').append(formInput(numbers));
		init(numbers);
		numbers++;
	});
	
	function formInput(numbers){
		return "<div class='fileuploadFormWrapper'>"+
		"<div class='fileupload_icons'>"+
		"<img src='../img/content/foldericon.png'></div>"+
		"<div class='fileupload_area'><form id='uploadForm"+numbers+"'>"+
		"<fieldset><div class='col-xs-7'><input id='folder"+numbers+"' type='text' class='form-control' placeholder='디렉토리 이름 입력'></div>"+
		"<div class='attach_file_atag'>"+
		"<a href='#' id='attach"+numbers+"'>Add a file</a>"+
		"<input id='upload"+numbers+"' type='file' name='file' data-url='${fileUploadUrl}' multiple style='opacity: 0; filter:alpha(opacity: 0);''></div>"+
		"<div class='tempfileupload'><span id='filename"+numbers+"'></span></div>"+
		"<div class='invisible_buttons'><input type='button' value='Reset' id='reset"+numbers+"' />"+
		"<input type='submit' value='Upload' id='submit"+numbers+"'/>"+
		"</div></fieldset></form></div></div><br/><br/>";
	}
	
	function init(numbers) {
		$('body').data('filelist'+numbers, new Array());	
		
		$('#uploadForm'+numbers).submit(function(event) {
			event.preventDefault();	
			//where the file is uploaded to the servlet			
			
			// alert($('#folder'+numbers).val());
			
		$.postJSON('${messageUploadUrl}', {
			   folder: $('#folder'+numbers).val(),
			   filename: getFilelist(numbers)
			   },
			   function(result) {
			   if (result.success == true) {
			   } else {}
			});
		});
		
	$('#reset'+numbers).click(function() {
			clearForm();
		});
		
	$('#upload'+numbers).fileupload({
	        	dataType: 'json',
	        	done: function (e, data) {
	            $.each(data.result, function (index, file) {
	                $('body').data('filelist'+numbers).push(file);
	                $('#filename'+numbers).append(formatFileDisplay(file));
	                $('#attach'+numbers).empty().append('Add another file');
	            });
	        }
	    });
		
	$("#attach"+numbers).click(function (){
		 $("#upload"+numbers).trigger('click');
	});
		
	}
	
	function formatFileDisplay(file) {
		var size = '<span>'+(file.size/1000).toFixed(2)+'K</span>';
		return '<div class="fileline"><span class="fileiconz"><img src="../img/content/fileicon.png"></span>'+file.name + ' ('+ size +')</div><br/>';
	}

	
	function getFilelist(numbers) {
		var files = $('body').data('filelist'+numbers);
		var filenames = '';
		for (var i=0; i<files.length; i<i++) {
			var suffix = (i==files.length-1) ? '' : ',';
			filenames += files[i].name + suffix;
		}
		return filenames;
	}
	
	
	function clearForm() {
		$('#filename'+numbers).empty();
		$('#attach'+numbers).empty().append('Add a file');
		$('body').data('filelist'+numbers, new Array());
	}		
	

	
	
	//upload files in the servlet to github 
	$('#uploadGithub').click(function(){
		var frm = document.frm;
		var submitCheck = true;
		
		for(var i=0; i<frm.length; i++){
			if(frm[i].value==''){
				var buffrm = frm[i].id;
				$('#'+buffrm).css({'border':'1px solid red'});
				$('#'+buffrm).css({'background-color':'#FFC7C7'});
				frm[i].placeholder = frm[i].id+'를 입력해주세요';
				submitCheck = false;
			}	
		}
		
		if(submitCheck==true){
		var title = $('#title_content').val();
		var content = $('#content').val();
		var repository = $('#git_repo').val();
		
		
		loadingGitFiles('on');		
		 
		$('#black_screen').css('opacity','0.5').css('display','');
		
	    	$('#loading_icon')
	    	.css('opacity','1')
		.css('display','');
		
		/*
		 * arranging files in the servlet 
		 */
		
		for(var i=0; i<numbers; i++){
			document.getElementById('submit'+i).click();
		}
		
		
		
		/*
		 * arranging files in the servlet end 
		 */
		
		 
		$.ajax({
		    type:"GET"
		    	,async : true
		          , url : "/Bit_Place/upload/upload.do"
		          , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
		          , data : "titleno="+$('#titleno').val()+
		                   "&memno="+$('#memno').val()+
		                   "&content_title="+$('#content_title').val()+
		                   "&opento="+$('#opento').val()+
		                   "&content="+$('#content').val()+
		                   "&git_repo="+$('#git_repo').val()+
		                   "&git_id="+$('#git_id').val()+
		                   "&git_pwd="+$('#git_pwd').val()
		          , error : function(request, status, error) {
		          alert("code : " + request.status + "\r\n장애가 발생하였습니다.");
		          }
		    	, success : function(response, status, request) {        
				loadingGitFiles('off');
		    		$('#black_screen').css('opacity','0').css('display','none');
				$('#loading_icon')
				.css('opacity','0')
				.css('display','');
				
		    		window.location.href = pathname;
		    	}
		   });
	        }
	   
	});
	
	$('#createRepo').click(function(){
		$.ajax({
		    type:"GET"
		    ,async : true
		          , url : "/Bit_Place/upload/createRepo.do"
		          , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
		          , error : function(request, status, error) {
		          alert("code : " + request.status + "\r\n장애가 발생하였습니다.");
		          }
		    	, success : function(response, status, request) {        
		    	}
		   });
	});
	
	$('#returntoSearch').stop().click(function(){
	   	$('.searchRepo_wrapper')
	   	.css('display','none');
	   	$(this).css('display','none');
  	    	$('#searchforRepo').css('display','');
  	    	$('#git_repo').prop('disabled',false);
	});
	
	
	$('#searchforRepo').stop().click(function(){
	    
  	    $(this).css('display','none');
  	    $('#returntoSearch').css('display','');
	    $('#git_repo').prop('disabled',true); 	
	    $('.searchRepo_wrapper').css('display','');
	    
	    var gitid = new Gh3.User($('#git_id').val());

	    var pageNum = $('#page').val();
	    var pageTotal = $('#per_page').val();
	    
	    displayRepos(gitid, pageNum, pageTotal);
	    
	    $('#next_Rep').click(function(){
	    	    $('#searchedRepoDetail').empty();
		    pageNum = parseInt($('#page').val());
		    pageNum+=1;
		    $('#page').val(pageNum);
		    displayRepos(gitid, pageNum, pageTotal);
	    });
	    
	    $('#prev_Rep').click(function(){
    	   	    $('#searchedRepoDetail').empty();
		    pageNum = parseInt($('#page').val());
		    pageNum-=1;
		    $('#page').val(pageNum);
		    displayRepos(gitid, pageNum, pageTotal);	
	    });
	    
	    //get some repositories of k33g
	    	    
	});
	
	
	function displayRepos(gitid, pageNum, pageTotal){
		
		 $('.submitRepo').css('display','none');
		 if(pageNum==0){
			 $('#prev_Rep').css('display','none')
		 }else{
			 $('#prev_Rep').css('display','') 
		 }
		
   	            $('#searchedRepo').empty();
		  var gitRepositories = new Gh3.Repositories(gitid);
  	    
		    gitRepositories.fetch({page:pageNum, per_page: pageTotal, direction : "asc"},
		    "next", function (err, res) {
		      if(err) {
		        throw "outch ..."
		      }

		      var bobo = res.getRepositories();
		        _.each(_.keys(bobo), function (prop) {   	
		        	 $('#searchedRepo')
		        	 .append(
		        	  $('<div/>')
		        	  .attr('id','Upload_repoDescribe_'+prop)
		        	  .attr('class','repoDescribeDetails')
		        	  .attr('repo',bobo[prop].name)
		        	  .append($('<div/>')
		        		.attr('class','Upload_repoDescribe_Text') 
		        		.append($('<img/>')
		        			.attr('src','../img/content/commiticon.png')
		        		 	.css('margin-right','10px')
		        		 ).append(bobo[prop].name))	
		        	 );	        	 
		        	 
		        	  
		        	   $('#Upload_repoDescribe_'+prop).click(function(){
		   	       
		        		   
		   	        	/*
		   	        	* getRepository files 
		   	        	*/
		   	        	
		   	         $('#searchedRepoDetail').empty();	
		   	         var k33g = new Gh3.User($('#git_id').val());
		   	         var k33gBlog = new Gh3.Repository($(this).attr('repo'), k33g);
		   	         $('.submitRepo')
		   	         .attr('repo',$(this).attr('repo'))
		   	         .css('display','');
		   	         
		   	         k33gBlog.fetch(function (err, res) {
		   	           if(err) { throw "outch ..." }

		   	           k33gBlog.fetchBranches(function (err, res) {
		   	             if(err) { throw "outch ..." }

		   	             var master = k33gBlog.getBranchByName("master");

		   	             master.fetchContents(function (err, res) {
		   	               if(err) { throw "outch ..." }

		   	               master.eachContent(function (content) {
		   	                 
		   	                    if(content.type=='dir'){
		   	              	var dir = master.getDirByName(content.name);
	  	   	                    
		   	              	$('#searchedRepoDetail')
	  	   	                    .append($('<span/>')
	  	   	                    	.css('width','282px')
	  	   	                    	.css('text-align','left')
	  	   	                    	.css('display','block')
	  	   	                    	.css('margin-bottom','10px')
	  	   	                    	.css('margin-left','10px')
	  	   	                    	.attr('class','searchedDetailbox')
	  	   	                    	.append($('<img/>')
	  	   	                    	        .attr('src','../img/content/foldericon.png')
	  	   	                    	        .css('margin-right','10px')	        
	  	   	                    	)	
	  	   	                    	.append(content.name)
	  	   	                            ); 
		   	           	
	  	   	                    
	  	   	                    dir.fetchContents(function (err, res) {
		   	            	 if(err) { throw "outch ..." }

		   	             	 //console.log(dir.getContents());
		   	             	 dir.reverseContents();
		   	             	 dir.eachContent(function (content) {
		   	            		 
		   	             		 if(content.type=='dir'){
		   	             		    $('#searchedRepoDetail')
			   	              	          .append($('<span/>')
		  	   	                    	.css('width','282px')
		  	   	                    	.css('text-align','left')
		  	   	                    	.css('display','block')
		  	   	                    	.css('margin-bottom','10px')
		  	   	                    	.css('margin-left','46px')
		  	   	                    	.attr('class','searchedDetailbox')
		  	   	                    	.append($('<img/>')
		  	   	                    	        .attr('src','../img/content/foldericon.png')
		  	   	                    	        .css('margin-right','10px')	        
		  	   	                    	)	
		  	   	                    	.append(content.name)
		  	   	                            ); 
		   	             		 }else{
		   	             		    $('#searchedRepoDetail')
		   	              	          	.append($('<span/>')
	  	   	                    		.css('width','282px')
	  	   	                    		.css('text-align','left')
	  	   	                    		.css('display','block')
	  	   	                    		.css('margin-bottom','10px')
	  	   	                    		.css('margin-left','46px')
	  	   	                    		.attr('class','searchedDetailbox')
	  	   	                    		.append($('<img/>')
	  	   	                    	 	       .attr('src','../img/content/fileicon.png')
	  	   	                    	 	       .css('margin-right','10px')	        
	  	   	                    		)	
	  	   	                    		.append(content.name)
	  	   	                            	     );  
		   	             		  }
		   	             			   	             	 
		   	             	     });
		   	           	});
		   	                    }else{
		   	                     $('#searchedRepoDetail')
		   	                  	 .append($('<span/>')
		  	   	                    .css('width','282px')
		  	   	                    .css('text-align','left')
		  	   	                    .css('display','block')
		  	   	                    .css('margin-bottom','10px')
		  	   	                    .css('margin-left','10px')
		  	   	                    .attr('class','searchedDetailbox')
		  	   	                    .append($('<img/>')
		  	   	                             .attr('src','../img/content/fileicon.png')
		  	   	                             .css('margin-right','10px')	        
		  	   	                    	)	
		  	   	                    	.append(content.name)
		  	   	                     ); 
		   	                    }
		   	               });
		   	              
		   	               $('.submitRepo').click(function(){
		   	            	$('#git_repo').val('[github]'+$(this).attr('repo'));	   	
		   	               });
		   	               
		   	             });
		   	           })
		   	         });
		   	        	
		   	        	
		   	        	/*
		   	        	* getRepository files End
		   	        	*/
		   	        	
		   	        	
		   	    });
		        	  
		        });
		    });
		
	}
	
	</script>
	<div>
</div>





<div id="grey-line"></div>
<div id="title_content">
	 <p id="content_title_text"><img src="../img/content/write_icon.png"><span id="texty">글작성</span></p>
</div>

<div id="form_wrapper">
<form name="frm" class="form-horizontal" role="form" action="" method="POST">
  <input type="hidden" class="form-control" id="memno" value="${memNo }">
  <input type="hidden" class="form-control" id="git_id" value="${ajax_data[0].git_id }">
  <input type="hidden" class="form-control" id="git_pwd" value="${ajax_data[0].git_pwd}">
  
  <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">주제 선택</span></label>
    <div class="col-sm-9">
	<select id="titleno" class="form-control">
	<c:forEach items="${ajax_data }" var="e">
		<option value="${e.titleno }">${e.title }</option>
	</c:forEach>
	</select>
    </div>
 </div>
    <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">본문 주제</span></label>
    <div class="col-sm-9">
      <input type="text" class="form-control" id="content_title">
    </div>
  </div>
   <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">공개 대상</span></label>
    <div class="col-sm-9">
	<select id="opento" class="form-control">
		<option value="O">모두에게 공개</option>
		<option value="L">그룹 리더에게만 공개</option>
		<option value="F">그룹 회원에게만 공개</option>
	</select>
    </div>
  </div>
    <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">본문 내용</span></label>
    <div class="col-sm-9">
      <textarea class="form-control" id="content"></textarea>
    </div>
  </div>
    <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">저장소 생성</span></label>
    <div class="col-sm-7">
      <input type="text" class="form-control" id="git_repo" >
      
      <%-- Searched Repositories --%>
      <div class='searchRepo_wrapper'>
      <table>
          <tr>
           <td colspan='2'>
           <div id='searchRepo_wrapper_top_td'>
              <span id='prev_Rep'></span>
      	    <span id='next_Rep'></span>
           </div>
           </td>
          </tr>
      	<tr>
      	  <td valign='top'>   
      	      <div id='searchedRepo'>
      	      </div>
      	  </td>
      	  <td valign='top'>
      	        <div id='searchedRepoDetail'>
     	        </div>
     	        <span class='submitRepo'>추가하기</span><br>
      	  </td>
      	</tr>
      </table>
      </div>
      
      <%--hidden files --%>
      <input type='hidden' value= 0 id='page'><br>
      <input type='hidden' value=10 id='per_page'>
      <%--hidden files end --%>
      
      <%-- Searched Repositories End--%>
      
    
    </div>
    <div id='githubButtonGroup'>
    <span id='searchforRepo'></span>
    <span id='returntoSearch'></span>
    </div>
  </div>
</form>
</div>

<div class="buttons_group">
<div id="folder_output">
</div>
<button class="btn btn-warning" id="uploadGithub" >업로드</button>
<button class="btn btn-primary" id="createFolder" >폴더 추가</button>  
</div>



