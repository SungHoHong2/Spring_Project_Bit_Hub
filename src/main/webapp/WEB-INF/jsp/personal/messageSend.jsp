<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<style>
.receiver-header{
float:left;
font-size: 120%;
margin-left: 15px;
margin-top: 5px;
white-space: nowrap;
overflow:hidden;
text-overflow:ellipsis;
}

.message-content{
width:535px;
text-align: left;
}

.receiver-list{
float:left;
}

.container-header{
height:40px;
}

#btnMessageReply{
float:right;
margin-right:8px;
margin-top:8px;
display: block;
width:100px;
}

.media-heading{
float:left;
margin-left:5px;
}
.container{
width: 924px;
}

.conversation-wrap
    {
        box-shadow: -2px 0 3px #ddd;
        padding:0;
        max-height: 400px;
        overflow: auto;
        
    }
    .conversation
    {
        padding:5px;
        border-bottom:1px solid #ddd;
        margin:0;

    }

    .message-wrap
    {
		position: relative;     
        box-shadow: 0 0 3px #ddd;
        padding:0;
		width:620px;
    }
    .msg
    {
        padding:5px;
        /*border-bottom:1px solid #ddd;*/
        margin:0;
    }
    .msg-wrap
    {
        padding:10px;
        max-height: 522px;
        overflow: auto;

    }

    .time
    {
        color:#bfbfbf;
    }

    .send-wrap
    {
    	position: absolute;
    	top:523px;
        border-top: 1px groove;
        border-bottom: 1px solid #eee;
        padding:10px;
        background-color: #E3EAFC;
        width:620px;
        height:138px;
        /*background: #f8f8f8;*/
    }

    .send-message
    {
        resize: none;
    }

    .highlight
    {
        background-color: #f7f7f9;
        border: 1px solid #e1e1e8;
    }

    .send-message-btn
    {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-left-radius: 0;

        border-bottom-right-radius: 0;
    }
    /* .btn-panel
    {
        background: #f7f7f9;
    } */


    .msg-wrap .media-heading
    {
        color:#003bb3;
        font-weight: 700;
    }


    .msg-date
    {
        background: none;
        text-align: center;
        color:#aaa;
        border:none;
        box-shadow: none;
        border-bottom: 1px solid #ddd;
    }


    body::-webkit-scrollbar {
        width: 12px;
    }
 
    
    /* Let's get this party started */
    ::-webkit-scrollbar {
        width: 6px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
/*        -webkit-border-radius: 10px;
        border-radius: 10px;*/
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
/*        -webkit-border-radius: 10px;
        border-radius: 10px;*/
        background:#ddd; 
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
    }
    ::-webkit-scrollbar-thumb:window-inactive {
        background: #ddd; 
    }

</style>
<script type="text/javascript">
$(document).ready(function(){
	
	 $('.message-reply').keyup(function(){
		  var messageContent = $(this).val();
		  
		  if(messageContent !=""){
		    $("#btnMessageReply").removeAttr("disabled");
		  }else{
		    $("#btnMessageReply").attr("disabled", true)
		  }
		});
	
	$("#btnMessageReply").click(function(event){
		event.preventDefault();
		  var messageContent=$(".message-reply").val();
		  var roomno = $(this).attr("data-roomno");
		      $.ajax('/Bit_Place/ajax/personal/messageReply.do?messageContent='
		          +messageContent+"&roomno="+roomno, {
		      type: "GET",
		      
		      success: function(response) {
		        $('.msg-wrap').append(response);
		        $(".message-reply").val("");
		      }
		      });    
	});
	
	 

	
});
</script>

<div class="container-header">
  <label class="receiver-header">${data.name }</label>
 </div>
<div class="container">
  <div class="row">
    <div class="message-wrap col-lg-8">
            <div class="msg-wrap">
                
                <div class="alert alert-info msg-date">
                    <strong>Today</strong>
                </div>
               <c:forEach var="m" items="${data.object1}">
                <div class="media msg">
                    <a class="pull-left" href="#">
                        <img class="media-object" data-src="holder.js/64x64" alt="64x64" style="width: 35px; height: 35px;" src="${m.photo }">
                    </a>
                    <div class="media-body">
                        <small class="pull-right time"><i class="fa fa-clock-o"></i> <fmt:formatDate value="${m.date}" pattern="yyyy-MM-dd hh:mm:ss"/></small>

                        <h5 class="media-heading">${m.name }</h5>
                        <small class="col-lg-10 message-content">${m.m_content }</small>
                    </div>
               	</div>
               	</c:forEach>
               	
               </div>
         		<div class="send-wrap ">
					<textarea class="form-control message-reply" rows="3" placeholder="답장 보내기"></textarea>
            		<button id="btnMessageReply" type="submit" class="btn btn-primary" data-receiverno="${data.receiverno }" data-roomno="${data.roomno}" disabled>답장</button>
           		 </div>
    	</div>
	</div>
</div>


