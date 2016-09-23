<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<script src='../js/content/diff.js'></script>    
<style>
#hidden_files{
	display : none;
}

#difference{
    white-space: pre-wrap;
}
</style>
<script type="text/javascript">

/*
 * save the original data in the body
 */


var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight")
editor.getSession().setMode("ace/mode/java");


$('#before').val(editor.getSession().getValue());
$('#after').val(editor.getSession().getValue());

$('#editor').keyup(function(){
	$('#after').val('').val(editor.getSession().getValue());
	updateDifference();
	
	$('#changedDataChecker')
	.html($('#difference').html())
	.css('display','')
	.click(function(){
	    $('#changedDataChecker').css('display','none');	
	    $('#changedDataChecker').css('opacity','1');	
	})
	.hover(function(){
	    $('#changedDataChecker').css('opacity','0.5');}
	,function(){$('#changedDataChecker').css('opacity','1');}
	);
});

/*
 * Create the diff object
 */
var diff = new ML.Text.Diff();

/*
 * Escape text to show as HTML.
 */
var htmlSpecialChars = function(text)
{
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

/*
 * Compute the difference between two strings
 */
function updateDifference()
{
	var theform, difference, before, after, afterPatch;

	theform = document.getElementById('theform');
	difference = {
		mode: theform['mode'].options[theform['mode'].selectedIndex].value,
		patch: true
	};
	before = document.getElementById('before').value;
	after = document.getElementById('after').value;
	afterPatch = {};
	if(diff.formatDiffAsHtml(before, after, difference)
	&& diff.patch(before, difference.difference, afterPatch))
	{
		document.getElementById('difference').innerHTML = difference.html;
		document.getElementById('patch').innerHTML = (after === afterPatch.after ? 'OK: The patched text matches the text after.' : 'There is a BUG: The patched text (<b>' + htmlSpecialChars(afterPatch.after) + '</b>) does not match the text after (<b>' + htmlSpecialChars(after) + '</b>).');
	}
}
</script>
<%--hidden files --%>
<div id='hidden_files'>
<div id ='test'>
<form id="theform">
<div><label for="before">Before</label><br>
<textarea id="before" cols="80" rows="10"></textarea></div>
<div><label for="after">After</label><br>
<textarea id="after" cols="80" rows="10"></textarea></div>


<div><select name="mode">
<option value="c">Character</option>
<option value="w" selected>Word</option>
<option value="l">Line</option>
</select></div>
<div>Patch</div>
<div id="patch" class="frameResults">&nbsp;</div>
</form>
</div>
</div>
<%--hidden files End --%>

<div id="difference" class="frameResults"></div>

<div id='editor'>
${ajax_data }
</div>