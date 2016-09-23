<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
 
<style>
#form_wrapper{
	margin-left:65px;
	padding-top:20px;
	padding-bottom:20px;
	text-align: center;
}

#content_title_text{
 font-weight: bold;
 font-size : large;
 margin-left  : 30px;	
 padding-top : 20px;
}

#texty{
 margin-left : 20px;	 
}
p{font-family: Arial, Helvetica, sans-serif}

#grey-line{
	width : 2px;
	height : 100%;
	background : #E4E4E4;
	position : absolute;
	left : 170px;
}

.texty2{
	color : #90a1b1;	
}

.buttons_group{
	display : block;
	width : 700px;
	text-align : center;
	float : left;
	margin-left:60px;
}

</style>

<div id="grey-line"></div>
<div id="title_content">
	 <p id="content_title_text"><img src="../img/content/write_icon.png"><span id="texty">글작성</span></p>
</div>

<div id="form_wrapper">
<form name="frm" class="form-horizontal" role="form" action="" method="POST">
  <input type="hidden" class="form-control" id="memno" value="">
  <input type="hidden" class="form-control" id="git_id" value="">
  <input type="hidden" class="form-control" id="git_pwd" value="">
  

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
    <div class="col-sm-9">
      <input type="text" class="form-control" id="git_repo" >
    </div>
  </div>
    <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">저장소 선택</span></label>
    <div class="col-sm-9">
      <input type="text" class="form-control" id="ㅆ" >
    </div>
  </div>
</form>
</div> 

<div class="buttons_group">
<button class="btn btn-warning" id="uploadGithub" >uploadtoGithub</button>
<button class="btn btn-info" id="submitContent" >자료 확정</button>
<button class="btn btn-primary" id="createFolder" >자료 추가</button>  
</div>
    