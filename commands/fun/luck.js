const { Command } = require('aen-bot');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'luck',
			aliases: ['myluck'],
			group: 'fun',
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
	
	async run(msg) {
		let user = msg.author.username

		const pts = ['░', '█'];
        const res = [
            'Bad karma for today',
            'This is your unlucky day',
            'Try again next day...',
            'Your luck is good.',
            'This is your lucky day.',
            'Good karma is staring at you.'
		];

		var meter = [];
		var random = Math.ceil(Math.random() * 100);
		var empty = 100 - random;
		var result = random == 100 ? res[5] :
			random >= 90 ? res[4] :
			random >= 70 ? res[3] :
			random >= 55 ? res[2] :
			random >= 35 ? res[1] : res[0];

		for (let i=random; i>=0;) {
			if (i == 3) i -= 3;
			if (i == 2) i -= 2;
			if (i == 1) i -= 1;

			i -= 4;
			meter.push(pts[1]);
		}

		for (let i=empty; i>=0; i-=4) {
			if (i > 4 || i < 4 && i != 0) meter.push(pts[0]);
		}

		const embed = new MessageEmbed()
			.setTitle('🍀 Luck Meter 🍀')
			.setColor(this.client.conf.color)
			.setDescription(stripIndents`
				${user} | ${random}% | ${result}
				${meter.join('')}
			`)
			.setTimestamp()
			.setFooter(this.client.conf.version);

		msg.channel.send({embed: embed.toJSON()})
	}
}