<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<style>
.testtable td{
	padding-top : 10px;
	padding-left : 10px;
	padding-right : 10px;
	padding-bottom : 10px;
}

.groupAdmin_displayContent_table{
	width : 515px;
	margin-top : 10px;
}


#groupAdmin_displayContent_content{
	background : red;
	display : none;
}

</style>

<%-- Mysql Data 

	SELECT C.CONTENTNO, M.EMAIL, M.NAME, M.PHOTO, C.EDITED_DATE, C.CONTENT_TITLE, S.CONTENT 
	FROM BIT_CONTENT C 
	JOIN CONTENT_SPECIFIC S 
	ON S.CONTENTNO=C.CONTENTNO
	JOIN BIT_MEMBERS M ON M.MEMNO = S.MEMNO
	WHERE C.TITLENO=#{titleno} ORDER BY C.CONTENTNO DESC;
	
Mysql Data --%>


<%int contentCount=0; %>
<c:forEach items="${data }" var="e" varStatus='no'>
<%contentCount++; %>
<div id='groupAdmin_displayContent_wrapper_${no.index }'>
<table class="groupAdmin_displayContent_table">
	<tr>
	<td width='60px'>
	<img src='../img/userimages/${e.photo }' class="img-circle">
	</td>
	<td width='200px'>
	${e.content_title }
	</td>
	<td width='60px'>
	${e.name }
	</td>
	<td width='100px'>
	<fmt:formatDate value="${e.edited_date }" pattern="yyyy-MM-dd"/> 
	</td>
	<td>
	<button type='button' 
	class="btn btn-default"
	id="groupAdmin_content_deleteBtn_${no.index }" 
	deleteno='groupAdmin_displayContent_wrapper_${no.index}'
	contentno='${e.contentno }'>삭제</button>
	</td>	
	</tr>
</table>
</div>
</c:forEach>


<%--hidden files --%>
<input type='hidden' value='<%=contentCount%>' id='groupAdmin_content_delete_Total'>
<%--hidden files End --%>