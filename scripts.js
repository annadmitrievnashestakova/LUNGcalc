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
		document.getElementById("percentage-error").innerHTML = "Проценты жизнеспособной опухоли, некроза и стромы должны складываться до 100%.</br>Сейчас они складываются до " + (in2 + in3 + in4) + "%.";
		return
	}
	remaining_cells = (in6/100)/in5
	reaction = ((in2/100) + remaining_cells) / 2
	document.getElementById("var-cells").innerHTML = "Оставшихся клеток по лимфоузлам: " + remaining_cells
	document.getElementById("var-react").innerHTML = "Ответ опухоли на терапию: " + reaction
	document.getElementById("prognosis").innerHTML = "Группа прогноза: " + prognosis(in1, reaction)
}

function clearOutput() {
		document.getElementById("percentage-error").innerHTML = "";
		document.getElementById("var-cells").innerHTML = "";
		document.getElementById("var-react").innerHTML = "";
		document.getElementById("prognosis").innerHTML = "";
}

function prognosis(adenocarcinoma, reaction) {
	if (reaction == 0) {
		return "pCR"
	} else {
		if (adenocarcinoma) {
			if (reaction <= 0.65) {
				return "mCR"
			} else {
				return "недостаточный ответ"
			}
		} else {
			if (reaction <= 0.1) {
				return "mCR"
			} else {
				return "недостаточный ответ"
			}
		}
	}
}
