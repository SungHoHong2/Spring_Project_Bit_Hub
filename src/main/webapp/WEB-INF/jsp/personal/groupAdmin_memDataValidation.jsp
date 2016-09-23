<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
    
<c:choose>
	<c:when test="${empty data.memno }">
	 	${data.email }은 유효하지 않은 이메일입니다. 
	</c:when>
	<c:otherwise>
		<input type='text' name='list[${data.count }].memno' value='${data.memno}'>
	</c:otherwise>
</c:choose>    
