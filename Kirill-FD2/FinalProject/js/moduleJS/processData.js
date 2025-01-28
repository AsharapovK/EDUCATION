/**
 * Функция для обработки данных и вставки их в таблицу
 * @param {object} data - Объект с данными, полученными из Google Sheets
 */
export function processData(data) {
	// Получаем элемент с классом card
	const cardContainer = document.querySelector('.card');
	if (cardContainer) {
		// Очищаем предыдущие данные
		cardContainer.innerHTML = `
            <table class="dragtable" id="resizableTable">
                <thead>
                    <tr>
                        <th id="cell1" >Тип:</th>
                        <th id="cell2" >Артикул:</th>
                        <th id="cell3" >Брэнд:</th>
                        <th id="cell4" >Поставщик:</th>
                        <th id="cell5" >Описание:</th>
                        <th id="cell6" >Цена:</th>
                        <th id="cell7" >Кол-во:</th>
                        <th id="cell8" >Доставка:</th>
                        <th id="cell9" >Рейтинг:</th>
                    </tr>
                </thead>
                <tbody>
        `;

		// Вставляем данные в таблицу
		data.results.forEach(result => {
			// Вставляем строку с информацией о детали
			const detailRow = document.createElement('tr');
			detailRow.innerHTML = `
                    <td colspan="9" style="text-align: center; font-weight: 700;">
                       ${result.params.searchString.toUpperCase()} - ${result.params.make.toUpperCase()}
                    </td>
            `;
			cardContainer.querySelector('tbody').appendChild(detailRow);

			// Вставляем данные в таблицу
			result.data.forEach(item => {
				const row = document.createElement('tr');

				// Проверяем наличие ETMA или ETMY и добавляем класс highlight
				if (item.PriceLogo && (item.PriceLogo.includes('ETMA') || item.PriceLogo.includes('ETMY'))) {
					row.classList.add('highlight');
				}

				row.innerHTML = `
								<tr>
                    <td id="cell1"><span class="cell-content-center" >Оригинал</span></td>
                    <td id="cell2"><span class="cell-content-center" >${item.detailNum}</span></td>
                    <td id="cell3"><span class="cell-content-center" >${item.make}</span></td>
                    <td id="cell4" data_offerKey="${item.offerKey}"><span class="cell-content-center" >${item.PriceLogo ? item.PriceLogo : '<i class="fa-regular fa-circle-question"></i>'}</span></td>
                    <td id="cell5"><span class="cell-content-start" >${item.name}</span></td>
                    <td id="cell6"><span class="cell-content-center" >${item.price} ₽</span></td>
                    <td id="cell7"><span class="cell-content-center" >${item.quantity} шт.</span></td>
                    <td id="cell8"><span class="cell-content-center" >${item.delivery} дн.</span></td>
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
	}
}