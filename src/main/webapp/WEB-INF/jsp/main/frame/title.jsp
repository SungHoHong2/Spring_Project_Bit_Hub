<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@taglib prefix="c" uri='http://java.sun.com/jsp/jstl/core' %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>


<link href="../js/mobile/jquery-ui-css.css" rel="stylesheet">

<%--
    개발자 장윤용
 --%>
<link href="../css/bootstrap-switch.css" rel="stylesheet">
<link href="../css/bootstrap/bootstrap-glyphicons.css" rel="stylesheet">

<%--
    개발자 장윤용 끝 
 --%>

<script src="../js/mobile/jquery-ui.js"></script>
<script type="text/javascript" src="../js/sub_auto.js"></script>
<script type="text/javascript" src="../js/sub_top.js"></script>


<%--
    개발자 장윤용
 --%>
<script type="text/javascript" src="../js/content/maskedinput.js"></script>
<script type="text/javascript" src="../js/bootstrap-switch.js"></script>
<script src="http://www.datejs.com/build/date.js" type="text/javascript"></script>

<%--
    개발자 장윤용 끝 
 --%>


<script type="text/javascript">
$('#title_ul').sortable();
</script>
 
<div id='title_sub_output'>
<% int totalTitleNum=0; %>
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
<input type='hidden' id='totalTitleNum' value='<%=totalTitleNum %>'>
<%-- nextBtn --%>
<c:if test="${data.totalPage > 3 }">
<div id="nextBtn_wrapper">
<img id='nextBtn' value='${maxNum_order }' src="../img/top/arrow_right.png">
</div>
</c:if>

<%-- nextBtn End --%>

</div>

<div id="personalTab_wrapper">
	<c:choose>
		<c:when test="${data.creator==memNo }">
		<c:if test="${not empty data.creator }">
			<span class="groupAdmin" id="groupAdmin">관리자</span>
		</c:if>
		</c:when>
		<c:otherwise>
			<span class="personalInfo" id='groupFollower' data-groupno="${data.groupno }">공지/자료</span>
		</c:otherwise>
	</c:choose>
			<span class="personalInfo" id='personalInfo'>개인정보</span>
</div>


<%--
    개발자 장윤용
 --%>
 
<div id="invisible-messgeAlarm" data-visible="off">
<div id="alarm-wrap">
<div class="alarm-header"><a class="alarm-label-header" href="#">받은 메시지함</a>
<a class="alarm-remove" href="#"><span class="glyphicon glyphicon-remove"></span></a>
</div>
<div class="alarm-body-warp">
<!-- <div class="alarm-body">
	<div class="alarm-photo"><img  src="../img/userimages/iu2.jpg" class="alarm-thumnail"></div>
	<span class="alarm-name">
	<label class="alarm-label-Name" >이승우</label></span>
	<span class="alarm-date">2014-09-18</span>
	<span class="alarm-content"><span class="glyphicon glyphicon-share-alt"></span>dfsdfsfsf</span>
</div> -->

</div>
</div>
</div>