<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet">

<style>


.media:hover{
background-color: #F3F2FA;
cursor: pointer;
}

.menue-header{
float:left;
font-size: 120%;
margin-left: 15px;
margin-top: 5px;
}

.container-header{
height:40px;
}

.media-body{
position:relative;
height: 55px;
} 

.content-view{
position:absolute;
top:25px;
left:10px;
width:412px;
height:20px;
text-align:left;
font-size:100%;
white-space: nowrap;
overflow:hidden; 
text-overflow:ellipsis;
} 

.media-heading{
text-align:left;
width:360px;
font-weight:bold;
float:left;
margin-top:5px;
margin-left:5px;
white-space: nowrap; 
overflow:hidden; 
text-overflow:ellipsis;
}
.container{
width: 930px;
}

.conversation-wrap
    {
        box-shadow: -2px 0 3px #ddd;
        padding:0;
        width:620px;
        max-height: 800px;
        overflow: auto;
    }
    .conversation
    {
        padding:5px;
        border-bottom:1px solid #ddd;
        height:70px;
        margin:0;

    }

    .message-wrap
    {
        box-shadow: 0 0 3px #ddd;
        padding:0;

    }
    .msg
    {
        padding:5px;
        /*border-bottom:1px solid #ddd;*/
        margin:0;
    }
    .main-wrap
    {
        padding:10px;
        max-height: 660px;
        overflow: auto;
		
    }

    .time
    {
        position: relative;
        top:2px;
        left:-8px;
        /* color:#bfbfbf; */
        font-size:95%;
    }

    .send-wrap
    {
        border-top: 1px groove;
        border-bottom: 1px solid #eee;
        padding:10px;
        background-color: #E3EAFC;
        height:135px;
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
	
	 var count = $("#idCount").val();
	
	for(var i=0; i<count; i++){
		
	$("#media-"+i).click(function(event){
	 	event.preventDefault();
	 	
	 	var roomno=$(this).attr("data-roomno");
	 	var name=$(this).attr("data-name");
	 	var receiverno=$(this).attr("data-receiverno");
	 	
	 	  $.ajax('/Bit_Place/ajax/personal/messageRoom.do?roomno='
		          +roomno+"&name="+name+"&receiverno="+receiverno, {
		      type: "GET",
		      
		      success: function(response) {
		    	  $('#message-content')
					.empty()
					.append(response);
		      }
		      });   
	})
	
	
	} 
	
	
});

</script>
<% int idCount = 0; %>
<% int readCount = 0; %>

<div class="container-header" data-totalCount="${data.totalCount}">
  <label class="menue-header">받은 메시지함</label>
 </div>
<div class="container">
   <div class="row">
      <div class="conversation-wrap col-lg-3">
        <div class="main-wrap">
        
        <c:forEach var="c" items="${data.object1}">
          <div class="media conversation" id="media-<%= idCount %>" data-name="${c.name}" data-receiverno="${c.receiverno}" data-roomno=${c.roomno }>
                <a class="pull-left" href="#">
                    <img class="media-object" data-src="holder.js/64x64" alt="64x64" style="width: 50px; height: 50px;" src="${c.photo}">
                </a>
                <div class="media-body" >
                    <h5 class="media-heading">${c.name}</h5>
                     	<c:if test="${c.count != 0 }">
                    		<span class="badge read-count" >${c.count }</span>
                     	</c:if> 
                    <small class="pull-right time texty2"><i class="fa fa-clock-o"></i> <fmt:formatDate value="${c.date}" pattern="yyyy-MM-dd"/></small>
                    <small class="content-view texty2"><span class="glyphicon glyphicon-share-alt"></span>${c.m_content }</small>
                    <span class="glyphicon glyphicon-remove texty2" id="remove-<%= idCount %>" style="display:none"
                    data-toggle="tooltip" data-placement="top" title="삭제"></span>
                </div>
            </div>
            <%idCount++; %>
           
           </c:forEach>
           
           <input type="hidden" value="<%=idCount %>" id="idCount">
        </div>
      </div>
  </div>
</div>


