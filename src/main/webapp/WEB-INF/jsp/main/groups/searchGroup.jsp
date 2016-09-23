<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%int totalNumz=0; %>
<c:forEach items="${ajax_data.object1 }" var="e" varStatus='no'>
<%totalNumz++; %>
<div class='searchGrouptable_wrapper' id="searchedGroupsDescBtn_${no.index }" groupNo='${e.groupno }'>

	<table class="searchGrouptable">
	<tr>
	<td>
	그룹
	</td>	   
	<td>
	${e.groupname}
	</td>
	<td>
	<fmt:formatDate value="${e.created_date}" pattern="yyyy-MM-dd"/> 
	</td>
	</tr>
	</table>
</div>
</c:forEach>

<input type="hidden" id="searchedGrouptotal" value="<%=totalNumz%>">
