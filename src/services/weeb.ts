import config from '#root/config';

interface WeebType {
	type: string,
	isNsfw?: boolean,
}

interface ResultType {
	path: string,
	id: string,
	type: string,
	nsfw: string,
}

export async function fetchWeebData({ type, isNsfw }: WeebType) {
	const fetchUrl = new URL(config.api.weeb.request);
	const params = new URLSearchParams();
	const nsfw = String(Boolean(isNsfw));

	params.set('type', type);
	params.set('nsfw', nsfw);

	fetchUrl.search = params.toString();

	const response = await fetch(fetchUrl, {
		method: 'GET',
	});
	const result: ResultType = await response.json();

	const cdnPath = result.path.replace('/i/', '');
	const cdnUrl = new URL(cdnPath, config.api.weeb.cdn);

	return {
		filename: cdnPath,
		url: cdnUrl,
	};
}