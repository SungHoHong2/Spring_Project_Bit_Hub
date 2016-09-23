<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:choose>
	<c:when test="${data=='[]'}">
	<span class="negativeOutcome">존재하지 않는 아이디입니다.</span>
	</c:when>
	<c:otherwise>
	<span class="positiveOutcome">유효한 아이디입니다.</span>
	</c:otherwise>
</c:choose>
