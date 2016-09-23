<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style>
	.testtable td{
		padding : 10px;
	}
	
	.testtable{
		width:100%;
	}
	
	#no_data{
		display:block;
		height : 40px;
		padding-top : 18px;
	}
</style>

<c:if test="${empty data }">
<div id='no_data'>
	검색된 자료가 없습니다. 
</div>
</c:if>

<%--
        	   <img src='../img/userimages/${data1.photo }' class="img-circle img-circle-Leader">

 --%>

<%int count=0; %>
<c:forEach items="${data }" var = "e" varStatus='no'>
<%count++; %>
<table class='testtable'>
	<tr>
		<td width="70px">
		<img src='../img/userimages/${e.photo }' class="img-circle">
		</td>
		<td width="70px">
		${e.name } 
		</td>
		<td width="193px" align="center">
		${e.email }
		</td>
		<td>
		<button type='button' 
		class='form-control member-add-group' 
		id='memberAddGroup_${no.index }' 
		data-photo='${e.photo }'
		data-email='${e.email}'
		data-name='${e.name }'
		data-memno='${e.memno}'>선택</button>
		</td>
	</tr>
</table>		
</c:forEach> 
<input type='hidden' value="<%=count%>" id='total_memberAddGroup'>
