$(document).ready(function() {
  var commentBox = document.getElementById("comments");
  commentBox.addEventListener("keydown", updateCharCount());
})

function updateCharCount(name) {
  // this key is the button pressed
  var num = name.charAt(8);
  var key = event.keyCode || event.charCode;
  var location = "chars"+num;
  var currentValue = parseInt(document.getElementById(location).innerHTML);
  if (key && (key == 8 || key == 46)) {
	if(currentValue + 1 > 100)
		return;
    document.getElementById(location).innerHTML = currentValue + 1;
  } else if (key) {
	if(currentValue - 1 < 0)
		return;
    document.getElementById(location).innerHTML = currentValue - 1;
  }
}

var count = 2;

function add_criteria() {
	document.getElementById('wrapper').innerHTML += 
	'<h3>Criteria</h3><select name="criteria'+count+'"><option value=""></option><option value="Guiding">Guiding</option><option value="Low Chair">Low Chair</option><option value="Mark Time">Mark Time</option><option value="High Chair">High Chair</option><option value="Flanks">Flanks</option></select><h3>Change</h3><input name="change'+count+'" type="radio" value="Better">Better<br><input name="change'+count+'" type="radio" value="Worse">Worse<br><h3>Comments (optional)</h3><textarea id="comments'+count+'" name="comments'+count+'" rows="4" cols="25" maxlength="100" onkeydown="updateCharCount(this.name)"></textarea><br><br><span id="chars'+count+'">100</span> characters remaining.<br><hr>'
	document.getElementById("counter").value = count;
	count++;
}