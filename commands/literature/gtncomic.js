const { Command } = require('aen-bot');
const { Weeb } = require('../../index');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'gtncomic',
            aliases: ['gtn'],
			group: 'literature',
			nsfw: true,
			clientPermissions: ['EMBED_LINKS'],
			help: {
				description: 'Sends random comic.'
			},
			cooldown: {
				users: new Map(),
				usage: 2,
				time: 5000
			}
		})
	}
	
	async run(msg) {	
		let text = `NSFW comic by GreenTeaNeko.`;

		let embed = await new Weeb({
			type: 'nsfw-gtn',
			nsfw: true
		}).makeEmbed();

		return msg.channel.send(text, {embed: embed});
	}
}