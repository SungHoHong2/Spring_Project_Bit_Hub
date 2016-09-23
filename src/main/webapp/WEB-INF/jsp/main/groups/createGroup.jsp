<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
     
<link rel="stylesheet" href="../css/input.css">
<style>
.buttons_group{
  margin-top:10px;
}
</style>


<div id="grey-line"></div>
<div id="title_content">
	 <p id="content_title_text">
	 <img src="../img/content/write_icon.png">
	 <span id="texty">그룹생성</span>
	 </p>
</div>

<div id="form_wrapper">
<form name="frm" class="form-horizontal" role="form" action="" id="groupfrm" method="POST">
   <input type="hidden" class="form-control" id="creator" name="memno" value="${memNo }">  	
   <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">그룹이름</span></label>
    <div class="col-sm-9">
      <input type="text" class="form-control" name='groupname' id="groupname">
    </div>
  </div>
  
   <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">가입코드</span></label>
    <div class="col-sm-9">
      <input type="text" class="form-control" name='code' id="code">
    </div>
  </div>
  
   <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">소개글</span></label>
    <div class="col-sm-9">
      <textarea class="form-control" name='introduce' id="introduce"></textarea>
    </div>
  </div>
  
   <div class="form-group" style="display : none">
    <label class="col-sm-2 control-label"><span class="texty2">활동여부</span></label> 
    <div class="col-sm-9">
     <div class="onoffswitch">
     
    <input type="checkbox" class="onoffswitch-checkbox" id="myonoffswitch" name='activegroup'>
    <label class="onoffswitch-label" for="myonoffswitch">
        <span class="onoffswitch-inner"></span>
        <span class="onoffswitch-switch"></span>
    </label>
   </div>
    </div>
   </div>
  
</form>
</div> 

<div class="buttons_group">
<button class="btn btn-info" id="submitContent" >그룹 생성</button>
<button class="btn btn-primary" id="createFolder" >취소</button>  
</div>
    