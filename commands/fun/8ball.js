const { Command } = require('aen-bot');
const { stripIndents } = require('common-tags');
const { EightBallAnswer } = require('../../index');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: '8ball',
			aliases: ['8b'],
			group: 'fun',
			help: {
				description: 'Ask the 8-ball',
				arguments: ['<question>'],
				explains: ['Question to ask, and must ends with a question mark (?) or i will not answer the question'],
				example: 'What are you talking about?'
			},
			cooldown: {
				users: new Map(),
				usage: 2,
				time: 5000
			}
		})
	}
	
	async run(msg, args) {
		let question = args.join(' ');

		if (!question.match(/\?$/)) return msg.channel.send('Please use question mark (?) at the end.');

		let random = num => Math.floor(Math.random() * num);

		let answer = await this.check(question);
		let choice = random(answer.length);
		let reply = answer[choice]
			.replace(/\[random1\]/g, random(10))
			.replace(/\[random2\]/g, random(100));

		msg.channel.send(stripIndents`
			🎱 **Question by:** ${msg.author.username}
			${question}
			\`\`\`${reply}\`\`\`
		`);
	}

	async check(question) {
		if (question.match(/^what/i)) return EightBallAnswer.WHAT;
		else if (question.match(/^who/i)) return EightBallAnswer.WHO;
		else if (question.match(/^where/i)) return EightBallAnswer.WHERE;
		else if (question.match(/^when/i)) return EightBallAnswer.WHEN;
		else if (question.match(/^why/i)) return EightBallAnswer.WHY;
		else if (question.match(/^how much/i)) return EightBallAnswer.HOW_MUCH;
		else if (question.match(/^how many/i)) return EightBallAnswer.HOW_MANY;
		else if (question.match(/^how/i)) return EightBallAnswer.HOW;
		else return EightBallAnswer.DEFAULT;
	}
}