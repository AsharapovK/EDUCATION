// Получаем позицию шарика на листе
let ball = document.querySelector('.ball'); // Получаем элемент с классом .ball
// let X = ball.offsetLeft;
// let Y = ball.offsetTop;

let fullX = 817;
let fullY = 1625;
let X = 0; // Начальное значение X
let direction = 1; // 1 для увеличения, -1 для уменьшения
const startTime = Date.now(); // Время начала

setInterval(() => {
	let elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Прошедшее время в секундах
	console.log(`Время: ${elapsedTime}, X: ${X}`); // Вывод времени в консоль

	// Обновляем значение X в зависимости от направления
	X += direction * elapsedTime;

	// Меняем направление, если достигнуты границы
	if (X >= fullX || X <= 0) {
		direction *= -1; // Инвертируем направление
		X = Math.max(0, Math.min(fullX, X)); // Убедиться, что X в пределах [0, fullX]
	}

	// Устанавливаем новую позицию
	ball.style.left = X + 'px';
}, 1000);

// console.log(`X=${X}; Y=${Y}`);
