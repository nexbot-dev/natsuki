const { Command } = require('aen-bot');
const { Weeb } = require('../../index');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'owo',
			group: 'fun',
			clientPermissions: ['EMBED_LINKS'],
			help: {
				description: 'Sends random OwO picture for those people who like owo faces.'
			},
			cooldown: {
				users: new Map(),
				usage: 2,
				time: 5000
			}
		})
	}
	
	async run(msg) {	
		let text = `OwO, owo owo OWO OWO owo!`;

		let embed = await new Weeb({
			type: 'owo',
			nsfw: false
		}).makeEmbed();

		return msg.channel.send(text, {embed: embed});
	}
}