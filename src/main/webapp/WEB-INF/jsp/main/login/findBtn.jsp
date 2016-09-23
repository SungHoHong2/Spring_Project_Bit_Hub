<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>   
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:choose>
	<c:when test="${not empty data}">
	<span class="positiveOutcome">${data.phone} 발급 완료</span> 
	</c:when>
	<c:otherwise>
	<span class="negativeOutcome">일치하는 정보가 없습니다.</span>
	</c:otherwise>
</c:choose>