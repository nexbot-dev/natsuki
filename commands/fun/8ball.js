const { Command } = require('aen-bot');

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

		let random = num => Math.round(Math.random() * num), answer, reply;

		if (question.match())
	}
}