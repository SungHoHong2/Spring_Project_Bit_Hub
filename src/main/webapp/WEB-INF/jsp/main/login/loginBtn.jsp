<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:choose>
	<c:when test="${data.memno!=0}">
		success 
	</c:when>
	<c:otherwise>
		failure
	</c:otherwise>
</c:choose>


 
    
