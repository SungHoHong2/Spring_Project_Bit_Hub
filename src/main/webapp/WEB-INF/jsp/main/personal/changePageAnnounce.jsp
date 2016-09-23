<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<link rel="stylesheet" href="../css/input.css">
    
<script type="text/javascript" src='../js/personal_groupAdmin.js'></script>
<script type="text/javascript" src="../js/bootstrap.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	$(".announceDetail").click(function(event){
        event.preventDefault();
        var leadno = $(this).attr("data-leadno");
        $.ajax({
          type: 'GET',
          url : '/Bit_Place/ajax/personal/announceDetail.do?leadno='+leadno,
          success:function(response){
            $("#body_output").empty().append(response);
            
          }
        });
        
      });
	
	$(".page").click(function(event){
        event.preventDefault();
        var index = $(this).attr("data-index");
        var groupno = $("#groupno").val();
        $(".page").not(this).css("color", "black").css("text-decoration", "");
        $(this).css("color", "blue").css("text-decoration", "underline");
        
        $.ajax({
          type: 'GET',
          url : '/Bit_Place/ajax/personal/changeViewAnnounce.do?groupno='+groupno+"&index="+index,
          success:function(response){
            $("#announce-table-body").empty().append(response);
            
          }
        });
        
      });
	
	$(".pageSize").click(function(event){
        event.preventDefault();
        var groupno = $("#groupno").val();
        var pageName = $(this).attr("data-pageName");
        var page = $(this).attr("data-page");
        var pageSize = $(this).attr("data-pageSize");
        var totalSize = $(this).attr("data-totalSize");
        if(pageName == "prev"){
        	--page;
        }else{
        	++page;
        }
        
        $.ajax({
          type: 'GET',
          url : '/Bit_Place/ajax/personal/changePageAnnounce.do?groupno='+groupno+
          "&page="+page+"&pageSize="+pageSize+"&pageName="+pageName+"&totalSize="+totalSize,
          success:function(response){
            $("#body_output").empty().append(response);
            if(pageName == "prev"){
            	$(".page").eq(2).css("color", "blue").css("text-decoration", "underline");
              }else{
            	  $(".page").eq(0).css("color", "blue").css("text-decoration", "underline");
              }
            
          }
        });
        
      });
});
</script>


<div id="title_content">
   <p id="content_title_text"><img src="../img/content/write_icon.png"><span id="texty">공지/자료</span></p>
</div>

<% //form  %>
<div id="form_wrapper" class="form-wrap">
<form name="frm" class="form-horizontal" role="form"  method="POST" id='frm'>
  
  <input type="hidden" class="form-control" name='memno' id="memno" value="">
  <input type="hidden" class="form-control" id="groupno" value="${data.object1[0].groupno}">
  <input type="hidden" class="form-control" id="git_id" value="">
  <input type="hidden" class="form-control" id="git_pwd" value="">
  <input type='hidden' id='truefalse' value='true'>
  
  <div id='input_page'>
  <div id="announce-table-body">
  <table class="table">
    <tr >
      <th>번호</th>
      <th width="320px">
      <div class="align">
      제목
      </div>
      </th>
      <th>작성자</th>
      <th>작성일</th>
      <th>조회수</th>
    </tr >
  <c:forEach var="a" items="${data.object1}">
    <tr class="announceSummary">
      <th>${a.no}</th>
      <th>
      <a href="#" class="announceDetail" data-leadno="${a.leadno}">
      ${a.title}</a></th>
      <th>${a.name }</th>
      <th><fmt:formatDate value="${a.created_date}" pattern="yyyy-MM-dd"/></th>
      <th>${a.count }</th>
    </tr> 
  </c:forEach>
  </table>
  </div>
  <c:choose>
  <c:when test="${data.page == 1}">
  [이전]
  </c:when>
  <c:otherwise>
  <a href="#" class="pageSize" data-pageName="prev" data-page="${data.page}" data-pageSize="${data.pageSize}" data-totalSize="${data.totalSize}">
    [이전]
    </a>
  </c:otherwise>
  </c:choose>
  
  <c:forEach var="i" items="${data.object2}">
    <a href="#" class="page" data-index="${i}">
    ${i}
    </a>
  </c:forEach>
    
  <c:choose>
  <c:when test="${data.page == data.pageSize}">
  [다음]
  </c:when>
  <c:otherwise>
  <a href="#" class="pageSize" data-pageName="next" data-page="${data.page}" data-pageSize="${data.pageSize}" data-totalSize="${data.totalSize}">
    [다음]
    </a>
  </c:otherwise>
  
  </c:choose>
  
  </div>   
  
  
</form>
</div>