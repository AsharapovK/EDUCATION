import { processData } from './processData.js';


window.sendData = function () {

	// Функция для отображения всплывающего окна
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

		// Обновление статусбара
		let width = 0;
		const interval = setInterval(() => {
			if (width >= 100) {
				clearInterval(interval);
			} else {
				width++;
				const progressElement = document.getElementById('progress');
				if (progressElement) {
					progressElement.style.width = width + '%';
				}
			}
		}, 30);
	}

	// Функция для скрытия всплывающего окна
	function hideLoadingPopup() {
		const popup = document.getElementById('loading-popup');
		if (popup) {
			document.body.removeChild(popup);
		}
	}

	// Получаем данные из input с классами ProductArticle и ProductBrand
	const articleInputs = document.querySelectorAll('input[name="ProductArticle[]"]');
	const brandInputs = document.querySelectorAll('input[name="ProductBrand[]"]');

	const products = [];

	for (let i = 0; i < articleInputs.length; i++) {
		const article = articleInputs[i].value.trim();
		const brand = brandInputs[i].value.trim();

		// Проверяем, что оба поля не пустые
		if (article !== '' && brand !== '') {
			products.push({
				make: brand,
				searchString: article,
				locationId: '23606',
				longitude: '27.5763',
				latitude: '53.9381',
				maxDeliveryDays: 6,
				minRating: 4.0
			});
		}
	}

	// Формируем payload
	const payload = { links: products };

	// Показываем всплывающее окно перед отправкой запроса
	showLoadingPopup();

	// Отправляем POST запрос
	fetch('http://185.231.69.224:5005/processLinks', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	})
		.then(response => response.json())
		.then(data => {
			console.log('Success:', data);

			// Обработка ответа
			processData(data);

			// Скрываем всплывающее окно после получения ответа
			hideLoadingPopup();
		})
		.catch((error) => {
			console.error('Error:', error);
			// Скрываем всплывающее окно в случае ошибки
			hideLoadingPopup();
		});

}

