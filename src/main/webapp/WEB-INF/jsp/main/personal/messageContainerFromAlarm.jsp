<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<link rel="stylesheet" href="../css/input.css">
<link rel="stylesheet" href="../css/body.css">    

<link rel="stylesheet" href="../css/personalInfo.css"> 


<link href="../css/bootstrap-switch.css" rel="stylesheet">

<script type="text/javascript" src="../js/bootstrap-switch.js"></script>
<script type="text/javascript" src="../js/content/maskedinput.js"></script>
<script type="text/javascript"  src="../js/personalInfo.js"></script>
<script type="text/javascript" src="../js/bootstrap.min.js"></script>

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
   
    
<div id="grey-line"></div>
<div id="title_content">
	 <p id="content_title_text"><img src="../img/content/write_icon.png"><span id="texty">개인정보</span></p>
</div>
<div class='cssmenu_wrapper'>
<div id='cssmenu'>
<ul>
   <li id="box1_btn"><a href='#'><span>개인 정보</span></a></li>
   <li id='box2_btn'><a href='#'><span>그룹 관리</span></a></li>
   <li class='active' id='box3_btn'><a href='#'><span>쪽지 관리</span>
   
   <c:if test="${data.totalCount != 0 }">
   	&nbsp;<span class="badge" id="total-count">
   	${data.totalCount}
   	</span>
   </c:if>
 
   <c:if test="${data.totalCount ==0 }">
    &nbsp;<span id="total-count"></span>
   </c:if>
   
   </a></li>
</ul>
</div>
</div>
<div id="form_wrapper">
<div class="white_space_height_groupAdmin"></div>
<form name="frm" class="form-horizontal" role="form" action="" id='frm'>
	<div id='input_page_body'></div>	  
</form>
</div> 



<div class="buttons_group" >
<button class="btn btn-info btn-update" id="BtnInfoUpdate" >수정 완료</button>
<button class="btn btn-info btn-update" id="btn-group-update" style="display:none" >수정 완료</button>
</div>



<div class='invisible_wrapper'>
<div id='box1_body'>

</div>


<div id='box2_body'>
<div id="group-body">
</div>

     
</div>


<div id='box3_body'>
  <div id="message-body">
  	<div id="message-menue">
  		
  		<div class="message-menues message-submenues" id="message-write">
  			<label class="menue-list"><span class="texty2">쪽지쓰기</span></label>
  		</div>
  		
  		<div class="message-menues message-submenues" id="message-container">
  			<label class="menue-list"><span class="texty2">받은쪽지함</span></label>
  		</div>
  		
  	</div>
  	<div id="message-content">
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


  	
  	</div>
  </div>
</div>
 </div>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only"></span></button>
        <h4 class="modal-title" id="myModalLabel"></h4>
      </div>
      <div class="modal-body">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="groupWithdraw">확인</button>
        <button type="button" class="btn btn-default" data-dismiss="modal" id="cancle_and_confirm">취소</button>
      </div>
    </div>
  </div>
</div>



