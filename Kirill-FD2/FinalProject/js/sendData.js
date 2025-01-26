import { processData } from './processData.js'; // Импортируем processData

window.sendData = function () {
	const PROXY_CONFIG = {
		host: '185.149.21.115',
		port: 3000,
		auth: {
			username: 'fDY0Sb',
			password: 'AxMElWfmKn'
		}
	};

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
				maxDeliveryDays: 6,
				minRating: 4.0
			});
		}
	}

	const payload = { links: products };

	// Показываем индикатор загрузки
	showLoadingPopup();

	// Отправка POST-запроса через axios с использованием прокси
	axios({
		method: 'post',
		url: 'http://185.231.69.224:5005/processLinks',
		data: payload,
		headers: {
			'Content-Type': 'application/json'
		},
		proxy: PROXY_CONFIG
	})
		.then(response => {
			console.log('Success:', response.data);
			processData(response.data); // Здесь вызываем processData, передавая данные
		})
		.catch(error => {
			console.error('Error:', error);
		})
		.finally(() => {
			hideLoadingPopup(); // Скрываем индикатор загрузки
		});
};
