<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<script type="text/javascript" src="../js/sub_passive.js"></script>

<style>
#datanumberresult{
	display : none;
}
</style>

<table id="sub_data_table">
<% int datanumber = 0;  %>
<c:forEach items="${ajax_data }" var="e" varStatus = "no">
<%datanumber++; %>
<tr>
	<td>
	</td>
	<td>	
	<fmt:formatDate pattern="MM - dd" 
            value="${e.edited_date}" />
	</td>
	<td align="right">
	${e.content_title}
	</td>
</tr>
<tr>
	<td>
	</td>
	<td colspan="2">
	<span class="subbtn_${no.index }" id="${e.contentno }" 
	git_rep="${e.git_repository }" 
	git_id ="${e.git_id }"
	git_pwd="${e.git_pwd }"> ${e.content }</span>
	<img src="../img/top/leadericon.png"/>	
	</td>
</tr>
</c:forEach>
</table>
<input type="text" id="datanumberresult" value="<%=datanumber %>">

