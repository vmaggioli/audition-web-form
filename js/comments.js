$(document).ready(function() {
  var commentBox = document.getElementById("comments");
  commentBox.addEventListener("keydown", updateCharCount());
})

function updateCharCount() {
  // this key is the button pressed
  var key = event.keyCode || event.charCode;
  var currentValue = parseInt(document.getElementById("chars").innerHTML);
  if (key && (key == 8 || key == 46)) {
	if(currentValue + 1 > 100)
		return;
    document.getElementById("chars").innerHTML = currentValue + 1;
  } else if (key) {
	if(currentValue - 1 < 0)
		return;
    document.getElementById("chars").innerHTML = currentValue - 1;
  }
}
