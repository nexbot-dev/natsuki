const { Command } = require('aen-bot');
const { Weeb } = require('../../index');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'lewd',
			group: 'fun',
			clientPermissions: ['EMBED_LINKS'],
			help: {
				description: 'Sends random lewd picture for you.'
			},
			cooldown: {
				users: new Map(),
				usage: 2,
				time: 5000
			}
		})
	}
	
	async run(msg) {	
		let text = `Lewd.`;

		let embed = await new Weeb({
			type: 'lewd',
			nsfw: false
		}).makeEmbed();

		return msg.channel.send(text, {embed: embed});
	}
}