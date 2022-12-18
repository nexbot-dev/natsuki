interface fetchDataType {
	url: string | URL,
	params?: string[][];
}

export async function fetchData({ url, params }: fetchDataType) {
	const fetchUrl = new URL(url);

	if (params !== undefined && params.length > 0) {
		fetchUrl.search = assignParams(params);
	}

	const response = await fetch(fetchUrl, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
		},
	});

	return response.json();
}

function assignParams(params: string[][]) {
	const searchParams = new URLSearchParams();

	if (params.length === 1) {
		searchParams.set(params[0][0], params[0][1]);
	}
	else {
		for (const [paramName, paramValue] of params) {
			searchParams.set(paramName, paramValue);
		}
	}

	return searchParams.toString();
}