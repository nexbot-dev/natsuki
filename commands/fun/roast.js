const { Command } = require('aen-bot');
const randomInt = require('../../src/utils/randomNumberGenerator');
const { Roasts } = require('../../index');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
            name: 'roast',
			group: 'fun',
			help: {
				description: 'Roasts somebody, or yourself.'
			},
			cooldown: {
				users: new Map(),
				usage: 2,
				time: 5000
			}
		})
	}

    async run(msg) {
        const choice = randomInt(0, Roasts.length);
        const text = Roasts[choice];

        return msg.channel.send(text);
    }
}
    