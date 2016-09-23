<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%int content_commitinfo_btn_num = 0; %>

<c:forEach items="${ajax_data }" var ="e" varStatus="no">
<% content_commitinfo_btn_num++; %>
<div class="content_commitinfo_line">
<span class="content_commitinfo_img">
<c:choose>
	<c:when test="${e.type=='tree'}">
	<c:if test="${sides>1 }">
	ㄴ
	</c:if>
	<img src="../img/content/foldericon.png" 
	sha="${e.sha}" 
	id='${sides }_content_commitinfo_btn_${no.index}'
	class='${sides }_content_commitinfo_btn_${no.index}'
	type='folder'
	>
	</c:when>
	<c:when test="${e.type=='blob'}">
	<c:if test="${sides>1 }">
	ㄴ
	</c:if>
	<img src="../img/content/fileicon.png" sha="${e.sha }" 
	id="${sides }_content_commitinfo_btn_${no.index }"
	type='file'>
	</c:when>
</c:choose>
</span>	
<span class="content_commitinfo_files_${no.index }" id="${e.sha}">${e.path }</span>
</div>
<c:if test="${e.type=='tree' }">
	<div id="sub_${sides }_content_commitinfo_btn_${no.index}" class="sub_${sides }_content_commitinfo_btn_${no.index}"></div>
</c:if>
</c:forEach>

<input type="hidden" value="<%=content_commitinfo_btn_num %>" id="content_commitinfo_btn_num2">

