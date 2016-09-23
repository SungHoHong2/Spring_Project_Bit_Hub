<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>    
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="../js/logged/tagcanvas.js"></script>

<style>
.tagsWrapper{
	display : none;
}	
</style>

   <script type="text/javascript">
        if(!$('#myCanvas').tagcanvas({
          textColour: 'white',
          outlineColour: '#ffffff',
          reverse: true,
          depth: 0.8,
          maxSpeed: 0.05,
          wheelZoom	: false,
          size : 3	
        },'tags')) {
          // something went wrong, hide the canvas container
          $('#myCanvasContainer').hide();
        }
   </script>
 
    <div id="myCanvasContainer" align="center">
      <canvas width="300" height="300" id="myCanvas">
        <p>Anything in here will be replaced on browsers that support the canvas element</p>
      </canvas>
    </div>
    
   
    <div id="tags" class="tagsWrapper">
       <ul>    
    	<c:forEach items="${data }" var="e">
        		<li><a href=#>${e.git_id }</a></li>
        		<li><a href=#>${e.name }</a></li>
        		<li><a href=#>${e.email }</a></li>		
    	</c:forEach>
      </ul>
    </div>



