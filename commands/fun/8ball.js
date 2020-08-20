const { Command } = require('aen-bot');
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
				usage: 1,
				time: 8000
			}
		})
	}
	
	async run(msg, args) {
		let question = args.join(' ');

		if (!question.match(/\?$/)) return msg.channel.send('Please use question mark (?) at the end.');

		let answer, reply;

		if (question.match(/^what/i)) answer = EightBallAnswer.WHAT;
		else if (question.match(/^who/i)) answer = EightBallAnswer.WHO;
		else if (question.match(/^where/i)) answer = EightBallAnswer.WHERE;
		else if (question.match(/^when/i)) answer = EightBallAnswer.WHEN;
		else if (question.match(/^why/i)) answer = EightBallAnswer.WHY;
		else if (question.match(/^how much/i)) answer = EightBallAnswer.HOW_MUCH;
		else if (question.match(/^how many/i)) answer = EightBallAnswer.HOW_MANY;
		else if (question.match(/^how/i)) answer = EightBallAnswer.HOW;
		else answer = EightBallAnswer.DEFAULT;

		let reply = answer[0];

		msg.channel.send(question+'\nAnswer: '+reply);
	}
}