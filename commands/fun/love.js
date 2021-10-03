const { Command } = require('aen-bot');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'love',
			aliases: ['match', 'ship'],
			group: 'fun',
			help: {
				description: 'Match/ship 2 peoples with love meter. **NOTE: use comma to separate the user.**',
				arguments: ['<user1>', '<user2>'],
				explains: ['User to be matched/shipped', 'User to be matched to user1'],
				example: '@Natsuki @Sayori'
			},
			cooldown: {
				users: new Map(),
				usage: 2,
				time: 5000
			}
		})
	}
	
	async run(msg, args) {
		let user = args.join(' ');
		
		if (!user) {
			return msg.channel.send('Please type two names to match.');
		}

		if (!user.includes(',')) {
			return msg.channel.send('Use a comma to separate each user to match.');
		}
		
		user = user.split(/,+/).map(u => u.trim());
		
		if (user[0] == "" || user[1] == "") {
			return msg.channel.send('Enter both user\'s name in there.');
		}

		const pts = ['░', '█'];
        const res = [
			'Not good, try again next time...',
			'Try again next time...',
			'Good enough.',
			'Good match.',
			'Your love is very nice.',
			'Perfect!',
			'You should live yourself more than other peoples.'
		];

		var meter = [];
		var random = Math.ceil(Math.random() * 100);
		var empty = 100 - random;
		var result = random == 100 ? res[5] :
			random >= 90 ? res[4] :
			random >= 70 ? res[3] :
			random >= 55 ? res[2] :
			random >= 35 ? res[1] : res[0];

		if (user[1] == user[2]) {
			random = 100;
			empty = 0;
			result = res[res.length - 1];
		}

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
			.setTitle('💕 Love Meter 💕')
			.setColor(this.client.conf.color)
			.setDescription(stripIndents`
				💗 ${user[0]}
				💗 ${user[1]}

				${random}% | ${result}
				${meter.join('')}
			`)
			.setTimestamp()
			.setFooter(this.client.conf.version);

		msg.channel.send({embed: embed.toJSON()})
	}
}