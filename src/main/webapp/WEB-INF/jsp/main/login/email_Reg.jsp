<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:choose>
	<c:when test="${data=='[]'}">
	<span class="positiveOutcome">사용가능한 아이디입니다.</span>
	</c:when>
	<c:otherwise>
	<span class="negativeOutcome">존재하는 아이디입니다.</span>
	</c:otherwise>
</c:choose>
