var count = 2;

function add_criteria() {
  var wrapper = document.getElementById('wrapper');
  var newChild = document.createElement('div');
  newChild.innerHTML = '<h3>Criteria</h3><select name="criteria'+count+'"><option value=""></option><option value="Guiding">Guiding</option><option value="Low Chair">Low Chair</option><option value="Mark Time">Mark Time</option><option value="High Chair">High Chair</option><option value="Flanks">Flanks</option></select><h3>Change</h3><input name="change'+count+'" type="radio" value="Better">Better<br><input name="change'+count+'" type="radio" value="Worse">Worse<br><h3>Comments (optional)</h3><textarea id="comments'+count+'" name="comments'+count+'" rows="4" cols="25" maxlength="100" onkeydown="updateCharCount(this.name)"></textarea><br><hr>'
  wrapper.appendChild(newChild);
  addValidateListener(document.getElementById('comments'+count))
  var val = document.getElementById("counter");
  val.setAttribute('value', count);
  count++;
}

function addValidateListener(elementTextArea) {
  elementTextArea.addEventListener('keydown',function() {
    elementTextArea.value = elementTextArea.value.replace(";", "");
  });
}
