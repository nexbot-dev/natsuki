const { Command } = require('aen-bot');
const { Weeb } = require('../../index');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'potato',
			group: 'fun',
			clientPermissions: ['EMBED_LINKS'],
			help: {
				description: 'Sends random potato picture for those potato-head.'
			},
			cooldown: {
				users: new Map(),
				usage: 2,
				time: 5000
			}
		})
	}
	
	async run(msg, args) {
		let text = `Random potato was sent to you.`;

		let embed = await new Weeb({
			type: 'potato',
			nsfw: false
		}).makeEmbed();

		return msg.channel.send(text, {embed: embed});
	}
}