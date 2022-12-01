const { Command } = require('aen-bot');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
            name: 'synonym',
            aliases: ['syn'],
			group: 'utility',
			clientPermissions: ['EMBED_LINKS', 'MANAGE_MESSAGES'],
			help: {
				description: 'Looks up the synonyms of the entered word.',
                arguments: ['<word>'],
                explains: [
					'A word or sentence to search.'
				],
				example: 'synonym Hello'
			},
			cooldown: {
				users: new Map(),
				usage: 2,
				time: 5000
			}
		})
	}
	
	async run(msg, args) {
		if (!args.join('')) return msg.channel.send('Please enter the words to search.')

		const url = new URL(this.client.conf.api.synonym);
		let text = args.join('+');

		url.searchParams.set('ml', text);
		url.searchParams.set('max', 20);
		
		let synonyms = await fetch(url, {method: 'GET'})
			.then(res => res.json());

		let list = synonyms.map((syn, idx) => {
			let tags = syn.tags?.join(', ');

			return `${(idx + 1)}. ${syn.word} [_\`${tags || ' '}\`_]`;
		})

		let embed = new MessageEmbed()
			.setTitle(`Synonym of "${args.join(' ')}"`)
			.setColor(this.client.conf.color)
			.setDescription(list)
			.setTimestamp()
			.setFooter(`${this.client.conf.version} | Powered by Datamuse`);
		
		return msg.channel.send({embed: embed})
	}
}