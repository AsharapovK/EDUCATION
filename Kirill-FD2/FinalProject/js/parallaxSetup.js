// Инициализация Parallax.js
window.addEventListener('load', function () {
	const parallaxContainer = document.getElementById('parallax-container');
	const parallaxInstance = new Parallax(parallaxContainer, {
		relativeInput: true,
		clipRelativeInput: true
	});
});
