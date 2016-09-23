<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

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
			<th><a href="#" class="announceDetail" data-leadno="${a.leadno}">
      ${a.title}</a></th>
			<th>${a.name}</th>
			<th><fmt:formatDate value="${a.created_date}" pattern="yyyy-MM-dd"/></th>
			<th>${a.count}</th>
		</tr>	
	</c:forEach>
	</table>