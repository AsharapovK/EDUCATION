async function getEmmexProduct(links) {
	const url = 'http://185.231.69.224:5005/processLinks';

	const payload = {
		links: links || [
			{
				make: "MANN",
				searchString: "CUK25332",
				locationId: "23606",
				longitude: "27.5763",
				latitude: "53.9381",
				maxDeliveryDays: 6,
				minRating: 4.0
			},
			{
				make: "BOSCH",
				searchString: "F026407123",
				locationId: "23606",
				longitude: "27.5763",
				latitude: "53.9381",
				maxDeliveryDays: 6,
				minRating: 4.0
			}
		]
	};

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;

	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}

// export { getEmmexProduct };