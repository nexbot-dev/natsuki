const { Command, Paginator } = require('aen-bot');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
            name: 'urban',
            aliases: ['ud', 'urbandict'],
			group: 'utility',
			clientPermissions: ['EMBED_LINKS', 'MANAGE_MESSAGES'],
			help: {
				description: 'Check if today is your lucky day'
			},
			cooldown: {
				users: new Map(),
				usage: 2,
				time: 5000
			}
		})
	}
	
	async run(msg, args) {
		const url = new URL(this.client.conf.api.urban);
		let text = args.join(' ');

		url.searchParams.set('term', text);
		
		let fetched = await fetch(url, {method: 'GET'})
			.then(res => res.json());

		if (fetched.list.length === 0) {
			return msg.channel
				.send('***Sorry, that word wasn\'t found!***')
			  	.then(m => m.delete({}, 4000));
		}
		else if (fetched.list.length === 1) {
			return msg.channel.send(this.cmdCallback(fetched, 0, 1));
		}
		else {
			return new Paginator(this.client, msg, fetched.list, this.cmdCallback).collectReaction(this.fixLength);
		}
	}

	cmdCallback(data, index, max, funcCallback) {
		const text = data[index];
		const fixLength = funcCallback[0];

		let embed = new MessageEmbed()
			.setTitle(`Urban Meaning of ${text.word} [ID: ${text.defid}]`)
			.setURL(text.permalink)
			.setColor(this.client.conf.color)
			.setDescription(fixLength(text.definition, 2048))
			.addField('Example', fixLength(text.example, 1024))
			.addField('Author & Rating', `${text.author} [👍 ${text.thumbs_up} | 👎 ${text.thumbs_down} ]`)
			.setTimestamp()
			.setFooter(`${this.client.conf.version} | Page ${index+1}/${max}`);

		return {embed: embed};
	}

	fixLength(text, max_length) {
		text = text.replace(/\[|\]/g, '__');

		return text.length > max_length
			? `${text.slice(0, max_length-3)}...`
			: text.length === 0 ? 'None Provided': text;
	}
}