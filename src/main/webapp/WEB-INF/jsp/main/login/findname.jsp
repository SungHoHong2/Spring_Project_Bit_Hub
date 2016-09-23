<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>   
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<% int numbers=0; %>
<table id="findId_email_table">
<c:forEach items="${data }" var="e" varStatus="no">
	<%numbers++; %>
	<tr>
	<td>
	<span class="findId_email_txt">${e.email }</span>
	</td>
	<td>
	<span class="findId_emai_btn" id="findId_email_${no.index }" value="${e.email }">선택</span>
	</td>
	</tr>
</c:forEach>
</table>
<input type='hidden' value="<%=numbers %>" id="findId_email_totalNum"/>
