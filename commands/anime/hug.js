const { Command } = require('aen-bot');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'hug',
			group: 'anime',
			clientPermissions: ['EMBED_LINKS'],
			help: {
				description: 'Give a hug to someone with anime picture',
				arguments: ['[mention]'],
				explains: ['blas'],
				example: '@Natsuki#0492'
			},
			cooldown: {
				usage: 1,
				time: 8000
			}
		})
	}
	
	async run(msg, args) {
		return msg.channel.send(args || "lol");
	}
}