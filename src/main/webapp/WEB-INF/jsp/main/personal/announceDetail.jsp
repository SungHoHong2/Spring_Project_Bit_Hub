<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<link rel="stylesheet" href="../css/input.css">
    
<script type="text/javascript" src='../js/personal_groupAdmin.js'></script>
<script type="text/javascript" src="../js/bootstrap.min.js"></script>

<script type="text/javascript">

</script>

<div id="title_content">
   <p id="content_title_text"><img src="../img/content/write_icon.png"><span id="texty">공지/자료</span></p>
</div>

<div id="announce-detail-wrap">
<div id="announce-title">${data.title}</div>
<div id="announce-info"><span id="announce-writer">${data.name}</span><span id="announce-read">조회${data.count }</span>
<fmt:formatDate value="${data.created_date}" pattern="yyyy.MM.dd hh:mm.ss"/></div>
<div id="announce-content">${data.m_content}</div>
<div id="annouce-download" >파일 첨부</div>

<c:forEach var="f" items="${data.object1}">
<a href="../files/${f.updata_path }/${f.updata}" download="${f.updata}" class="file-download">${f.updata}</a></br>
</c:forEach>

</div>