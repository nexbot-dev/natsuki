const { Command } = require('aen-bot');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'avatar',
			group: 'utility',
			help: {
				description: 'Check if today is your lucky day'
			},
			cooldown: {
				users: new Map(),
				usage: 2,
				time: 6000
			}
		})
	}
	
	async run(msg, args) {
		let mention = args[0] || msg.author;
		let user = this.client.users.cache.get(`${mention}`.match(/\d{18}/)[0]);
		
		let embed = new MessageEmbed()
			.setTitle(`${user.username}'s Avatar`)
			.setColor(this.client.conf.color)
			.setImage(user.displayAvatarURL({size: 4096, dynamic: true, format: 'png'}))
			.setTimestamp()
			.setFooter(this.client.conf.version)

		msg.channel.send({embed: embed});
	}
}