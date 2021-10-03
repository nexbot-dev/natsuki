const { Command } = require('aen-bot');
const { Weeb } = require('../../index');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'kiss',
			group: 'weeb',
			clientPermissions: ['EMBED_LINKS'],
			help: {
				description: 'Kisses somebody with weeb picture',
				arguments: ['[mention]'],
				explains: ['The mention of somebody, if ignored, enter invalid mention, or id will return to mentions the command user.'],
				example: '@Natsuki#0492'
			},
			cooldown: {
				users: new Map(),
				usage: 2,
				time: 5000
			}
		})
	}
	
	async run(msg, args) {
		let mention = args[0] || msg.author;
		let user = this.client.users.cache.get(`${mention}`.match(/\d{18}/)[0]);
		
		let text = `Here is a hug for you, ${user.username}`;

		let embed = await new Weeb({
			type: 'kiss',
			nsfw: false
		}).makeEmbed();

		return msg.channel.send(text, {embed: embed});
	}
}