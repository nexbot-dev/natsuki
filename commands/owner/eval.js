const { Command } = require('aen-bot');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'eval',
			aliases: ['ev', 'exec'],
			group: 'owner',
			ownerOnly: true,
			help: {
				description: 'Evaluates JavaScript code',
				arguments: ['<code>'],
				explains: ['Code to be executed/evaluated'],
				example: '2+2'
			}
		});
	}
	
	async run(msg, args) {
		let evaled, result;
		let code = args.join(' ');
		let timeStart = process.hrtime.bigint();
	
		try {
			evaled = eval(code);
		
			console.log(evaled);
			result = 'success';
		} catch (e) {
			evaled = e;

			console.log(e);
			result = 'fail';
		}

		let timeEnd = process.hrtime.bigint();
		let timeUsed = timeEnd - timeStart;
		let res = this.result(evaled, timeUsed, result);
	
		return msg.channel.send({embed: res.toJSON()});
	}

	result(res, time, result) {
		let embed = new MessageEmbed()

		if (result == 'success') {
			embed = embed
				.setTitle(`Eval Output`)
				.setColor('#00ee00')
				.setDescription(res)
				.addField('Type:', typeof res)
		} else {
			embed = embed
				.setTitle(`Error Output`)
				.setColor('#ee0000')
				.setDescription(res);
		}

		return embed.setFooter(`Executed in ${time}ns`);
	} 
}