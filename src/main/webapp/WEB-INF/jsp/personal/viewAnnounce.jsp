<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<link rel="stylesheet" href="../css/input.css">
    
<script type="text/javascript" src='../js/personal_groupAdmin.js'></script>
<script type="text/javascript" src="../js/bootstrap.min.js"></script>
<script type="text/javascript" src="../js/jquery.form.js"></script>


<div id="title_content">
	 <p id="content_title_text"><img src="../img/content/write_icon.png"><span id="texty">공지/자료</span></p>
</div>

<% //form  %>
<div id="form_wrapper" class="form-wrap">
<form name="frm" class="form-horizontal" role="form"  method="POST" id='frm'>
	
	<input type="hidden" class="form-control" name='memno' id="memno" value="">
	<input type="hidden" class="form-control" id="groupno" value="${data.object1[0].groupno}">
	<input type="hidden" class="form-control" id="git_id" value="">
	<input type="hidden" class="form-control" id="git_pwd" value="">
	<input type='hidden' id='truefalse' value='true'>
	
	<div id='input_page'>
	<div id="announce-table-body">
	<table class="table">
		<tr >
			<th>번호</th>
			<th width="320px">
			<div class="align">
			제목
			</div>
			</th>
			<th>작성자</th>
			<th>작성일</th>
			<th>조회수</th>
		</tr >
	<c:forEach var="a" items="${data.object1}">
		<tr class="announceSummary">
			<th>${a.no}</th>
			<th>${a.title}</th>
			<th>${a.name }</th>
			<th><fmt:formatDate value="${a.created_date}" pattern="yyyy-MM-dd"/></th>
			<th></th>
		</tr>	
	</c:forEach>
	</table>
	</div>
	[이전]
	<%int count = 1; %>
	<c:choose>
	<c:when test="${data.pageSize == 1}">
	<c:forEach begin="1" end="${data.totalSize}">
		<a href="#" class="page" data-index="<%= count %>">
		<%= count %>
		</a>
		<% count++; %>
		</c:forEach>
		 [다음]
	</c:when>
	<c:otherwise>
	<c:forEach begin="1" end="3">
		<a href="#" class="page" data-index="<%= count %>">
		<%= count %>
		</a>
		<% count++; %>
		</c:forEach>
		<a href="#" class="pageSize" data-pageName="next" data-page="1" data-pageSize="${data.pageSize}">
		[다음]
		</a>
	</c:otherwise>
	</c:choose>
	
	</div>	 
	
	
</form>
</div>