interface fetchDataType {
	url: string | URL,
	params?: string[][];
}

export async function fetchData({ url, params }: fetchDataType) {
	const fetchUrl = new URL(url);
	const searchParams = new URLSearchParams(params);
	const headers = new Headers({
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'User-Agent': 'Natsuki Bot (https://github.com/nexbot-dev/natsuki)',
	});

	fetchUrl.search = searchParams.toString();

	const response = await fetch(fetchUrl, {
		method: 'GET',
		headers: headers,
	});

	return response.json();
}