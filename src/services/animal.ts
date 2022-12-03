import config from '#root/config';

export async function fetchAnimalData(animal: string) {
	const endpoint = animal;
	const url = new URL(endpoint, config.api.sra.animal);

	const result = await fetch(url, {
		method: 'GET',
	});

	return result.json();
}