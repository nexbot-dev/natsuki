const { Command } = require('aen-bot');
const { Weeb } = require('../../index');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'pout',
			group: 'anime',
			clientPermissions: ['EMBED_LINKS'],
			help: {
				description: 'Pouts to somebody with weeb picture',
				arguments: ['[mention]'],
				explains: ['The mention of somebody, if ignored, enter invalid mention, or id will return to mentions the command user.'],
				example: '@Natsuki#0492'
			},
			cooldown: {
				users: new Map(),
				usage: 2,
				time: 8000
			}
		})
	}
	
	async run(msg, args) {
		let [user] = args;
		let mention = user.match(/\<\@\d{18}\>/igm) ? user : msg.author;
		let text = `Here is a hug for you, ${mention}`;

		let embed = await new Weeb('pout').makeEmbed();

		return msg.channel.send(text, {embed: embed});
	}
}