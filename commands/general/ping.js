const { Command } = require('aen-bot');
const { oneLine } = require('common-tags');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			aliases: ['test'],
			group: 'general',
			help: {
				description: 'Do a ping test to check bot\'s connection to Discord'
			}
		})
	}
	
	async run(msg) {
		const ping = await msg.channel.send('🏓 Pong!');
		
		return ping.edit(oneLine`
			🏓 Pong! (⏱️ Roundtrip took: ${ping.createdTimestamp - msg.createdTimestamp}ms.
			${this.client.ws.ping ? `💓 Heartbeat: ${this.client.ws.ping.toFixed(0)}ms.` : ''})
		`)
	}
}