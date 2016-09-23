<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<script type="text/javascript" src="../js/bootstrap.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
  $(".glyphicon-tooltip").mouseover(function(){
    $(this).tooltip("show");
  });
  
   $(".alarm-invitation-accept").click(function(event){
    event.preventDefault();
    var groupno = $(this).attr("data-groupno");
	var invitetype = $(this).attr("data-invitetype");
	var invitno = $(this).attr("data-invitno");
	$.ajax({
		type:'GET',
		url : '/Bit_Place/ajax/personal/invitationAcceptFromAlarm.do?groupno='
			+groupno+'&invitetype='+invitetype+'&invitno='+invitno,
		success:function(response){
			alert(response);
		}
	  });	
});
   
   $(".alarm-request-accept").click(function(event){
	    event.preventDefault();
	    var groupno = $(this).attr("data-groupno");
	    var reqno = $(this).attr("data-reqno");
	    var requester = $(this).attr("data-requester");
	    $.ajax({
	      type:'GET',
	      url : '/Bit_Place/ajax/personal/requestAcceptFromAlarm.do?groupno='
	        +groupno+'&reqno='+reqno+'&requester='+requester,
	      success:function(response){
	    	  alert(response);
	      }
	      }); 
	  });
  
  
});

</script>
<c:if test="${!empty data.object1 || !empty data.object2 || !empty data.object3}">
<input type="hidden" id="isData" value="true">
</c:if>

<c:if test="${!empty data}">
	<c:if test="${!empty data.object1}">
		<c:forEach var="m" items="${data.object1}">
			<div class="alarm-body" data-roomno="${m.roomno}" data-groupno="${m.groupno}">
				<div class="alarm-photo"><img  src="${m.photo}" class="alarm-thumnail"></div>
					<span class="alarm-name">
					<label class="alarm-label-Name" >${m.name }</label></span>
					<span class="alarm-date"><fmt:formatDate value="${m.date}" pattern="yyyy-MM-dd"/></span>
					<span class="alarm-content"><span class="glyphicon glyphicon-share-alt"></span>${m.m_content}</span>
			</div>
		</c:forEach>
	</c:if>
	
	<c:if test="${!empty data.object2}">
		<c:forEach var="i" items="${data.object2}"> 
			<div class="alarm-body alarm-invitation-body-${i.invitno}">
				<div class="alarm-photo"><img  src="${i.photo}" class="alarm-thumnail"></div>
			<c:if test="${i.invitetype == 'F'.charAt(0) }">
					<span class="alarm-name" >
					<label class="alarm-label-Name" ><span class="alarm-leader-color">${i.groupname}</span>에서 팔로워 가입 요청 - ${i.name}</label></span>
			</c:if>
			<c:if test="${i.invitetype == 'L'.charAt(0) }">
					<span class="alarm-name">
					<label class="alarm-label-Name"><span class="alarm-leader-color">${i.groupname}</span>에서 리더 요청 - ${i.name}</label></span>
			</c:if>
					<span class="alarm-date"><fmt:formatDate value="${i.date}" pattern="yyyy-MM-dd"/></span>
					<span class="alarm-content"><span class="glyphicon glyphicon-share-alt"></span>${i.content}</span>
			
                    <a class="alarm-accept alarm-invitation-accept glyphicon-tooltip " data-toggle="tooltip" data-placement="top" title="수락" href="#"
                     data-groupno="${i.groupno}" data-invitetype="${i.invitetype}" data-invitno="${i.invitno}">
                    <span class="glyphicon glyphicon-thumbs-up texty2" ></span></a>
            	
			</div>
			</c:forEach>
	</c:if>
	
	<c:if test="${!empty data.object3}">
		<c:forEach var="r" items="${data.object3}">
			<div class="alarm-body alarm-request-body-${r.reqno}">
				<div class="alarm-photo"><img  src="${r.photo}" class="alarm-thumnail"></div>
			
					<span class="alarm-name">
					<label class="alarm-label-Name" >${r.name}님이&nbsp; 
					<span class="alarm-leader-color">${r.groupname}</span>에 팔로워 가입 요청</label></span>
			
					<span class="alarm-date"><fmt:formatDate value="${r.date}" pattern="yyyy-MM-dd"/></span>
					<span class="alarm-content"><span class="glyphicon glyphicon-share-alt"></span>${r.content}</span>
			
                    <a class="alarm-accept alarm-request-accept glyphicon-tooltip " data-toggle="tooltip" data-placement="top" title="수락" href="#"
                    data-groupno="${r.groupno}" data-requester="${r.requester }" data-reqno="${r.reqno}">
                    <span class="glyphicon glyphicon-thumbs-up texty2" ></span></a>
            	
			</div>
		</c:forEach>
	</c:if>
</c:if>