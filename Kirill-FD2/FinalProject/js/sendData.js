// Импорт функций
import { processData } from './moduleJS/processData.js'; // Импортируем processData
import { makeTableResizable } from './moduleJS/resizeColumns.js'; // Импортируем makeTableResizable
import { offerKeyHandler } from './moduleJS/offerKeyHandler.js'; // Импортируем offerKeyHandler


/**
 * Функция sendData - отправляет POST-запрос на сервер, запрашивая данные из Emmex.ru API
 * @param {object} event - объект события
 */
window.sendData = function (event) {

	// Запуск звука из папки mp3
	audio.play();


	console.log('3. Запрашиваем данные из Emmex.ru API');
	const url = 'http://185.231.69.224:5005/processLinks';

	// Показываем всплывающее окно
	function showLoadingPopup() {
		const popup = document.createElement('div');
		popup.id = 'loading-popup';
		popup.className = 'wrapper';
		popup.style.position = 'fixed';
		popup.style.top = '45%';
		popup.style.transform = 'translate(-50%, -50%)';
		popup.style.color = 'white';
		popup.style.padding = 'px';
		popup.style.zIndex = '1000';
		popup.innerHTML = `
													<div class="container_search">
														<div class="spinner"><i class="fa-solid fa-spinner fa-spin-pulse"></i></div>
														<h3>Запрашиваю данные...</h3>
													</div>`;
		document.body.appendChild(popup);
	}

	// Скрываем всплывающее окно
	function hideLoadingPopup() {
		const popup = document.getElementById('loading-popup');
		if (popup) {
			document.body.removeChild(popup);
		}
	}

	// Сбор данных из формы
	const articleInputs = document.querySelectorAll('input[name="ProductArticle[]"]');
	const brandInputs = document.querySelectorAll('input[name="ProductBrand[]"]');

	//Получаем значения из локальных переменных
	const rating = localStorage.getItem('settingRating') || 4.0;
	const delivery = localStorage.getItem('settingDelivery') || 6;

	const products = [];
	for (let i = 0; i < articleInputs.length; i++) {
		const article = articleInputs[i].value.trim();
		const brand = brandInputs[i].value.trim();

		if (article !== '' && brand !== '') {
			products.push({
				make: brand,
				searchString: article,
				locationId: '23606',
				longitude: '27.5763',
				latitude: '53.9381',
				maxDeliveryDays: delivery,
				minRating: rating
			});
		}
	}

	const payload = { links: products };

	// Показываем индикатор загрузки
	showLoadingPopup();

	// Отправка POST-запроса напрямую
	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	})
		.then(response => response.json())
		.then(result => {
			console.log('Success:', result);

			// Здесь вызываем processData, передавая данные
			console.log(`4. Обрабатываем данные и создаем таблицу`)
			processData(result); //Обработка и вывод в таблицу
			offerKeyHandler(); //Обработка иконок в таблице
			// Запуск звука из папки mp3
			const audio = new Audio('mp3/tonkiy-metallicheskiy-zvuk.mp3');
			audio.volume = 0.1;
			audio.play();
			const table = document.getElementById('resizableTable');
			makeTableResizable(table); // Вызываем функцию для изменения размеров таблицы
		})
		.catch(error => {
			console.error('Error:', error);
		})
		.finally(() => {
			hideLoadingPopup(); // Скрываем индикатор загрузки
		});
};
