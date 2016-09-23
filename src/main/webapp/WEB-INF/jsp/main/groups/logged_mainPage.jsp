<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src='../js/content/jquery.jqdock.js'></script>


<script type="text/javascript">
var dockOptions =
{ align: 'middle' // horizontal menu, with expansion UP/DOWN from the middle
, labels: 'tr' // add labels (override the 'tl' default)
, size : 20 
};
// .6 items - size : 60
$('#menu').jqDock(dockOptions);
</script>

<%int pageNum =0; %>
<div id='page'>
  <div id='menu'>
  <c:forEach items="${ajax_data }" var="e" varStatus='no'>
<%pageNum++; %>
<img src='../img/userimages/${e.git_id }.png' class='logged_display_image' 
contentno='${e.contentno }'
git_id='${e.git_id }'
git_rep='${e.git_repository }'
git_pwd='${e.git_pwd }'
commitsha='${e.commitsha }'
title='${e.content_title }'>
</c:forEach>   
  </div>
</div>

<input type='hidden' id='logged_pageNum' value=<%=pageNum %>>

 

 
 
 
 