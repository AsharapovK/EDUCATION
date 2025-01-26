/**
 * Позволяет таблице изменять размер столбцов.
 * Устанавливает ширину для каждого столбца в таблице по умолчению.
 *
 * @param {HTMLTableElement} table - таблица, которую нужно сделать ресайзблевой
 */
export function makeTableResizable(table) {
	const rows = table.querySelectorAll('tr');

	if (rows.length === 0) {
		console.error("Таблица не содержит строк.");
		return;
	}

	const columns = rows[0].children;
	if (!columns || columns.length === 0) {
		console.error("В первой строке таблицы нет столбцов.");
		return;
	}

	const columnWidths = ["9%", "9%", "9%", "9%", "auto", "7%", "7%", "7%", "7%"]; // Ширина для каждого заголовка

	if (columns.length !== columnWidths.length) {
		console.error("Количество ширин не совпадает с количеством заголовков.");
		return;
	}


	// Устанавливаем ширину для всех заголовков вручную
	Array.from(columns).forEach((col, index) => {
		col.style.width = `${columnWidths[index]}`;
	});


	Array.from(columns).forEach((col, index) => {
		if (index === columns.length - 1) return; // Не добавляем ресайзеры к последнему столбцу

		const resizer = document.createElement('div');
		resizer.classList.add('resizer');
		col.style.position = 'relative';
		col.appendChild(resizer);

		resizer.addEventListener('mousedown', (e) => {
			e.preventDefault();

			const startX = e.clientX;
			const startWidth = col.offsetWidth;

			const onMouseMove = (e) => {
				const delta = e.clientX - startX;
				col.style.width = `${startWidth + delta}px`;
			};

			const onMouseUp = () => {
				document.removeEventListener('mousemove', onMouseMove);
				document.removeEventListener('mouseup', onMouseUp);
			};

			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);
		});
	});
}