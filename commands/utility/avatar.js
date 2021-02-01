const { Command, GetUser } = require('aen-bot');
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
		let mention = args.join(' ') || msg.author.id;
		
		return new GetUser(this.client, msg, mention, this.cmdCallback).validate();
	}

	cmdCallback(msg, result) {
		let embed = new MessageEmbed()
			.setTitle(`${result.username}'s Avatar`)
			.setColor(this.client.conf.color)
			.setImage(result.displayAvatarURL({size: 4096, dynamic: true, format: 'png'}))
			.setTimestamp()
			.setFooter(this.client.conf.version)

		msg.channel.send({embed: embed});
	}
}