
function smoothResizeElement(selector, targetWidth, targetHeight, duration) {
	const element = document.querySelector(selector);
	if (!element) return;

	const startWidth = element.offsetWidth;
	const startHeight = element.offsetHeight;
	const widthChange = targetWidth - startWidth;
	const heightChange = targetHeight - startHeight;
	const startTime = Date.now();

	function resizeStep() {
		const elapsedTime = Date.now() - startTime;
		const progress = Math.min(elapsedTime / duration, 1);

		const currentWidth = startWidth + widthChange * progress;
		const currentHeight = startHeight + heightChange * progress;

		element.style.width = `${currentWidth}px`;
		element.style.height = `${currentHeight}px`;

		if (progress < 1) {
			requestAnimationFrame(resizeStep);
		}
	}

	resizeStep();
}