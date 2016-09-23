<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<link rel="stylesheet" type="text/css" href="../css/displayContent.css">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">


<div id='top_layer'>
<span id='ouput_contentno'>${ajax_data.object2[0].contentno }</span>
<span id='top_layer_small_line'></span>
<span  id='downloadAll'></span>
<span id='top_layer_small_line'></span>
<div id='output_addFiles'></div>
<span id='top_layer_small_line'></span>
<div id='output_addDir'></div>
<span id='top_layer_text'>${ajax_data.object2[0].real_content_title }</span>
<span id='top_layer_date'>${ajax_data.object2[0].edited_date }</span>
</div>


<div id='changedDataChecker'></div>

<div id='opendetail_wrapper'>
<div id='opendatail_shadow'></div>
<div id='opendetail_buttonGroup'></div>
<div id='opendetail_contents'></div>
</div>
<div id='output_wrapper'>
<div id='top_layer_shadow'></div>
<div id="output">
</div>
</div>

<%--insert update complete --%>

<div id='content_comment_input_wrapper'>
<span id='typeintoContent_Design'>
<input type='text' id='typeintoContent' size='35'>
</span>
<div id='submitUpdate'><img src='../img/content/content_updateicon.png'> 수 정 완 료</div>
</div>
<div id='content_comment_input_shadow'>
</div>

<%--insert update complete End --%>


<%--content_show --%>
<div id='content_data_wrapper'>
<div id='content_data_users'>
<c:forEach items='${ajax_data.object2 }' var='e'>
<div class='content_data_wrapper' id='${e.memno }'>
<div class='content_data_imagebox'>
 <img class='img-circle' src='../img/userimages/${e.git_id }.png'>  		
</div>
<div class='content_data_content'>
${e.name } 
<span class='content_data_date'>
<fmt:formatDate value="${e.edited_date }" pattern="YYYY-mm-dd"/> 
</span><br>	
${e.content } 
</div>
</div>
<br>
<br>
</c:forEach>	
</div>

<div id='content_data_comments'>
<c:forEach items='${ajax_data.object3 }' var='e' varStatus='no'>
<div class='content_data_wrapper' id='${e.commentno }'>
<div class='content_data_imagebox'>
<c:choose>
	<c:when test="${e.level==76 }">
	<img class='img-circle img-circle-Leader' src='../img/userimages/${e.git_id }.png'>  		
	</c:when>
	<c:otherwise>
	<img class='img-circle img-circle-Follower' src='../img/userimages/${e.git_id }.png'>  		
	</c:otherwise>
	
</c:choose>

</div>
<div class='content_data_content'>
${e.name } 
<span class='content_data_date'>
<fmt:formatDate value="${e.created_date }" pattern="YYYY-mm-dd"/> 
</span><br>	
${e.content } 
</div>
<c:choose>
<c:when test="${e.commitsha==ajax_data.sha }">
<div class='content_commitsha_using' sha='${e.commitsha }'></div>
</c:when>
<c:otherwise>
<div class='content_commitsha' sha='${e.commitsha }'></div>
</c:otherwise>
</c:choose>
</div>
</c:forEach>
</div>
</div>
<%--content_show End --%>



<%--changelist show --%>
<div id='changeList_wrapper'>
<form id='changeList'>
<%-- Essential Information --%>
<input type='hidden' name='memno' value=${memNo }>
<input type='hidden' name='level' value=${ajax_data.level }>
<input type='hidden' name='groupno' id='groupno' value=${FirstGroup }>
<input type='hidden' id='currentsha' value=${ajax_data.sha }>
<input type='hidden' name='contentno' id='contentno'>
<input type='hidden' name='git_repository' value='${ajax_data.git_repository }'>
<input type='hidden' name='git_id' value='${ajax_data.git_id }'>
<input type='hidden' name='git_pwd' value='${ajax_data.git_pwd }'>


<div id='textareaHidden'>
<textarea name='content' id='content'></textarea>
</div>
<%-- Essential Information End --%>
</form>


<%-- update list adds here --%>


<div id='changeList_Total_hidden'>
새파일 개수 : <input type='text' id='newFile_total' value=1><br>
추가 개수 : <input type='text' id='addList_total' value=0><br>
수정 개수 : <input type='text' id='changeList_total' value=0><br>
이동 개수 : <input type='text' id='moveList_total' value=0><br> 
삭제 개수 : <input type='text' id='deleteList_total' value=0><br>
</div>
</div>
<%--changelist show End--%>



<%--Hidden Data  --%>
<div class="hidden_div">
<c:forEach items="${ajax_data.object1 }" var="e" varStatus='no'>
		<c:if test="${e.type=='blob' }">
		<c:if test="${e.pathNumParent==0}">
			<div sha='${e.sha }' 
			class='data_box_hidden' 
			id='filename_${no.index }'
			par='${e.pathNumParent }'
			chi='${e.pathNum }'
			path='${e.path }'
			type='${e.type }'>
			${e.path }			
			</div>
		</c:if>
		</c:if>
</c:forEach>

<%int folderNum = 0; %>
<c:forEach items="${ajax_data.object1 }" var="e">
		<c:if test="${e.pathNum > 100}">
		<div sha='${e.sha }' 
		id='foldername_<%=folderNum %>'
		par='${e.pathNumParent }'
		chi='${e.pathNum }'
		path='${e.path }'
		type='${e.type }'
		files='#filename_<%=folderNum %>'
		total='#foldername_<%=folderNum %>_files' 
		class='data_box_hidden'>
		
		<%--folder name start --%>
		<p>${e.path }</p><br>
		
		<%--folder name end --%>
		
	           <div>
	           <%int fileNum = 0; %>
         		 <c:forEach items='${ajax_data.object1 }' var='f'>
          	 <c:if test="${e.pathNum==f.pathNumParent}">
          	 
          	 <%--Blob data start --%>
          	 <div id='filename_<%=folderNum %>_<%=fileNum%>'
          	      par='${f.pathNumParent }'
		      chi='${f.pathNum }'
		      path='${f.path }'
		      type='${f.type }'
		      sha='${f.sha }'>
          	 <span>${f.path }</span><br>
          	 </div>
		 <%fileNum++; %>
          	 <%--Blob data end --%>
          	 </c:if>
          	 </c:forEach>
          	 <input type='text' id='foldername_<%=folderNum %>_files' value='<%=fileNum%>'>
          	 </div>
		</div>	
		<%folderNum++; %>
         		</c:if> 	 	
</c:forEach>


</div>

<input type="hidden" id="folderNum" value="<%=folderNum%>">
<input type='hidden' id='fileNum' value=0>
<input type='hidden' id='folderUniqueNum' value=0>
<input type='hidden' id='git_id' value='${ajax_data.git_id }'>
<input type='hidden' id='git_pwd' value='${ajax_data.git_pwd }'>
<input type='hidden' id='git_repo' value='${ajax_data.git_repository }'>


<%--Hidden End --%>


