$(document).ready(function(){
	var pathname = window.location.pathname;	
	var data = pathname;
	var arr = data.split('/');
	var sub = arr[arr.length-2];    
	var file = arr[arr.length-1].split('.');

		$('#body_output').css({'height': '400px'});	
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
			//$('input:button').button();
			//$('#submit'+numbers).button();		
			
			$('#uploadForm'+numbers).submit(function(event) {
				event.preventDefault();	
				//where the file is uploaded to the servlet			
				
				alert($('#folder'+numbers).val());
				
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
		
		
		//update the files to servlet
		$('#submitContent').click(function(){		
			for(var i=0; i<numbers; i++){
				document.getElementById('submit'+i).click();
			}
		});
		
		
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
		
		
	
	
	
});
