<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<script type="text/javascript">
$(document).ready(function(){
	$(".msg-wrap").scrollTop(1300);
});
</script>

	<c:if test="${data.today == true }">
		<div class="alert alert-info msg-date">
           <strong>Today</strong></div>
    </c:if>
	
		<div class="media msg">
			<a class="pull-left" href="#"> <img class="media-object"
				data-src="holder.js/64x64" alt="64x64"
				style="width: 35px; height: 35px;" src="${data.photo }">
			</a>
			<div class="media-body">
				<small class="pull-right time"><i class="fa fa-clock-o"></i>
					<fmt:formatDate value="${data.date}" pattern="yyyy-MM-dd hh:mm:ss" /></small>

				<h5 class="media-heading">${data.name }</h5>
				<small class="col-lg-10 message-content">${data.m_content }</small>
			</div>
		</div>



