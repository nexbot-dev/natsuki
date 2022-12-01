const { Command, Capitalize } = require('aen-bot');
const { stripIndents, oneLine } = require('common-tags');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'help',
			group: 'general',
			help: {
				description: 'Checks the help of a command or list of commands',
				arguments: ['[command]'],
				explains: ['Command\'s name to be searched for it\'s help documentation']
			}
		})
	}
	
	async run(msg, args) {
		const [cmd] = args;
		const command = this.client.command.find(c => c.name == cmd || c.aliases.includes(cmd)) || false;

		let embed = new MessageEmbed()
			.setColor(this.client.conf.color)
			.setFooter(this.client.conf.version)
			.setTimestamp();

		if (command === false) {
			embed = embed
				.setTitle('Help Message')
				.setDescription('Here is the list of all commands.')

			this.client.group.sort().map(gi => {
				embed = embed.addField(
					new Capitalize(gi[0]).onlyFirstLetter,
					(
						gi[1].length > 1
							? gi[1].sort().join(', ')
							: gi[1].length == 1
								? gi[1]
								: '-empty-'
					)
				)
			});
		}
		if (command !== false) {
			embed = embed
				.setTitle(`📜 Help Message of ${command.name} Command 📜`)
				.setDescription(stripIndents`
					${command.help.description}

					<> means a required arguments
					[] means an optional arguments
				`)
				.addField('Usage', oneLine`\`
					${this.client.conf.prefix[0]}
					${command.aliases.length > 0 ?
						`«${command.name}|${command.aliases.join('|')}»` :
						command.name
					}
					${command.help.arguments.join(' ')}
				\``)
			
			if (command.help.arguments.length > 0) {
				embed = embed
					.addField('Explained Usage', stripIndents`
						${
							command.help.arguments.map((arg, index) => {
								return oneLine`
									\`${arg.replace(/\[|\]|\<|\>/g, '').replace(/\|/g, '\/')}:\`
									${command.help.explains[index]}`
							}).join('\n')
						}
					`)
					.addField('Example', `${this.client.conf.prefix[0]} ${command.name} ${command.help.example}`);
			}
		}

		return msg.channel.send({embed: embed.toJSON()});
	}
}