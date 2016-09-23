<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%int content_commitinfo_btn_num = 0; %>


<c:forEach items="${ajax_data }" var ="e" varStatus="no">
<% content_commitinfo_btn_num++; %>
<div class="content_commitinfo">
<span class="content_commitinfo_img"><img src="../img/content/commiticon.png"></span>
<span class="content_commintinfo_btn_${no.index }" id="${e }">${no.index }번째 커밋</span>
</div>
</c:forEach>
<input type="hidden" value="<%=content_commitinfo_btn_num %>" id="content_commitinfo_btn_num">

