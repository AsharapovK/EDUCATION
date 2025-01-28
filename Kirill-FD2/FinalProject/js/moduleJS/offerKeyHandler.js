// offerKeyHandler.js

export function offerKeyHandler() {
	// Получаем все элементы с классом .fa-circle-question
	const questionIcons = document.querySelectorAll('.fa-circle-question');

	// Добавляем обработчик события клика для каждого элемента
	questionIcons.forEach(icon => {
		icon.addEventListener('click', async function () {
			// Получаем значение data_offerKey
			const offerKey = this.closest('td').getAttribute('data_offerKey');
			console.log(`data_offerKey: ${offerKey}`);
			const offerTd = this.closest('td');
			offerTd.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;"><i class="fa-solid fa-spinner fa-spin-pulse"></i></div>`;

			const targetResult = await fetchTarget(offerKey);

			offerTd.innerHTML = `<span class="cell-content-center">${targetResult}</span> `;

		});
	});
}




//Функция отправки запроса на сервер
async function fetchTarget(offerKey) {

	const url = new URL('http://185.231.69.224:5005/targetOffer');
	url.searchParams.set('offerKey', offerKey);

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},

	})
	const result = await response.json();
	console.log('Success:', result);
	return result.PriceLogo;
}