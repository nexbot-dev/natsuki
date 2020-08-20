const fetch = require('node-fetch');
const config = require('../../config');

module.exports = class Animal {
	constructor(animal) {
		this.animal = animal;

		return this;
	}

	async getData() {
		const endpoint = this.animal.toLowerCase().replace(/ +/g, '_');
		const url = config.api.sra.animal + endpoint;

		let fetched = await fetch(url, {method: 'GET'})
			.then(res => res.json());

		return fetched;
	}

	makeEmbed(client, embed, type = '') {
		let data = this.getData();

		let result = new embed()
			.setTitle(this.animal)
			.setColor(client.conf.color)
			.setFooter(client.conf.version)
			.setTimestamp();

		if (type === 'fact') {
			result = result.setDescription(data.fact);
		}
		else if (type === 'image') {
			result = result.setImage(data.image);
		}
		else {
			result = result
				.setDescription(data.fact)
				.setImage(data.image);
		}

		return result.toJSON();
	}
}