const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const config = require('../../config');

class Animal {
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

	async makeEmbed(type = '') {
		let data = await this.getData();

		let result = new MessageEmbed()
			.setTitle(this.animal)
			.setColor(config.color)
			.setFooter(config.version)
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

module.exports = Animal;