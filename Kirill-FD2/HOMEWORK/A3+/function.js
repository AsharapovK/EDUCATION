// Функция для замены буквы ё на букву е
function replacement(str) {
	let replacementString = ``
	for (let i = 0; i < str.length; i++) {
		str[i] != `ё` ? replacementString += str[i] : replacementString += `е`
	}
	return replacementString
}

// Функция для очистки строки от лишних символов
function clearString(replacementString, ignoreStr) {
	let deleteString = ``
	for (let i = 0; i < replacementString.length; i++) {
		if (!ignoreStr.includes(replacementString[i])) {
			deleteString += replacementString[i]
		}
	}
	return deleteString
}

//Функция проверки на палиндром
function isPalindrom(deleteString) {
	let flag = false
	//Выполняем проверку по буквам
	for (let i = 0, r = deleteString.length - 1; i < deleteString.length; i++, r--) {
		if (deleteString[i].toLowerCase() == deleteString[r].toLowerCase()) {
			console.log(`${deleteString[i]} == ${deleteString[r]}`)
		}
		else {
			flag = true
			break
		}
	}

	if (flag) {
		return false
	}
	else {
		return true
	}
}
