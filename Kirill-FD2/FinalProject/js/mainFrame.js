// Вставка HTML с логином
const app = document.querySelector('#app');
app.innerHTML = html_login;


// Получаем форму и элементы управления
const loginForm = document.getElementById('loginForm');
const rememberCheck = document.getElementById('rememberCheck');


// Обработчик отправки формы
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
	buttonActivation();
	console.log('Форма отправлена');
});


// Заполняем поля, если данные уже сохранены
window.addEventListener('load', function () {
	const savedLogin = localStorage.getItem('userLogin');
	const savedPassword = localStorage.getItem('userPassword');

	if (savedLogin && savedPassword) {
		loginForm.Login.value = savedLogin;
		loginForm.Password.value = savedPassword;
		rememberCheck.checked = true; // Ставим галочку, если данные были сохранены
	}
});


// Функция для активации кнопки или другой логики
function buttonActivation() {
	console.log('Форма не отправляется, кнопка активирована!');
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
				userAuthorized();
			}
		})
		.catch(error => console.error('Error:', error)); // обработка ошибок
}

// Функция успешной авторизации
function userAuthorized() {
	setTimeout(() => { app.innerHTML = html_welcome; }, 1000);

	// Меняем размер блока
	setTimeout(() => { smoothResizeElement('.wrapper', html_size.conteinerWight, html_size.conteinerHeight, 700); }, 1000);
}


