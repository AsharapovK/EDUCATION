//Импорт функций отображения и скрытия всплывающего окна
const audio = new Audio('mp3/click.mp3');
audio.volume = 0.1;
const audio2 = new Audio('mp3/welcome2.mp3');
audio2.volume = 0.1;


// Если в локальной переменной нет значения то установить по умолчанию
if (localStorage.getItem('settingRating') === null) {
	localStorage.setItem('settingRating', 4.0);
}
if (localStorage.getItem('settingDelivery') === null) {
	localStorage.setItem('settingDelivery', 6);
}


// Вставка HTML с логином
const app = document.querySelector('#app');
const hashKey = (Math.random() * 100000000000000000);
console.log(`hashKey = ${hashKey}`);
// app.innerHTML = html_login;


loadLogin()
// Если хэш содержит логин или пустой, то загружаем HTML авторизации
function loadLogin() {
	const pageHash = window.location.hash;
	if (pageHash === '#login' || pageHash === '') {
		if (!location.hash.includes('login')) {
			window.location.hash = '#login';
		}
	}
	const newHash = window.location.hash;
	if (newHash !== `#authorization=${hashKey}` && newHash !== '#login') {
		window.location.hash = '#login';
		location.reload();
	}
	else app.innerHTML = html_login;
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
	audio.play();

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
				// userAuthorized(loginName);

				window.location.hash = `#authorization=${hashKey}`;

				chekAHash(loginName)
			}
		})
		.catch(error => console.error('Error:', error)); // обработка ошибок
}





/**
 * Функция, которая будет вызвана, если авторизация прошла успешно.
 * @param {string} loginName - имя авторизованного пользователя
 */
function userAuthorized(loginName) {
	// Вставляем HTML с таблицей
	setTimeout(() => {
		console.log('2. Авторизация успешна');
		html_welcome = html_function(loginName);
		app.innerHTML = html_welcome;
		audio2.play();
	}, 1000);

	// Меняем размер блока
	setTimeout(() => { smoothResizeElement('.wrapper', html_size.conteinerWight, html_size.conteinerHeight, 700); }, 1000);
	createResizeHandler();
}




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








function createResizeHandler() {
	let width = window.innerWidth;
	let height = window.innerHeight;

	function handleResize() {
		const newWidth = window.innerWidth;
		const newHeight = window.innerHeight;


		if (newWidth !== width || newHeight !== height) {
			width = newWidth;
			height = newHeight;

			setTimeout(() => {
				smoothResizeElement('.wrapper', width - 30, height - 30, 400);
				// // Создаем вибрацию на телефоне
				navigator.vibrate(100);
			}, 0);
		}
	}

	// Добавляем слушатель события resize
	window.addEventListener('resize', handleResize);

	// Вызываем функцию при загрузке страницы, чтобы получить начальные размеры
	handleResize();
}



function chekAHash(loginName) {
	// Добавляем слушатель события hashchange
	window.addEventListener('hashchange', () => {
		const newHash = window.location.hash;

		if (newHash === `#authorization=${hashKey}`) {
			// location.reload();
			userAuthorized(loginName);
		}
		else app.innerHTML = html_login;
	});
}



