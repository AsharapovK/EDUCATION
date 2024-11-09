// Импорт необходимых модулей
const dns = require('dns'); // Для работы с DNS
const ping = require('ping'); // Для пинга IP-адресов
const axios = require('axios'); // Для выполнения HTTP-запросов

// Настройки
const hostname = 'iPhone-Kirill.local'; // Имя хоста для поиска
const url = 'https://script.google.com/macros/s/AKfycbyR9riEvdAG2Zr6IgpseJ6GpfaOyuqi30MybYOCvdtOA1Ix_2yEWXJpyO5rZCnwo8nM/exec'; // URL для отправки POST-запросов
const checkInterval = 5000; // Интервал проверки в миллисекундах

// Переменные для хранения последнего статуса и IP-адреса
let lastStatus = null;
let lastIp = null;

// Функция для получения IP-адреса по имени хоста
async function getIp() {
	return new Promise((resolve, reject) => {
		// Используем DNS для поиска IP-адреса
		dns.lookup(hostname, (err, address) => {
			if (err) {
				return resolve(null); // Если ошибка, возвращаем null
			}
			resolve(address); // Возвращаем найденный IP-адрес
		});
	});
}

// Функция для пинга IP-адреса
async function pingHost(ip) {
	const res = await ping.promise.probe(ip); // Выполняем пинг
	return res.alive; // Возвращаем true, если хост доступен, иначе false
}

// Функция для отправки POST-запроса
async function sendPost(status) {
	// Формируем параметры для запроса
	const params = {
		Status: status, // Статус устройства (UP или DOWN)
		Iphone: lastIp || 'Unknown' // IP-адрес устройства или 'Unknown', если он не известен
	};
	try {
		// Отправляем POST-запрос с параметрами
		const response = await axios.post(url, null, { params });
		console.log(`POST запрос отправлен: ${JSON.stringify(params)}`); // Логируем отправленный запрос
	} catch (error) {
		console.error(`Ошибка при отправке POST запроса: ${error}`); // Логируем ошибку, если запрос не удался
	}
}

// Основная функция для выполнения проверки
async function main() {
	while (true) { // Бесконечный цикл
		const ip = await getIp(); // Получаем IP-адрес
		if (ip) {
			const currentStatus = await pingHost(ip); // Пингуем IP-адрес
			const statusText = currentStatus ? 'UP' : 'DOWN'; // Определяем статус (UP или DOWN)

			// Проверяем, изменился ли статус
			if (statusText !== lastStatus) {
				await sendPost(statusText); // Отправляем POST-запрос с текущим статусом
				lastStatus = statusText; // Обновляем последний статус
				lastIp = ip; // Обновляем последний IP-адрес
			}
			console.log(`${hostname} (${ip}) статус: ${statusText}`); // Логируем текущий статус
		} else {
			// Если IP-адрес не найден
			if (lastStatus !== null) {
				await sendPost('UNKNOWN'); // Отправляем POST-запрос со статусом UNKNOWN
				lastStatus = null; // Сбрасываем последний статус
				lastIp = null; // Сбрасываем последний IP-адрес
				console.log(`${hostname} не найден.`); // Логируем, что хост не найден
			}
		}
		await new Promise((resolve) => setTimeout(resolve, checkInterval)); // Ждем перед следующей проверкой
	}
}

// Запуск основной функции и обработка ошибок
main().catch(console.error);
