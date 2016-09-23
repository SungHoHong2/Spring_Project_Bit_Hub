<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<link rel="stylesheet" href="../css/input.css">
<link rel="stylesheet" href="../css/body.css">    
<script type="text/javascript" src='../js/personal_groupAdmin.js'></script>
<script type="text/javascript" src="../js/bootstrap.min.js"></script>


<div id="grey-line"></div>
<div id="title_content">
	 <p id="content_title_text"><img src="../img/content/write_icon.png"><span id="texty">관리자</span></p>
</div>
<div class='cssmenu_wrapper'>
<div id='cssmenu'>
<ul>
   <li class='active' id="groupChange_btn"><a href='#'><span>Group 수정</span></a></li>
   <li id='memberChange_btn'><a href='#'><span>Member 관리</span></a></li>
   <li id='titleChange_btn'><a href='#'><span>Title / Contents 관리</span></a></li>
   <li id='Q_AWatch_btn'><a href='#'><span>공지 / 자료 관리</span></a></li>
   <li id='join_request_btn'><a href='#'><span>가입 요청</span></a></li>
</ul>
</div>
</div>

<% //form  %>
<div id="form_wrapper">
<div class="white_space_height_groupAdmin"></div>
<form name="frm" class="form-horizontal" role="form"  method="POST" id='frm'>
	<%--hidden information --%>
	<input type="hidden" class="form-control" name='memno' id="memno" value="${memNo }">
	<input type="hidden" class="form-control" id="groupno" value="${data.object1[0].groupno }">
	<input type="hidden" class="form-control" id="git_id" value="">
	<input type="hidden" class="form-control" id="git_pwd" value="">
	<input type='hidden' id='truefalse' value='true'>
	<%--hidden information End--%>
	
	<%--body of groupAdmin --%>
	<div id='input_page_body'></div>	 
	<div id="addTitle_wrapper"></div> 
	<%--body of groupAdmin End--%>
</form>
</div>
 
<%--adding Title image Icon --%>
<div id='addTitle_Activate'><img id='addTitle_Activate_Btn' src="../img/content/addBtn.png"></div>     
<%--adding Title image Icon End --%>


<%-- Button Group  --%>
<div class="buttons_group">
<button class='btn btn-info' id='groupChange_btn_submit'>수정 완료</button>
<button class='btn btn-danger' id='groupChange_btn2_submit'>그룹 삭제</button>
<button class='btn btn-info' id='memberChange_btn2_submit'>수정 완료</button>
<button class='btn btn-info' id='memberChange_btn_submit'>이메일 확인</button>
<button class="btn btn-info" id="titleChange_btn_submit" >수정 완료</button>
<button class="btn btn-info" id="Q_AWatch_btn_submit"  >올리기</button>
<button class="btn btn-primary" id="quitUpdateGroup" >뒤로 가기</button>  
</div>
<%-- Button Group End --%>


<%-- Data  --%>
<div class='invisible_wrapper'>

<%-- Group 수정 --%>
<div id='groupChange_body'>
 <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">이름 수정</span></label>
    <div class="col-sm-9">
      <input type="text" class="form-control" id="content_title" name='groupname' value="${data.object1[0].groupname }">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">코드 수정</span></label>
    <div class="col-sm-9">
      <input type="text" class="form-control" id="content_title" name='code' value="${data.object1[0].code }">
    </div>
  </div>
   <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">공개 수정</span></label>
    <div class="col-sm-9">
	<select id="opento" class="form-control" name='activegroup'>
		<c:choose>
			<c:when test="${data.object1[0].activegroup==2}">
			<option value=2 selected>모두에게 공개</option>
			<option value=1>그룹 회원에게만 공개</option>
			<option value=0>그룹 리더에게만 공개</option>
			</c:when>
			<c:when test="${data.object1[0].activegroup==1}">
			<option value=2>모두에게 공개</option>
			<option value=1 selected>그룹 회원에게만 공개</option>
			<option value=0>그룹 리더에게만 공개</option>			
			</c:when>
			<c:when test="${data.object1[0].activegroup==0}">
			<option value=2>모두에게 공개</option>
			<option value=1>그룹 회원에게만 공개</option>
			<option value=0 selected>그룹 리더에게만 공개</option>			
			</c:when>
		</c:choose>
	</select>
    </div>
  </div>
    <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">소개 수정</span></label>
    <div class="col-sm-9">
      <textarea class="form-control" id="content" name='introduce'>${data.object1[0].introduce }</textarea>
    </div>
  </div>
</div>
<%-- Group 수정 끝 --%>


<%-- Member 관리 --%>
<div id='memberChange_body'>
<div class="form-group">
 <label class="col-sm-2 control-label"><span class="texty2">사용자 등록</span></label>
    <div class='texty3' id='searchspan'>사용자 검색</div>
    <div class="col-sm-7">
      <input type='text' class='form-control' id='searchUsers_keyup' AUTOCOMPLETE="off">      
      <%--SearchResult Array --%>
      <div id='groupAdmin_searchUsers'></div>
      <%--SearchResult Array End --%>
   </div> 
</div>
  
  <div class="form-group ">
    <label class="col-sm-2 control-label"></label>
    <div class='texty3'>팔로워 추가</div>
    <fieldset class="col-sm-7 follower-border">
    <input type="hidden" id="add-count" value=0>
 
      <!-- <textarea class="form-control" id='addFolowers'></textarea> -->
    <!--  <table class="follower-table" width="393px">
    <tr>
    <td width="90px">
    <img src='../img/userimages/iu2.jpg' class="img-circle follower-circle">
    </td>
    <td width="160px" align="center">
   과르디올라
    </td>
    <td width="250px" align="center">
    mseet@naver.com 
    </td>
    <td width="50px">
    <a href="#" class="add-remove">
    <span class="glyphicon glyphicon-remove"></span></a>
    </td>
  </tr>
</table> -->
    <div class="hidden-space"></div>

    <%--Member Input Array --%>
     <!-- <div id='groupAdmin_validEmails'></div> -->
    <%--Member Input Array End --%>   
      
    </fieldset> 
  </div>
  
  <div class="form-group">
    <label class="col-sm-2 control-label"></label>
    <div class='texty3'>메세지</div>
    <div class="col-sm-7">
      <textarea class="form-control" id='invitation-message'>${data.object1[0].introduce }</textarea>
    </div>
  </div>
  
  <button class="btn btn-primary" id="follower-invitation" disabled >보내기</button>
  
 <div class='groupAdmin_Line'>
  </div>
  
  
  <div class="form-group">
  <%int memnoCount=0; %>   
   <c:set value="L" var="level_leader"/>
   <c:set value="F" var="level_follower"/>
   
   <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">회원 정보</span></label>
    <div class="col-sm-9">
       <div class='texty4'><span id='searchspan'>${data.object1[0].groupname }</span> 에 가입된 리더 정보</div>
       <table id='membertableforLeaders' class="table table-condensed">
       	 <tr>
       	   <td>
       	     사진
       	   </td>
       	   <td>
       	     이름
       	   </td>
       	   <td>
       	     이메일
       	   </td>
       	   <td>
       	     탈퇴
       	   </td>
       	 </tr>
       	 <c:forEach items="${data.object1}" var="data1">   
        <c:if test="${data1.level=='L'.charAt(0) && data1.creator==data1.memno}">
          <tr>
             <td>
             <img src='../img/userimages/${data1.photo }' class="img-circle img-circle-Leader">
             </td>
             <td>
             <div class='tabletrBlock'>
             ${data1.name }
             </div>
             </td>
             <td>
             <div class='tabletrBlock'>
             ${data1.email }
             </div>
             </td>
             <td>
             <div class='tabletrBlock_button'> 
             <%-- <button type='button' class='form-control member-remove-<%=memnoCount %>' data-memno='${data1.memno }'>삭제</button> --%>
             </div>
             </td>
          </tr> 
          <% memnoCount++; %>
        </c:if>
       </c:forEach> 
       <c:forEach items="${data.object1}" var="data1">	 
        <c:if test="${data1.level=='L'.charAt(0) && data1.creator!=data1.memno}">
        	<tr>
        	   <td>
        	   <img src='../img/userimages/${data1.photo }' class="img-circle img-circle-Leader">
        	   </td>
        	   <td>
        	   <div class='tabletrBlock'>
        	   ${data1.name }
        	   </div>
        	   </td>
        	   <td>
        	   <div class='tabletrBlock'>
        	   ${data1.email }
        	   </div>
        	   </td>
        	   <td>
        	   <div class='tabletrBlock_button'> 
        	   <button type='button' class='btn btn-default btn-sm member-remove member-remove-<%=memnoCount %>' data-memno='${data1.memno }'>탈퇴</button>
        	   </div>
        	   </td>
        	</tr>	
        	<% memnoCount++; %>
        </c:if>
       </c:forEach> 
       </table>          
    </div>
  </div>
  
   <div class="form-group">
    <label class="col-sm-2 control-label"></label>
    <div class="col-sm-9">
    <div class='texty4'><span id='searchspan'>${data.object1[0].groupname }</span> 에 가입된 팔로워 정보</div>
    <table id='membertableforLeaders' class="table table-condensed">
       	 <tr>
       	   <td>
       	     사진
       	   </td>
       	   <td>
       	     이름
       	   </td>
       	   <td>
       	     이메일
       	   </td>
       	   <td>
       	   리더요청
       	   </td>
       	   <td>
       	     탈퇴
       	   </td>
       	 </tr>
       <c:forEach items="${data.object1}" var="data1">	 
        <c:if test="${data1.level=='F'.charAt(0)}">
        	<tr>
        	   <td>
        	   <img src='../img/userimages/${data1.photo }' class="img-circle img-circle-Follower">
        	   </td>
        	   <td>
        	   <div class='tabletrBlock'>
        	   ${data1.name }
        	   </div>
        	   </td>
        	   <td>
        	   <div class='tabletrBlock'>
        	   ${data1.email }
        	   </div>
        	   </td>
        	   <td>
        	   <div class='tabletrBlock_button'>
        	   <button type='button' class='btn btn-default btn-sm leader-request leader-request-<%=memnoCount %>' 
        	   data-memnoCount="<%=memnoCount %>" data-memno='${data1.memno }'>요청</button>
        	   </div>
        	   </td>
        	   <td>
        	   <div class='tabletrBlock_button'> 
        	   <button type='button' class='btn btn-default btn-sm member-remove member-remove-<%=memnoCount %>' 
        	   data-memno='${data1.memno }'>탈퇴</button>
        	   </div>
        	   </td>
        	</tr>	
        	<tr class="invisible-tr invisible-message-tr-<%=memnoCount %>">
        	
    <td colspan="5" >
    
      <textarea class="form-control invitation-message2 invitation-message2-<%=memnoCount %>" placeholder="메세지"></textarea>
    
  
  
  <button class="btn btn-primary leader-invitation leader-invitation-<%=memnoCount %>"  
  data-memno='${data1.memno }' data-memnoCount="<%=memnoCount %>" disabled >보내기</button>
        	 </td>
        	</tr>
        	<%memnoCount++; %>
        </c:if>
       </c:forEach> 
       </table>   
    </div>
  </div>
  <input type="hidden" id="memno-count" value="<%=memnoCount %>"> 
</div>
</div>

<%-- Member 관리  끝 --%>


<%-- Title / Contents 수정 추가 --%>
<div id='titleChange_body'>
  <div class="form-group">
    <label class="col-sm-2 control-label">
    <span class="texty2">제목 편집</span>
    </label>
    <div class="titleChange_table_column">
    <span class="columntexty">배치 순서</span>
    <span class="columntexty">제목 이름</span>
    <span class="columntexty"><span>수정 날짜</span></span>
    </div>
    <div id="titleChange_var_wrapper">
      <input type="hidden" name="groupno" value='${data.groupno }'>
      <c:forEach items="${data.object2 }" var="data2" varStatus="no">
      	<input type="hidden" name="list[${no.index }].titleno" value="${data2.titleno }">
      	
<%-- contents start --%>      	
      	<span class='titleChange_labels' id='titleChange_labels_${no.index }' titleno='${data2.titleno }'>
      	       	
      	<div class="col-sm-2">
	<select class='form-control' id='titleContentBtn_${no.index }_selector'>
		<option>1</option>
		<option>2</option>
	</select>

<%--contents displayed by clicking Title --%>

	<div class='contents_display_byTitle' id='titleContentBtn_${no.index }_content'></div>

<%--contents displayed by clicking Title end --%>
      	</div>

      	<div class="col-sm-2">
      		<input type="text" 
      		class="form-control" 
      		name='list[${no.index }].title' 
      		value="${data2.title }"
      		id='titleContentBtn_${no.index }_name'
      		> 	
      	</div>
      	
      	<div class="col-sm-3">
      	<input type="text" 
      	       class="form-control" 
      	       disabled value='<fmt:formatDate value="${data2.created_date }" pattern="yyyy-MM-dd"/>'
      	       id='titleContentBtn_${no.index }_date'>
      	</div>
<%--Title Button --%>  
      	<div class="col-sm-1">
      	<button type="button" 
      	id='titleContentBtn_${no.index }'
      	titleno='${data2.titleno }'
      	class="btn btn-warning">상세</button>
      	</div>
<%--Title Button End --%>

<%--Delete Button --%>
      	<div class="col-sm-1">
      	<button type="button" 
      	class="btn btn-danger"
      	titleno='${data2.titleno }' 
      	deletelabel='titleChange_labels_${no.index}'
      	id='titleContentBtnDel_${no.index}'>삭제</button>
      	</div>
<%--Delete Button End--%>
      	</span>
      	</c:forEach>
      	
      	<div id='content_display_titleAdd'></div>
      	      	
  	<%-- test Data --%>
  	<input type="hidden" value='${data.totalPage }' id='totalPage_titleAdd'>
      	<%-- test Data End --%>
      </div>
    </div>
 </div>
 <%-- Title / Contents 수정 추가 끝 --%>
 
 <div id='Q_AWatch_body'>
 <input type="hidden" id="fileCount" value="0">
 
 <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">제목</span></label>
    <div class="col-sm-9">
      <input type="text" class="form-control" id="announce_title">
    </div>
  </div>

  <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">파일 첨부</span></label>
    <div class="col-sm-9">
      <input type="hidden" id="MAX_FILE_SIZE" name="MAX_FILE_SIZE" value="3145728" />

<div>
 <div class="form-group">
<div class=" col-sm-1">
<div class="fileUpload btn btn-default btn-sm">
    <span>파일 선택</span>
    <input id="fileselect" type="file" class="upload" name="fileselect[]" multiple="multiple" />
    <div id="progress">
        <div class="bar" style="width: 0%;"></div>
    </div>
</div>
<div id="max-file"><span id="select-filesize"></span>/3MB</div>
</div>
</div> 

	<!-- <input type="file" id="fileselect" name="fileselect[]" multiple="multiple" />  -->
	<div id="filedrag"><p id="filedrag-p">마우스로 파일을 끌어오세요</p></div>
</div>

    </div>
  </div>
  
  <div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">내용</span></label>
    <div class="col-sm-9">
      <textarea class="form-control" id="announce_content" style="height:120px"></textarea>
    </div>
  </div>
  </div>
  
 
 <div id='join_request_body'>
  <div id="request-body">
    <div id="request-menue">
      <label class="menue-list"><span class="texty2">가입요청</span></label>
     </div>
    <div id="request-content">
    </div>
  </div>
 </div>
 
</div>
