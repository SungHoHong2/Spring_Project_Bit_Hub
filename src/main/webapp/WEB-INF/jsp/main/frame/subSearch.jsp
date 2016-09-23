<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@taglib prefix="c" uri='http://java.sun.com/jsp/jstl/core' %>
<%@taglib prefix="fmt" uri='http://java.sun.com/jsp/jstl/fmt' %>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script type="text/javascript" src="../js/sub_left.js"></script>
<link rel="stylesheet" href="../css/sub.css">


<input id="firstGroup" value='${FirstGroup }' type="hidden"/>
<% int datanumber = 0;  %>
<c:if test="${empty data }">
<div class="subContents_wrapper">
<div id='nodata'>
검색된 자료가 없습니다. 
</div>
</div>
</c:if>


<c:forEach items="${data }" var="e" varStatus = "no">
<%datanumber++;%>

<div class="subContents_wrapper">
<div class="subbtn_${no.index }" 
	id='uniqueSubbtn_${e.contentno }'
	contentno="${e.contentno }" 
	git_rep="${e.git_repository }" 
	git_id ="${e.git_id }"
	git_pwd="${e.git_pwd }"
	>
	<div class="img_circle_wrapper">
	
<c:set var='output_level' value='${e.level}'/>	
<c:choose>
	<c:when test="${output_level==76}">
		<img src="../img/userimages/${e.git_id }.png" class="img-circle img-circle-Leader">	
	</c:when>
	<c:otherwise>
		<img src="../img/userimages/${e.git_id }.png" class="img-circle img-circle-Follower">	
	</c:otherwise>	
</c:choose>
	</div>
	<div class="img_icon_wrapper">
	<c:choose>
	<c:when test="${output_level==76}">
		<img src="../img/top/leadericon.png"/>
	</c:when>
	<c:otherwise>
		<img src="../img/top/follower_icon.png"/>
	</c:otherwise>
	</c:choose>
	</div>
	<div class="circleandicon_title"><strong>${e.content_title}</strong></div>
	<div class="circleandicon_month">
		 <fmt:formatDate type="both" dateStyle="medium" timeStyle="medium" value="${e.edited_date}" />
           </div>
	<div class="circleandicon_content">
	<span class="leader_icon"></span>
	<span class="follower_icon"></span>
	</div>
</div>
</div>
</c:forEach>
	
<div id='download_applicationBithub'></div>	


<%--hidden files --%>
<input type="hidden" id="datanumberresult" value=100>
<%--hidden files End --%>