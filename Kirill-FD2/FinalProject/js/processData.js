// Функция для обработки данных и вставки их в таблицу
export function processData(data) {
	// Получаем элемент с классом card
	const cardContainer = document.querySelector('.card');
	if (cardContainer) {
		// Очищаем предыдущие данные
		cardContainer.innerHTML = `
            <table class="dragtable" id="resizableTable">
                <thead>
                    <tr>
                        <th>Тип:</th>
                        <th>Артикул:</th>
                        <th>Брэнд:</th>
                        <th>Поставщик:</th>
                        <th>Описание:</th>
                        <th>Цена:</th>
                        <th>Кол-во:</th>
                        <th>Доставка:</th>
                        <th>Рейтинг:</th>
                    </tr>
                </thead>
                <tbody>
        `;

		// Вставляем данные в таблицу
		data.results.forEach(result => {
			// Вставляем данные в таблицу
			result.data.forEach(item => {
				const row = document.createElement('tr');

				// Проверяем наличие ETMA или ETMY и добавляем класс highlight
				if (item.PriceLogo && (item.PriceLogo.includes('ETMA') || item.PriceLogo.includes('ETMY'))) {
					row.classList.add('highlight');
				}

				row.innerHTML = `
								<tr>
                    <td><span class="cell-content-center">Оригинал</span></td>
                    <td><span class="cell-content-center">${item.detailNum}</span></td>
                    <td><span class="cell-content-center">${item.make}</span></td>
                    <td><span class="cell-content-center">${item.PriceLogo ? item.PriceLogo : '<i class="fa-regular fa-circle-question"></i>'}</span></td>
                    <td><span class="cell-content-start">${item.name}</span></td>
                    <td><span class="cell-content-center">${item.price}</span></td>
                    <td><span class="cell-content-center">${item.quantity}</span></td>
                    <td><span class="cell-content-center">${item.delivery}</span></td>
                    <td><span class="cell-content-center">${item.rating}</span></td>
								</tr>
                `;
				cardContainer.querySelector('tbody').appendChild(row);
			});

			// Вставляем пустую строку после каждого элемента массива result
			const emptyRow = document.createElement('tr');
			emptyRow.innerHTML = '<td colspan="9" style="height: 60px;"></td>'; // Пустая строка
			cardContainer.querySelector('tbody').appendChild(emptyRow);
		});

		cardContainer.innerHTML += `
                </tbody>
            </table>
        `;

		const table = cardContainer.querySelector('.card table');

		// После вставки данных в таблицу добавляем класс show для анимации
		setTimeout(() => {
			table.classList.add('show');
		}, 100); // Задержка для плавного появления

		// Добавляем обработчик события load для скрипта resizeColumns.js
		const script = document.createElement('script');
		script.src = './js/resizeColumns.js'; // Исправлен путь к файлу
		script.onload = function () {
			// Выполняем код после загрузки скрипта resizeColumns.js
			console.log('resizeColumns.js loaded');
		};
		document.body.appendChild(script);
	}
}
