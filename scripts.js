function parseFloatWeakly(str) {
	parsed = parseFloat(str)
	console.log(parsed, parsed !== parsed)
	return parsed === parsed ? parsed : 0
}

function calc() {
	clearOutput()

	var in1 = document.getElementById("in1").value;
	var in2 = parseFloatWeakly(document.getElementById("in2").value);
	var in3 = parseFloatWeakly(document.getElementById("in3").value);
	var in4 = parseFloatWeakly(document.getElementById("in4").value);
	var in5 = parseFloatWeakly(document.getElementById("in5").value);
	var in6 = parseFloatWeakly(document.getElementById("in6").value);

	console.log(in2, in3, in4, in2 + in3 + in4)
	if (in2 + in3 + in4 != 100) {
		document.getElementById("percentage-error").innerText = "Проценты жизнеспособной опухоли, некроза и стромы должны складываться до 100%. Сейчас они складываются до " + (in2 + in3 + in4);
	}
}

function clearOutput() {
		document.getElementById("percentage-error").innerText = "";
}
