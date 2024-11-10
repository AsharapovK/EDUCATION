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
function recursive(str, i, r) {

	if (i >= r) {
		console.log(`Строка "${str}" является палиндромом`)
		return true
	}

	// Действие функции
	if (str[i].toLowerCase() === str[r].toLowerCase()) {
		console.log(`${str[i]} == ${str[r]}`)
		return recursive(str, i + 1, r - 1)
	} else {
		return false
	}
}
