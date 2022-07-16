function parseFloatWeakly(str) {
	parsed = parseFloat(str)
	console.log(parsed, parsed !== parsed)
	return parsed === parsed ? parsed : 0
}

function calc() {
	clearOutput()

	var in1 = document.getElementById("in1").checked;
	var in2 = parseFloatWeakly(document.getElementById("in2").value);
	var in3 = parseFloatWeakly(document.getElementById("in3").value);
	var in4 = parseFloatWeakly(document.getElementById("in4").value);
	var in5 = parseFloatWeakly(document.getElementById("in5").value);
	var in6 = parseFloatWeakly(document.getElementById("in6").value);

	console.log(in2, in3, in4, in2 + in3 + in4)
	if (in2 + in3 + in4 != 100) {
		showPercentageError(in2 + in3 + in4)
		return
	}
	remaining_cells = (in6/100)/in5
	reaction = ((in2/100) + remaining_cells) / 2
	document.getElementById("var-cells").innerHTML = remaining_cells
	document.getElementById("var-react").innerHTML = reaction
	document.getElementById("prognosis").innerHTML = prognosis(in1, reaction)
}

function clearOutput() {
	document.getElementsByClassName("error")[0].style.display = "none";
	document.getElementById("var-cells").innerHTML = "N/A";
	document.getElementById("var-react").innerHTML = "N/A";
	document.getElementById("prognosis").innerHTML = "N/A";
}

function showPercentageError(percentage) {
	document.getElementsByClassName("error")[0].style.display = "inherit";
	document.getElementById("percentage-error").innerHTML = "Компоненты «ложа опухоли» должны в сумме составлять 100%.</br>Сейчас они составляют " + percentage + "%.";

}

function prognosis(adenocarcinoma, reaction) {
	if (reaction == 0) {
		return "pCR"
	} else {
		if (adenocarcinoma) {
			if (reaction <= 0.65) {
				return "MPR"
			} else {
				return "недостаточный ответ"
			}
		} else {
			if (reaction <= 0.1) {
				return "MPR"
			} else {
				return "недостаточный ответ"
			}
		}
	}
}
