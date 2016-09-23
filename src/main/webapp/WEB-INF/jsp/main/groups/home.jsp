<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>    
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link rel="stylesheet" type="text/css" href="../css/logged.css">
<script type="text/javascript" src='../js/content/underScore.js'></script>
<script type="text/javascript" src='../js/content/gh3.js'></script>
<script type="text/javascript" src='../js/logged.js'></script>


<div id='character'>
<img src='../img/content/searchicon_animation.gif' width="75px" height = "70px">
</div>

<div id='logged_search_wrapper'>
<div id='logged_search_bar'>
<input type='text' id='logged_searchData' size="20">
<select id='searchType'>
<option value='repo'>저장소</option>
<option value='user'>사용자</option>
</select>

</div>
<div id='logged_search_btn'>검 색</div>
</div>

<div id='logged_search_wrapper_back'>background</div>


<div id='logged_recent_Action'>
Recent Action
</div>

<input id='memNo' type='hidden' value='${memNo }'>
<input type='hidden' id='startingPage' value=1>

<div id=logged_background></div>

<div id='logged_output'></div>


<%-- search Result Display  --%>

<div id='logged_white_shadow'></div>
<div id='logged_searchResults'>
<ul id='logged_searchResults_Ul'></ul>
</div>

<%-- search Result End  --%>


<div id='logged_white'>
<div id='addmoreResults'>파일 더 추가하기 </div>
</div>