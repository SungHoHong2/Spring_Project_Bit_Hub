<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<style>
#hidden_files{
display : none;
}
</style>


<script type="text/javascript">

var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight")
editor.getSession().setMode("ace/mode/java");

$('#editor').keyup(function(){
	$('#after').val('').val(editor.getSession().getValue());
});

</script>

<div id='editor'>
${ajax_data }
</div>

<div id='hidden_files'>
<textarea id="after" cols="80" rows="10"></textarea>
</div>

