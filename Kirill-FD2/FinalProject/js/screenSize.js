/**
 * Функция screenSize() - возвращает объект с размерами экрана и элементов
 * @return {Object} - объект с размерами
 */
function screenSize() {

	const screenWidth = window.innerWidth
	const screenHeight = window.innerHeight
	const formWidth = screenWidth > 480 ? 470 : screenWidth / 100 * 95
	const formHeight = 416

	const resultObject = {
		formWidth: formWidth,
		formHeight: formHeight,
		conteinerWight: (screenWidth / 100) * 98,
		conteinerHeight: (screenHeight / 100) * 98
	}

	return resultObject
}
