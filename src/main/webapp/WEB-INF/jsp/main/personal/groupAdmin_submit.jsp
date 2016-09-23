<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:if test="${not empty data }">
<c:redirect url="http://localhost:9999/Bit_Place/groups/${data}.bit"/>
</c:if>