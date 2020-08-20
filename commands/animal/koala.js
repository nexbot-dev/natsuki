const { Command } = require('aen-bot');
const { MessageEmbed } = require('discord.js');
const { Animal } = require('../../index');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'koala',
			aliases: [''],
			group: 'animal',
			clientPermissions: ['EMBED_LINKS'],
			help: {
				description: 'Get a koala\'s image and/or fact, then sends it here',
				arguments: ['[fact|image]'],
				explains: ['If the argument is fact, it\'ll send fact only. If argument is image, then image only. If ignored or empty, it\'ll sends both.'],
				example: 'fact'
			},
			cooldown: {
				usage: 1,
				time: 8000
			}
		})
	}
	
	async run(msg, args) {
		const animal = await new Animal('Koala');

		let [type] = args;

		if (type === 'fact')
			animal = animal.makeEmbed(this.client, MessageEmbed, 'fact');
		else if (type === 'image')
			animal = animal.makeEmbed(this.client, MessageEmbed, 'image');
		else
			animal = animal.makeEmbed(this.client, MessageEmbed);

		msg.channel.send({embed: animal});
	}
}