var count = 2;

function add_criteria() {
  var wrapper = document.getElementById('wrapper');
  var newChild = document.createElement('div');
  newChild.innerHTML = '<h3>Criteria</h3><select id="criteria'+count+'" name="criteria'+count+'"><option value=""></option><option value="Guiding">Guiding</option><option value="Low Chair">Low Chair</option><option value="Mark Time">Mark Time</option><option value="High Chair">High Chair</option><option value="Flanks">Flanks</option></select><h3>Change</h3><input id="change'+count+'B" name="change'+count+'" type="radio" value="Better">Better<br><input id="change'+count+'W" name="change'+count+'"W"" type="radio" value="Worse">Worse<br><h3>Comments (optional)</h3><textarea id="comments'+count+'" name="comments'+count+'" rows="4" cols="25" maxlength="100" onkeydown="updateCharCount(this.name)"></textarea><br><hr>';
  wrapper.appendChild(newChild);
  addValidateListener(document.getElementById('comments'+count));
  var val = document.getElementById("counter");
  val.setAttribute("value", count);
  count++;
}

function addValidateListener(elementTextArea) {
  elementTextArea.addEventListener('keydown',function() {
    elementTextArea.value = elementTextArea.value.replace(";", "");
  });
}

function checkValidForm() {
	var currentLeader = document.getElementById("leader");
	var currentAuditionee = document.getElementById("student");
	var auditioneeValue = currentAuditionee.value;
	var isValidForm = true;
	if (currentLeader.value.localeCompare("") == 0) {
		if (document.getElementById("leaderError") == null) {
			var leaderError = document.createElement('div');
			leaderError.innerHTML = '<font id="leaderError" color="red"><b>Please enter a student leader</b></font>';
			document.body.appendChild(leaderError);
		}
		isValidForm = false;
	} else {
		if (document.getElementById("leaderError") != null) {
			var error = document.getElementById("leaderError");
			error.parentNode.removeChild(error);
		}
	}


	if (auditioneeValue.trim().localeCompare("") == 0) {
		if (document.getElementById("auditioneeError") == null) {
			var auditioneeError = document.createElement("div");
			auditioneeError.innerHTML = '<font id="auditioneeError" color="red"><b>Please enter a student</b></font>';
			document.body.appendChild(auditioneeError);
		}
		isValidForm = false;
	} else {
		if (document.getElementById("auditioneeError") != null) {
			var auditErr = document.getElementById("auditioneeError");
			auditErr.parentNode.removeChild(auditErr);
		}
	}
	var hasEmptyCriteria = false;
	var hasEmptyChange = false;

	for ($i=1; $i<count; $i++) {
		var currentCriteria = document.getElementById("".concat('criteria', $i));
		var currentChangeB = document.getElementById("".concat("change", $i, "B"));
		var currentChangeW = document.getElementById("".concat("change", $i, "W"));
		var val = currentCriteria.value;
		if (currentCriteria.value.localeCompare("") == 0) {
			hasEmptyCriteria = true;
			if (document.getElementById('criteriaError') == null) {
				var criteriaError = document.createElement('div');
				criteriaError.innerHTML = '<font id="criteriaError"'+count+' color="red"><b>Please select criteria</b></font>';
				document.body.appendChild(criteriaError);
			}
			isValidForm = false;
		}

		if (!currentChangeB.checked && !currentChangeW.checked) {
			hasEmptyChange = true;
			if (document.getElementById('changeError') == null) {
				var changeError = document.createElement('div');
				changeError.innerHTML = '<font id="changeError"'+count+' color="red"><b>Please select a change</b></font>';
				document.body.appendChild(changeError);
			}
			isValidForm = false;
		}
	}

	if (document.getElementById("changeError") != null && !hasEmptyChange) {
		var changeErr = document.getElementById("changeError");
		changeErr.parentNode.removeChild(changeErr);
	}

	if (document.getElementById("criteriaError") != null && !hasEmptyCriteria) {
		var critErr = document.getElementById("criteriaError");
		critErr.parentNode.removeChild(critErr);
	}
  if (isValidForm)
    document.cookie = "leader=" + currentLeader.value;
  return isValidForm;
}

function readCookie() {
    var nameEQ = "leader=";
    var ca = document.cookie;
    if (ca.localeCompare("") == 0)
      return null;
    var c = ca.substring(nameEQ.length,ca.length);
    return c;
}

function getCookie() {
  var cachedLeader = readCookie();
  if (cachedLeader == null)
		return null;
  var sel = document.getElementById("leader");
  var opts = sel.options;
	for (var opt, j = 0; opt = opts[j]; j++) {
		var sub = cachedLeader.substring(0, cachedLeader.indexOf(";"));
		if (opt.value === sub) {
			sel.selectedIndex = j;
			break;
		}
  }
}
