<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%--         
SELECT INVITNO, GROUPNO, INVITERNO, INVITETYPE FROM INVITATION WHERE MEMNO=6;
 --%>
<div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">초대권</span></label>
    <div class="col-sm-9">
        	<%int invitationCount=0; %>
    	<c:forEach items="${data }" var="e" varStatus="no">
    	<%invitationCount++; %>
    	 <div id='invite_box_${no.index}'>     
    	        	<table>
     		<tr>
     			<td>
     			   ${e.invitno }		
     			</td>
     			<td>
     			   ${e.groupno }	
     			</td>
     			<td>
     			   ${e.inviterno }	
     			</td>
     			<td>
     			   ${e.invitetype }
     			</td>
     			<td>
     			<button type='button' 
     			   class='form-data' 
     			   id='invite_btn_${no.index }' 
     			   invitno='${e.invitno }'
     			   groupno='${e.groupno }'
     			   divid='invite_box_${no.index }'>승인</button>
     			</td>
     		</tr>
     		</table>
     	</div>	
	</c:forEach>
	<input type="hidden" value="<%=invitationCount%>" id='invitationCount'>
    </div>
</div>
<div class="form-group">
    <label class="col-sm-2 control-label"><span class="texty2">초대중</span></label>
    <div class="col-sm-9">
      <textarea class="form-control">
      </textarea>
    </div>
</div>   