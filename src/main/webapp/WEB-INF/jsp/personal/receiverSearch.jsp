<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<style>
.search-thumnail{
width:36px;
height:38px;
}
.searchPhoto{
display:inline;
float:left;
margin-left:8px;
margin-top:4px;
}
.searchName{
width:560px;
height:42px;
float:right;
margin-top:2px;
}
.label-Name{
padding:9px;
float:left;
}
.searchBody{
height:50px;
border-bottom:1px solid #ddd;
}

.searchBody:first-of-type{
border-top:1px solid #ddd;
}

.searchBody:hover{
background-color: #F3F2FA;
cursor: pointer;
}

.label-Name:hover{
cursor: pointer;
}

</style>

<script type="text/javascript">
$(document).ready(function(){
	

	$(".searchBody").click(function(){
		var name = $(this).attr("data-name");
		var memno = $(this).attr("id");
		$("#message-receiver").val(name).attr("readonly", true);
		$("#btnMessageSend").removeData("participant");
		$("#btnMessageSend").data("participant", new Array());
		$("#btnMessageSend").data("participant").push(memno);
		$("#research-result").empty();
	});
});
</script>


<c:forEach var="r" items="${data}">
<div class="searchBody" id=${r.memno } data-name=${r.name }>
	<div class="searchPhoto"><img  src=${r.photo } class="search-thumnail"></div>
	<div class="searchName">
	<label class="label-Name" > ${r.name }</label></div>
</div>

</c:forEach>



