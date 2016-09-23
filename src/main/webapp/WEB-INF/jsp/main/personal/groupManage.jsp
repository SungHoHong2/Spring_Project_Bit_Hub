<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet">    
 
<style>
.menue-leader{
width:80px;
margin-left:33px;
}

 .menue-follower{
width:80px;
margin-left:33px;
} 

.group-class{
width: 650px;
height:80px;
margin-left: 140px;
}

.group-header{
position:relative;
border-top: 1px solid #ddd;
border-bottom: 1px solid #ddd;
height:38px; 
background-color: #FAFAFA;
}

.leader{
background-image: url('../img/top/leadericon.png');
background-repeat: no-repeat;
background-size:17px 17px;
padding-left:23px;
}

.follower{
background-image: url('../img/top/follower_icon.png');
background-repeat: no-repeat;
background-size:17px 17px;
padding-left:23px;
}

.group-name{
position:absolute;
top:8px;
left:43px;
width:350px;
text-align: left;

}

.group-deleteOrWithdraw{
position:absolute;
top:10px;
left:426px;
}

.accept{
position:absolute;
top:10px;
left:189px;
font-weight: bold;
color: #0982D9;
}

.notAccept{
position:absolute;
top:10px;
left:195px;
font-weight: bold;
color: #90a1b1;
}

.alarm{
position:absolute;
top:8px;
width:120px;
left:30px;
}

.manager{
position:absolute;
top:10px;
left:195px;
font-weight: bold;
}

.date{
position:absolute;
top:10px;
left:295px;
}


</style>

<script type="text/javascript">
$(document).ready(function(){
	$(".group-deleteOrWithdraw").mouseover(function(){
		$(this).tooltip("show");
	});
	
	$(".group-deleteOrWithdraw").click(function(event){
        event.preventDefault();
        
        var id = $(this).attr("id");
        
        $('#myModal').modal("show");
        modalAddName(id);
        
      });
      
      $("#groupWithdraw").click(function(event){
        event.preventDefault();
        var level = $(this).data("level");
        var groupno = $(this).data("groupno");
        groupWithdraw(level, groupno);
        
      });
	
	$("#btn-group-update").click(function(event){
		event.preventDefault();
		var alarmArray = new Array();
		var count = $("#hidden-count").val();
		for(var i=0; i<count; i++){
			groupno = $("."+i).attr("id");
			if($("."+i).is(":checked")){
				alarm = true;
			}else{
				alarm = false;
			}
			alarmArray.push(groupno+":"+alarm); 
		}
		
		var alarms = alarmArray.toString(); 
		
		$.ajax({
		      type:'GET',
		      url : '/Bit_Place/ajax/personal/alarmChecked.do?alarms='+alarms,
		      success:function(response){
		        alert("success");
		        
		      }
		      }); 
	});
});

function groupWithdraw(level, groupno){


	  if(level=="L"){
	    $.ajax("../ajax/personal/leaderWithdraw.do?groupno=" 
	      + groupno, {
	      type: "GET",
	      dataType: "json",
	      success: function(response) {

	        if (response.status == "success") {
	          $("#myModalLabel").empty();
	          $(".modal-body").empty().html(" 그룹 삭제가 성공되었습니다");
	          $("#cancle_and_confirm").hide();
	          $("#groupWithdraw").click(function(event){
	            event.preventDefault();
	            location.reload();
	            });
	          } else {
	            $("#myModalLabel").empty();
	            $(".modal-body").empty().html("그룹 삭제가 실패하였습니다");
	            $("#groupWithdraw").hide();
	            $("#cancle_and_confirm").empty().html("확인");
	          
	        }
	      }
	    });
	  }//L
	  else{
	    $.ajax("../ajax/personal/followerWithdraw.do?groupno=" 
	        + groupno,{
	          type: "GET",
	          dataType: "json",
	          success: function(response) {
	        	  
	        	  if (response.status == "success") {
	    	          $("#myModalLabel").empty();
	    	          $(".modal-body").empty().html(" 그룹 탈퇴가 성공되었습니다");
	    	          $("#cancle_and_confirm").hide();
	    	          $("#groupWithdraw").click(function(event){
	    	            event.preventDefault();
	    	            location.reload();
	    	            });
	    	          } else {
	    	            $("#myModalLabel").empty();
	    	            $(".modal-body").empty().html("그룹 탈퇴가 실패하였습니다");
	    	            $("#groupWithdraw").hide();
	    	            $("#cancle_and_confirm").empty().html("확인");
	    	          
	    	        }
	              
	          }
	        });
	  }//f
	}

	function modalAddName(id){
	  var btnId = id ;
	  
	  var datas = btnId.split("-");
	  
	  $("#groupWithdraw").data("groupno", datas[0]);
	  $("#groupWithdraw").data("level", datas[1]);
	  
	  if(datas[1]=="L"){
	    $("#myModalLabel").empty().html(datas[2])
	    .css("background-image", "url('../img/top/leadericon.png')")
	    .css("padding-left", "27px").css("background-repeat", "no-repeat");
	    $(".modal-body").empty().html("삭제를 하시겠습니까?");
	  }
	  else{
	    $("#myModalLabel").empty().html(datas[2])
	    .css("background-image", "url('../img/top/follower_icon.png')")
	    .css("padding-left", "27px").css("background-repeat", "no-repeat");
	    $(".modal-body").empty().html("탈퇴를 하시겠습니까?"); 
	  }
	  
	}
</script>


    <label class="col-sm-2 menue-leader"><span class="texty2">리더</span></label>
    <%int count=0; %>  
	<c:forEach var="l" items="${data.object1}">
	<c:if test="${l.level=='L'.charAt(0)}">
	<div class="form-group">
    <div class="group-class">
    <div class="col-sm-9 group-header">
    <label class="col-sm-2 group-name leader">${l.groupname }</label>
    <c:if test="${l.creator == l.memno}">
    <a href="#"><span class="group-deleteOrWithdraw glyphicon glyphicon-trash texty2" 
    id="${l.groupno}-${l.level}-${l.groupname }"
    data-toggle="tooltip" data-placement="top" title="그룹삭제"></span></a>
    </c:if>
    </div>
    <label class="col-sm-2"></label>
    <div class="col-sm-9">
    <span class="alarm">알림설정:
   	<c:if test="${l.alarm==true}">
    <input type="checkbox" name="alarm" class="<%=count %>" id="${l.groupno}" checked>
    </c:if>
    <c:if test="${l.alarm==false}">
    <input type="checkbox" name="alarm" class="<%=count %>" id="${l.groupno}">
    </c:if>
   	</span>
    <span class="manager">관리자</span>
    <span class="date">그룹생성일:&emsp;<fmt:formatDate value="${l.reg_date}" pattern="yyyy-MM-dd"/></span>
    </div>
    </div>
    </div>
  <%count++; %>
</c:if>
</c:forEach> 
 
<br>
 <div class="form-group"></div>
 
  <label class="col-sm-2 menue-follower"><span class="texty2">팔로워</span></label>
	<c:forEach var="f" items="${data.object1}">
	<c:if test="${f.level=='F'.charAt(0)}">   
	<div class="form-group">
    <div class="group-class">
    <div class="col-sm-9 group-header" id="header-1">
    <label class="col-sm-2 group-name follower">${f.groupname }</label>
    
    <a href="#"><span class="group-deleteOrWithdraw glyphicon glyphicon-log-out texty2" id="${f.groupno}-${f.level}-${f.groupname }"
    data-toggle="tooltip" data-placement="top" title="그룹탈퇴"></span></a>
   
    </div>
    <label class="col-sm-2"></label>
    <div class="col-sm-9">
    <span class="alarm">알림설정:
   	<c:if test="${f.alarm==true}">
    <input type="checkbox" name="alarm" class="<%=count %>" id="${f.groupno}" checked>
    </c:if>
    <c:if test="${f.alarm==false}">
    <input type="checkbox" name="alarm" class="<%=count %>" id="${f.groupno}">
    </c:if>
   	</span>
    <span class="accept">승인확인</span>
    <span class="date">그룹가입일:&emsp;<fmt:formatDate value="${f.reg_date}" pattern="yyyy-MM-dd"/></span>
    </div>
    </div>
    </div>
<%count++; %>
</c:if>
</c:forEach>

<c:forEach var="f" items="${data.object2}">
	<div class="form-group">
    <div class="group-class">
    <div class="col-sm-9 group-header" id="header-1">
    <label class="col-sm-2 group-name follower">${f.groupname }</label>
    
    </div>
    <label class="col-sm-2"></label>
    <div class="col-sm-9">
    
    <span class="accept">미승인</span>
    <span class="date">그룹신청일:&emsp;<fmt:formatDate value="${f.date}" pattern="yyyy-MM-dd"/></span>
    </div>
    </div>
    </div>
</c:forEach>


<input type="hidden" value="<%=count %>" id="hidden-count">
  