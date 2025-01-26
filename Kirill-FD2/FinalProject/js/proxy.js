// Конфигурация прокси
const PROXY_CONFIG = {
	host: '185.149.21.115',
	port: 3000,
	auth: {
		username: 'fDY0Sb',
		password: 'AxMElWfmKn'
	}
};

const { HttpsProxyAgent } = require('https-proxy-agent');

/**
 * Создает и настраивает HTTPS прокси агент
 * @returns {HttpsProxyAgent} Настроенный прокси агент
 */
function createProxyAgent() {
	const proxyUrl = `http://${PROXY_CONFIG.auth.username}:${PROXY_CONFIG.auth.password}@${PROXY_CONFIG.host}:${PROXY_CONFIG.port}`;
	return new HttpsProxyAgent(proxyUrl);
}

/**
 * Создает заголовки для запроса через прокси
 * @returns {Object} Объект с заголовками
 */
function createProxyHeaders() {
	return {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
		'Accept': 'application/json',
		'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
		'Proxy-Authorization': `Basic ${Buffer.from(`${PROXY_CONFIG.auth.username}:${PROXY_CONFIG.auth.password}`).toString('base64')}`
	};
}

module.exports = {
	createProxyAgent,
	createProxyHeaders
};
