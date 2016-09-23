<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>    
<%@taglib prefix="c" uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script type="text/javascript" src="../js/sub_top.js"></script>


<% int totalTitleNum=0; %>
<div id="title_Paging_Custom">

<%-- prevBtn --%>
    <c:if test="${data.firstPage!=data.object1[0].orders }">
	<div id='prevBtn_wrapper'>
	<img id='prevBtn' value='${maxNum_order }' src="../img/top/arrow_left.png">
	</div>
   </c:if>
<%-- prevBtn End --%>
   
  
<%-- title data --%>
    <ul id="title_ul">
    <c:forEach items="${data.object1 }" var="e" varStatus="no">
	<c:set var="title_value" value="${e.title }"/>
	<c:set var="title_refined" value="${fn:substring(title_value,0,5)}"/>
	<c:set var="maxNum_order" value="${e.orders }"/>

	<% totalTitleNum++; %>
	<li id="${e.orders }" titleno="${e.titleno }" class='title_btn_${no.index }'>
	<span class='title_btn_ul_design' >${title_refined }</span>
	</li>	
	</c:forEach>
    </ul>
<%-- title data End--%>


<%-- nextBtn --%>
<c:if test="${data.object1[0].orders!=data.lastPage &&
	    data.object1[1].orders!=data.lastPage &&
	    data.object1[2].orders!=data.lastPage }">
   <div id='nextBtn_wrapper'>
	<img id='nextBtn' value='${maxNum_order }' src="../img/top/arrow_right.png">
   </div>
</c:if>   
<%-- nextBtn End--%>


<%-- hidden Data --%>
   <input type="text" value="<%=totalTitleNum %>" id="totalTitleNum">
   <input type='hidden' value='${data.lastPage }' id='titlelastPage'>
   <input type="hidden" value='${data.firstPage }' id='titlefirstPage'>
   <input type="hidden" value="${data.firstPage==data.object1[0].orders }" id='titlefirstPageCheck'>
<%-- hidden Data End --%>


<%-- test Data 
<c:if test="${data.lastPage!=data.object1[2].orders }">result : 2  ${data.object1[2].orders}</c:if>
<c:if test="${data.lastPage!=data.object1[1].orders }">result : 1  ${data.object1[1].orders}</c:if>
<c:if test="${data.lastPage!=data.object1[0].orders }">result : 0  ${data.object1[0].orders}</c:if>
<input type="text" size="5" id="title_design_output" value="${data.firstPage} - ${data.lastPage } : ${data.object1[0].orders}">
--%>

</div>