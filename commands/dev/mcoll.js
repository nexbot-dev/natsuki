const { Command } = require('aen-bot');
//const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'mcoll',
			group: 'dev',
			help: {
				description: 'Check if today is your lucky day'
			}
		})
	}
	
	async run(msg) {
		const db = ['0', '1', '2', 'ABORT'];
		const regex = new RegExp(db.join('|'), 'i')
        
        const filter = m => m.author.id === msg.author.id;
        const collector = msg.channel.createMessageCollector(filter, {time: 10000});

        collector.on('collect', m => {
			if (m.content.match(regex)) {
				msg.channel.send('Data collected')
				return collector.stop()
			}
		});
		collector.on('end', c => console.log(`Collected ${c.size} items: ${c.map(m => m.content).join(', ')}`))
		
		console.log(collector.collected)
	}
}