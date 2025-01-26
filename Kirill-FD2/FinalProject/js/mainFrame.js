//Импорт функций отображения и скрытия всплывающего окна





// Если в локальной переменной нет значения то установить по умолчанию
if (localStorage.getItem('settingRating') === null) {
	localStorage.setItem('settingRating', 4.0);
}
if (localStorage.getItem('settingDelivery') === null) {
	localStorage.setItem('settingDelivery', 6);
}

// Вставка HTML с логином
const app = document.querySelector('#app');
app.innerHTML = html_login;
const statUrl = new URL(location.href);

// Если параметр login отсутствует, добавляем его
if (!statUrl.href.includes('login')) {
}





// Получаем форму и элементы управления
const loginForm = document.getElementById('loginForm');
const rememberCheck = document.getElementById('rememberCheck');


/**
 * loginForm.addEventListener('submit') - функция-обработчик события submit, которая
 * отправляет данные на сервер, если пользователь авторизован.
 * @param  {Event} event - событие submit
 */
loginForm.addEventListener('submit', function (event) {
	event.preventDefault(); // Предотвращаем отправку формы


	// Получаем значения логина и пароля
	const login = loginForm.Login.value;
	const password = loginForm.Password.value;


	// Проверяем, стоит ли галочка "Запомнить меня"
	if (rememberCheck.checked) {
		// Сохраняем логин и пароль в localStorage
		localStorage.setItem('userLogin', login);
		localStorage.setItem('userPassword', password);
	} else {
		// Если галочка не стоит, очищаем сохраненные данные
		localStorage.removeItem('userLogin');
		localStorage.removeItem('userPassword');
	}

	// Вызов функции buttonActivation для авторизации
	buttonActivation();
	console.log('1. Сделан запрос на авторизацию в GoogleSheets');
});





/**
 * Функция window.addEventListener('load') - заполняет поля, если данные уже сохранены
 * Она срабатывает при загрузке страницы
 */
window.addEventListener('load', function () {
	const savedLogin = localStorage.getItem('userLogin');
	const savedPassword = localStorage.getItem('userPassword');

	if (savedLogin && savedPassword) {
		loginForm.Login.value = savedLogin;
		loginForm.Password.value = savedPassword;
		rememberCheck.checked = true; // Ставим галочку, если данные были сохранены
	}
});





/**
 * Функция обработки нажатия Ctrl+Enter.
 * При нажатии Ctrl+Enter запускается функция sendData.
 * @param  {object} event - объект события
 */
document.addEventListener('keydown', function (event) {
	if (event.ctrlKey && event.key === 'Enter') {
		// Запускаем функцию sendData
		sendData();
	}
});





/**
 * Функция buttonActivation - активирует кнопку "Войти"
 * Она отправляет данные о логине и пароле на сервер.
 * @param  {string} login - логин пользователя
 * @param  {string} password - пароль пользователя
 */
function buttonActivation() {
	const formElements = document.querySelectorAll('.logArr');
	const login = formElements[0].value;
	const password = formElements[1].value;

	app.innerHTML = html_search;

	// Отправка данных на сервер
	fetch(`https://script.google.com/macros/s/AKfycbwJWWqsknLmFKL0pBPfUuIH9Yj7wsrnQMdbXS7yUgXatq8Lr0iO576MvqGnxOM4Okgl/exec?Login=${login}&Password=${password}&Action=Check`)
		.then(response => response.json())
		.then(data => {
			if (data.result === false) {
				app.innerHTML = html_search_false;

				setTimeout(() => {
					app.innerHTML = html_login;
					const form = document.querySelector('#loginForm');
					form.addEventListener('submit', function (event) {
						event.preventDefault(); // Останавливаем стандартное поведение формы
						buttonActivation();
					});
				}, 2000);
			} else if (data.result === true) {
				const loginName = data.row[3];
				userAuthorized(loginName);
			}
		})
		.catch(error => console.error('Error:', error)); // обработка ошибок
}





/**
 * Функция, которая будет вызвана, если авторизация прошла успешно.
 * @param {string} loginName - имя авторизованного пользователя
 */
function userAuthorized(loginName) {
	setTimeout(() => {
		console.log('2. Авторизация успешна');

		// Вставляем HTML с таблицей
		html_welcome = html_function(loginName);
		app.innerHTML = html_welcome;


	}, 1000);

	// Меняем размер блока
	setTimeout(() => { smoothResizeElement('.wrapper', html_size.conteinerWight, html_size.conteinerHeight, 700); }, 1000);
}