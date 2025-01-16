//Определение ширины и высоты окна
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const conteinerWight = (screenWidth / 100) * 90;
const conteinerHeight = (screenHeight / 100) * 95;



// Вставка HTML с логином
const app = document.querySelector('#app');
app.innerHTML = html_login;

// Получаем форму и кнопку
const form = document.querySelector('#loginForm');
form.addEventListener('submit', function (event) {
	event.preventDefault(); // Останавливаем стандартное поведение формы
	buttonActivation();
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
	setTimeout(() => {
		app.innerHTML = html_welcome;
	}, 1000);

	// Меняем размер блока
	setTimeout(() => {
		smoothResizeElement('.wrapper_welcome', conteinerWight, conteinerHeight, 300);
	}, 1300);
}


