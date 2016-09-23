<%@ page import="com.google.gson.Gson"%>
<%@ page import="bitplace.vo.Bean"%>
<%@ page import="java.util.List"%>
<%@ page language="java" 
    contentType="text/plain; charset=UTF-8"
    pageEncoding="UTF-8"
    trimDirectiveWhitespaces="true"%>
<%
List<Bean> memberName = (List<Bean>)request.getAttribute("data");
%>
<%=new Gson().toJson(memberName)%>



