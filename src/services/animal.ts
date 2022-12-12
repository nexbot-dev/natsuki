import config from '#root/config';

interface ResultType {
	image: string,
	fact: string,
}

export async function fetchAnimalData(animal: string) {
	const endpoint = animal;
	const url = new URL(endpoint, config.api.sra.animal);

	const response = await fetch(url, {
		method: 'GET',
	});
	const result: ResultType = await response.json();

	return result;
}