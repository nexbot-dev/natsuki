const { Command } = require('aen-bot');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { DateFormatter } = require('../../index')

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'serverinfo',
			aliases: ['server', 'guild'],
			group: 'utility',
			help: {
				description: 'Shows the info of the server.',
				example: ''
			},
			cooldown: {
				users: new Map(),
				usage: 2,
				time: 5000
			}
		})
	}

	async run(msg) {
		let guild = msg.guild;

		if (!guild.available) return msg.channel.send('Server is unavailable (outage).');

		let categorySize = guild.channels.cache.map(ch => ch.type === 'category').filter(Boolean).length;
		let channelSize = guild.channels.cache.size - categorySize;
		let textChannelSize = guild.channels.cache.map(ch => ch.type === 'text').filter(Boolean).length;
		let voiceChannelSize = guild.channels.cache.map(ch => ch.type === 'voice').filter(Boolean).length;
		let createdTime = new DateFormatter({
			date: guild.createdAt,
			dateDelimiter: ' ',
			timeDelimiter: ':',
			dateAndTimeDelimiter: '@'
		}).formatWith({
			dateFormat: 'DMY',
			timeFormat: 'hms'
		});

		let embed = new MessageEmbed()
			.setTitle('Server Info')
			.setThumbnail(guild.icon)
			.setColor(this.client.conf.color)
			.setDescription(stripIndents`
				**Name:** ${guild.name}
				**Guild ID:** ${guild.id}
				**Owner:** ${guild.owner} [\`${guild.ownerID}\`]
				**Created:** ${createdTime}
				**Verification:** ${guild.verificationLevel}
				**AFK Channel:** ${guild.afkChannel ?? 'Not set'}
			`)
			.addField('Total', stripIndents`
				**Categories:** ${categorySize}
				**Channels:** ${channelSize} [\`Text: ${textChannelSize} | Voice: ${voiceChannelSize}\`]
				**Roles:** ${guild.roles.cache.size}
				**Members:** ${guild.memberCount}
				**Emojis:** ${guild.emojis.cache.size}
			`)
			.setImage(guild.icon)
			.setTimestamp()
			.setFooter(this.client.conf.version)

		return msg.channel.send({embed: embed})
	}
}