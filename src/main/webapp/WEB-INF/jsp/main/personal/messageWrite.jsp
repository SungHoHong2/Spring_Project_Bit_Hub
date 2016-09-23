<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<style>

.menue-header{
float:left;
font-size: 120%;
margin-left: 15px;
margin-top: 5px;

}

.container-header{
height:40px;
border-bottom:1px solid #ddd;
}

#research-result{
max-height: 430px;
overflow: auto;
}

#write-body{
height:700px;
position:relative;
margin-top: 15px;
}

.dropdown{
display:inline-block;
margin-left:5px;
}
#dropdown-box{
float:left;
margin-right:10px;
}

#search-box{
margin-left:15px;
width:600px;
}
.text2{
width:590px;
}
#btn-reset{
float:left;
margin-left:10px;
}
.select{
width:100px;
height: 28px;
font-size: 12px;
display:inline;
float:left;
margin-left:13px;
}

#group-select{
width:120px;
}

#writeText{
width: 602px;
height:80px;
margin-top:12px;
margin-left:9px;
}

#messageWriteBox{

position:absolute;
top:500px;
border-top: 1px groove;
border-bottom: 1px solid #eee;
background-color: #E3EAFC;
height:146px;
width:620px;
}

#btnMessageSend{
float:right;
margin-right:13px;
margin-top:8px;
}


<!-- --- -->



    body::-webkit-scrollbar {
        width: 12px;
    }
 
    
    /* Let's get this party started */
    ::-webkit-scrollbar {
        width: 6px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
/*        -webkit-border-radius: 10px;
        border-radius: 10px;*/
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
/*        -webkit-border-radius: 10px;
        border-radius: 10px;*/
        background:#ddd; 
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
    }
    ::-webkit-scrollbar-thumb:window-inactive {
        background: #ddd; 
    }


</style>
<script type="text/javascript">
$(document).ready(function(){

frm.messageReceiver.focus();
$("#btnMessageSend").data("groupno", 0);

$("#message-receiver").keyup(function(){
	 var search = $(this).val();
	 if(search!=""){
	 $.ajax({
		type:'GET',
		url : '/Bit_Place/ajax/personal/receiverSearch.do?search='+ search,
		success:function(response){
			$("#research-result").empty().append(response);
				
		}
	  });
	 }else{
		 $("#research-result").empty(); 
	 }
	  
});

$("#message-select").change(function(){
	if($('option:eq(0)').is(":selected")){
		$("#group-select").hide();
		frm.messageReceiver.value="";
		frm.messageReceiver.focus();
		$("#message-receiver").removeAttr("readonly");
		$("#btnMessageSend").removeData("participant");
		$("#btnMessageSend").removeData("groupno");
		$("#btnMessageSend").data("groupno", 0);
	}else{
		 $.ajax({
			type:'GET',
			url : '/Bit_Place/ajax/personal/getGroupname.do',
			success:function(response){
				$("#group-select").empty()
				.append(response).show();
					
			}
		  }); 
	}
	
});

$("#group-select").change(function(){
	frm.messageReceiver.value="";
	$("#message-receiver").removeAttr("readonly");
  $("#btnMessageSend").removeData("participant");
  $("#btnMessageSend").removeData("groupno");
  
	var groupno = $("#group-select option:selected").val();
	$("#btnMessageSend").data("groupno", groupno);
	
	 $.ajax({
			type:'GET',
			dataType:'json',
			url : '/Bit_Place/ajax/personal/getGroupMembersName.do?groupno='+ groupno,
			success:function(response){
				var names = "";
				$("#btnMessageSend").data("participant", new Array());
				for(var i in response){
					names += response[i].name;
					$("#btnMessageSend").data("participant").push(response[i].memno);
				}
				$("#message-receiver").val(names).attr("readonly", true);
			}
		  }); 
});

$("#btn-reset").click(function(){
	frm.messageReceiver.value="";
	frm.messageReceiver.focus();
	$("#message-receiver").removeAttr("readonly");
	$("#btnMessageSend").removeData("participant");
	
}); 


$('#writeText').keyup(function(){
	var messageContent = $(this).val();
	var receiver= $("#btnMessageSend").data("participant");
	
  if(messageContent !="" && receiver != null){
		$("#btnMessageSend").removeAttr("disabled");
	}else{
		$("#btnMessageSend").attr("disabled", true)
	}
});

 $("#btnMessageSend").click(function(event){
	 event.preventDefault();
	 var messageContent=$("#writeText").val().replace(/\n/g, '<br>');
	var receiver = $(this).data("participant");
	var receiver2 = receiver.toString();
	var groupno = $(this).data("groupno");
		  $.ajax('/Bit_Place/ajax/personal/messageSend.do?messageContent='
				  +messageContent+"&receiver="+receiver2+"&groupno="+groupno, {
		  type: "GET",
		  
		  success: function(response) {
		    $("#message-content").empty().append(response);
		  }
		  });      
});
  


});


</script> 
 <div class="container-header">
  <label class="menue-header">쪽지 쓰기</label>
 </div>
<div id="write-body">
<div id="select-box">
<select class="form-control select" id="message-select">
  <option>개인쪽지</option>
  <option>그룹쪽지</option>
</select>
<select class="form-control select" id="group-select" name="groupSel" style="display:none;">
</select>

</div>

<button type="button" class="btn btn-default btn-sm" id="btn-reset">재입력</button>
<br><br>
<div class="form-group" id="search-box">
<input id="message-receiver" class="form-control text2" name="messageReceiver" 
  type="text" placeholder="받는사람" autocomplete="off">
</div>

<div id="research-result">
</div>

<div id="messageWriteBox">
	<textarea id="writeText" class="form-control" name="writeText" rows="3"></textarea>
	<button id="btnMessageSend" type="submit" 
      class="btn btn-primary" disabled>쪽지보내기</button>
</div>
</div>

