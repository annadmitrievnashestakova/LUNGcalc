full_names = {
	"CPR": "Полный патологический ответ",
	"MPR": "Значительный патологический ответ",
	"недостаточный ответ": "Недостаточный ответ"
}
descriptions = {
	"CPR": "(Отсутствие каких-либо жизнеспособных опухолевых клеток при просмотре гистологических препаратов с окраской H&E после полной оценки резецированного образца рака легкого, включая все отобранные регионарные лимфатические узлы.<br />Такие опухоли будут классифицированы как ypT0N0 в соответствии с системами стадирования 8-го издания AJCC и UICC.)",
	"MPR": "(Уменьшение жизнеспособной опухоли до размера ниже установленного клинически значимого порога, основанного на предшествующих данных в соответствии с индивидуальным гистологическим типом рака легкого и специфической терапией.<br />Также может быть установлен, когда в \"ложе опухоли\" нет жизнеспособных опухолевых клеток, но в лимфатических узлах есть жизнеспособная метастатическая карцинома (ypT0, N1,2 или 3). Однако прогностические и терапевтические последствия этой клинической ситуации неизвестны.)",
	"недостаточный ответ": ""
}
prognosis_descriptions = {
	true: "По данным <a href='https://www.sciencedirect.com/science/article/pii/S1556086418334944'>исследования</a> пациенты с аденокарциномой и низким (≤65%) процентом жизнеспособной опухоли имели значительно лучшие показатели LC-CID (5-летняя кумулятивная заболеваемость раком легких) и OS (общая выживаемость), чем пациенты с высоким (>65%) процентом жизнеспособной опухоли (низкий или высокий процент жизнеспособной опухоли: 5-летняя LC-CID, 23% против 47%). [ p = 0,005]; 5-летняя ОВ, 64% против 42% [ p = 0,005]).",
	false: "По данным <a href='https://www.sciencedirect.com/science/article/pii/S1556086418334944'>исследования</a> пациенты с плоскоклеточным раком с низким (≤10%) процентом жизнеспособной опухолью имели значительно лучшие показатели LC-CID (5-летняя кумулятивная заболеваемость раком легких) и OS (общая выживаемость), чем пациенты с высоким процентом жизнеспособной опухоли (низкий или высокий процент жизнеспособной опухоли: 5-летний LC-CID, 5% против 42% [ p = 0,002] ; 5-летняя ОВ, 69% против 42% [ p = 0,045])."
}

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
	remaining_cells = (in6/100)
	reaction = ((in2/100) + remaining_cells) / 2
	document.getElementById("var-react").innerHTML = parseFloat(reaction.toFixed(3))
	prognosis = findPrognosis(in1, reaction)
	document.getElementById("prognosis").innerHTML = prognosis
	document.getElementById("prognosis-full").innerHTML = full_names[prognosis]
	if (prognosis != "недостаточный ответ") {
		document.getElementById("prognosis-desc").innerHTML = descriptions[prognosis]
		document.getElementById("prognosis-aden-desc").innerHTML = prognosis_descriptions[in1]
	}
	document.getElementById("graphs").style.display = "initial";

}

function clearOutput() {
	document.getElementsByClassName("error")[0].style.display = "none";
	document.getElementById("var-react").innerHTML = "N/A";
	document.getElementById("prognosis").innerHTML = "N/A";
	document.getElementById("prognosis-full").innerHTML = "";
	document.getElementById("prognosis-desc").innerHTML = "";
	document.getElementById("graphs").style.display = "none";
}

function showPercentageError(percentage) {
	document.getElementsByClassName("error")[0].style.display = "inherit";
	document.getElementById("percentage-error").innerHTML = "Компоненты «ложа опухоли» должны в сумме составлять 100%.</br>Сейчас они составляют " + percentage + "%.";

}

function findPrognosis(adenocarcinoma, reaction) {
	if (reaction == 0) {
		return "CPR"
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
