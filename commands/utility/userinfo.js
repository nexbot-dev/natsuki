const { Command, GetUser } = require('aen-bot');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
            name: 'userinfo',
            aliases: ['user', 'whois'],
			group: 'utility',
			help: {
				description: 'Check a user\'s info by id and tag. If no argument given, return yourself\'s info.',
                arguments: ['[user_ID|user_tag]'],
                explains: [
					'Other user\'s ID and tag'
				],
				example: 'userinfo Natsuki#0492'
			},
			cooldown: {
				users: new Map(),
				usage: 2,
				time: 5000
			}
		})
	}
	
	async run(msg, args) {
		let mention = args.join(' ') || msg.author.id;
		
		return new GetUser(this.client, msg, mention, this.cmdCallback).validate();
	}

	cmdCallback(msg, result) {
        const isMember = msg.guild.members.cache.has(result.id);
        
        let id = result.id;
        let name = result.tag;
        let create = result.createdAt;
        let avatar = result.displayAvatarURL({format: 'png', size: 2048});

        let embed = new MessageEmbed()
            .setTitle(`Info of ${name}`)
            .setThumbnail(avatar)
            .setColor(this.client.conf.color)
            .setDescription(stripIndents`
                \`ID     ::\` ${id}
                \`Name   ::\` ${name}
                \`Nick   ::\` <@${id}>
                \`Avatar ::\` [Full-size](${avatar})
            `)
            .addField('Created At', create)
            .setTimestamp()
            .setFooter(this.client.conf.version)

        if (isMember) {
            let roles = msg.guild.members.cache.get(id).roles.cache.map(r => `<@&${r.id}>`).slice(0, -1);
            let join = msg.guild.members.cache.get(id).joinedAt;

            embed
                .addField('Joined At', join)
                .addField(`Roles [${roles.length}]`, roles.join(' '))
        }

		msg.channel.send({embed: embed});
	}
}