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

<script type="text/javascript">

</script>    
   
    
<div id="grey-line"></div>
<div id="title_content">
	 <p id="content_title_text"><img src="../img/content/write_icon.png"><span id="texty">개인정보</span></p>
</div>
<div class='cssmenu_wrapper'>
<div id='cssmenu'>
<ul>
   <li class='active' id="box1_btn"><a href='#'><span>개인 정보</span></a></li>
   <li id='box2_btn'><a href='#'><span>그룹 관리</span></a></li>
   <li id='box3_btn'><a href='#'><span>쪽지 관리</span>
   
   
   <c:if test="${data.totalCount != 0 }">
   	&nbsp;<span class="badge" id="total-count">
   	${data.totalCount}
   	</span>
   </c:if>
 
   <c:if test="${data.totalCount ==0 }">
    &nbsp;<span id="total-count"></span>
   </c:if>
   </a></li>
   <li id='box4_btn'><a href='#'><span>그룹 초대</span></a></li>
</ul>
</div>
</div>
<div id="form_wrapper">
<div class="white_space_height_groupAdmin"></div>
<form name="frm" class="form-horizontal" role="form" action="" id='frm'>
	<input type="hidden" class="form-control" id="memno" name="memno" value="${memNo }">
	<input type="hidden" class="form-control" id="groupno" value="">
	<input type="hidden" class="form-control" id="git_id" value="">
	<input type="hidden" class="form-control" id="git_pwd" value="">
	<input type="hidden" id="hiddenPhoto" name="photo" value="${data.photo}" >
	<div id='input_page_body'></div>	  
</form>
</div> 



<div class="buttons_group" >
<button class="btn btn-info btn-update" id="BtnInfoUpdate" >수정 완료</button>
<button class="btn btn-info btn-update" id="btn-group-update" style="display:none" >수정 완료</button>
</div>



<div class='invisible_wrapper'>
<div id='box1_body'>
<div class="form-group">
  <label class="col-sm-2 control-label"><span class="texty2">사진</span></label>
  <div class="col-sm-3">
  <img id="photo" class="img-thumbnail" src="${data.photo }" >
  </div>
  </div>
  
  <div class="form-group">
<div class=" col-sm-7">
<div class="fileUpload btn btn-default">
    <span>등록</span>
    <input id="fileId" type="file" class="upload" name="file-data" />
    <div id="progress">
        <div class="bar" style="width: 0%;"></div>
    </div>
</div>
<button id="btnPhotoDelete" type="submit" 
      class="btn btn-default x-photoDelete-item">삭제</button>
</div>
</div> 

  <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">GIT_ID</span></label>
    <div class="col-sm-9">
      <input id="git_id" class="form-control text" type="text" name="git_id" value="${data.gitid }" readonly>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">이름</span></label>
    <div class="col-sm-9">
      <input id="name" class="form-control text" type="text" name="name" value="${data.name }" readonly>
    </div>
  </div> 
  <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2 new">새 비밀번호</span></label>
    <div class="col-sm-9">
      <input id="pwdChange" class="form-control text" type="password" name="pwd">
    </div>
  </div>   
  <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2 new">비밀번호 확인</span></label>
    <div class="col-sm-9">
      <input id="pwdChangeConfirm" class="form-control text" type="password" name="pwdConfirm">
    </div>
  </div> 
  <div class="form-group x-pwdFail" style="display:none;">
    <div class="col-sm-9">
      <label>비밀번호가 일치하지 않습니다</label>
    </div>
</div>  
  <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">이메일</span></label>
    <div class="col-sm-9">
      <input id="email" class="form-control text" type="text" value="${data.email }" name="email">
    </div>
  </div>   
  <!-- <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2 new">새 이메일</span></label>
    <div class="col-sm-9">
      <input id="emailChange" class="form-control text" type="text" name="email">
    </div>
  </div>  -->
  <div class="form-group x-validEmail" style="display:none;">
    <div class="col-sm-9">
     <label> 유효한 이메일이 아닙니다</label>
    </div>
</div>
  <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">전화번호</span></label>
    <div class="col-sm-9">
      <input id="phone" class="form-control text" type="text" value="${data.phone }" name="phone">
    </div>
  </div>
  <!-- <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2 new">새 전화번호</span></label>
    <div class="col-sm-9">
      <input id="phoneChange" class="form-control text" type="text" name="phone">
    </div>
  </div>   -->  
  <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">개인 알림설정</span></label>
    <div class="col-sm-2">
    <c:if test="${data.alarm == true }">
      <input id="alarm"  type="checkbox"  name="alarm" checked>
    </c:if>
    <c:if test="${data.alarm == false }">
      <input id="alarm"  type="checkbox"  name="alarm">
    </c:if>
    </div>
  </div>

</div>


<div id='box2_body'>
<div id="group-body">
</div>

     
</div>


<div id='box3_body'>
  <div id="message-body">
  	<div id="message-menue">
  		<!-- <div class="message-menues">
  			<button type="button" class="btn btn-primary" id="message-write">쪽지 쓰기</button>
  		</div>
  		<hr> -->
  		<div class="message-menues message-submenues" id="message-write">
  			<label class="menue-list"><span class="texty2">쪽지쓰기</span></label>
  		</div>
  		
  		<div class="message-menues message-submenues" id="message-container">
  			<label class="menue-list"><span class="texty2">받은쪽지함</span></label>
  		</div>
  		<!-- <div class="message-menues message-submenues" id="not-read">
  			<label class="menue-list"><span class="texty2">읽지않은쪽지</span></label>
  		</div> -->
  		
  	</div>
  	<div id="message-content">
  	</div>
  </div>
</div>

<div id='box4_body'>
  <div id="invitation-body">
  	<div id="invitation-menue">
  		
  		<label class="menue-list"><span class="texty2">그룹초대</span></label>
  		
  	</div>
  	<div id="invitation-content">
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



 