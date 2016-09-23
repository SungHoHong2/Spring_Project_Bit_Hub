<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<style>
#searchGroupDetail_wrapper td{
	border : 1px solid black;
	padding : 10px;
}	

  
</style>
  
  
<c:set value="${ajax_data.photo }" var="imageUrl"/>  
<table id="searchGroupDetail_wrapper">
<tr>
  <td align="center">${ajax_data.groupname } - ${ajax_data.name }</td>
</tr>
<tr>
	<td  valign="top" align="center">	
		<c:choose>
		<c:when test="${fn:contains(imageUrl,'http://')}">
			<img src="${ajax_data.photo }">
		</c:when>
		<c:otherwise>
		          <img src="../img/userimages/${ajax_data.photo }" class="img-thumbnail" 
		          width="200px" height ="200px"/>
		</c:otherwise>
		</c:choose>
	</td>
	<%-- <td>
	   ${ajax_data.groupname }	
	</td> --%>
</tr>
<%-- <tr>
	<td>
	    ${ajax_data.name } ${ajax_data.creator }
	</td>
</tr>
<tr>
	<td>
	    ${ajax_data.activegroup }
	</td>
</tr> --%>
<tr >
	<td align="center">
              <%-- ${ajax_data.groupname }
	    ${ajax_data.created_date } --%>
	    ${ajax_data.introduce }
	</td>
</tr>

<c:if test="${ajax_data.memno!=memNo }">
<tr>
	<td>
	<textarea class="form-control request-message" placeholder="메세지"></textarea>
	</td>
</tr>
<tr>
	<td align="center">
  	<button type="button" class="btn btn-default join-request" 
  	data-groupno="${ajax_data.groupno}" data-creator="${ajax_data.creator}">가입요청</button>
	</td>
</tr>
</c:if>
</table>

    
 
