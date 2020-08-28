const { Command } = require('aen-bot');
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
				users: new Map(),
				usage: 2,
				time: 10000
			}
		})
	}
	
	async run(msg, args) {
		let animal = await new Animal('Koala');

		let result, [type] = args;

		if (type === 'fact')
			result = await animal.makeEmbed('fact');
		else if (type === 'image')
			result = await animal.makeEmbed('image');
		else
			result = await animal.makeEmbed();

		msg.channel.send({embed: result});
	}
}