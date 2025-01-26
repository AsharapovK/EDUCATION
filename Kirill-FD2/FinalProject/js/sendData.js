import { processData } from './processData.js';
import { createProxyAgent, createProxyHeaders } from './proxy.js';

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

    // Функция для отправки данных
    function sendData() {
        showLoadingPopup();

        const payload = { links: products };

        // Создаем прокси-агент
        const agent = createProxyAgent();

        // Отправляем POST запрос через прокси
        fetch('http://185.231.69.224:5005/processLinks', {
            method: 'POST',
            headers: createProxyHeaders(),
            body: JSON.stringify(payload),
            agent: agent // Используем прокси-агент
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            processData(data);
            hideLoadingPopup();
        })
        .catch((error) => {
            console.error('Error:', error);
            hideLoadingPopup();
        });
    }

    sendData();
}
