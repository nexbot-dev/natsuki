const { Command } = require('aen-bot');
const { oneLine } = require('common-tags');
const path = require('path');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'unload',
			aliases: ['u'],
			group: 'owner',
			ownerOnly: true,
			help: {
				description: 'Unloads a command',
				arguments: ['<command>'],
				explains: ['The command name to be unloaded'],
				example: 'ping'
			}
		});
	}
	
	async run(msg, args) {
		let [grp, cmd] = args;
		
		if (!grp || !cmd) return msg.channel.send(`No group/command entered. Please specify a group/command to be unloaded.`);
		
		let cmdData = this.client.command.find(c => c.name == cmd || c.aliases.includes(cmd));
		
		if (!cmdData) {
			return msg.channel.send(`Command ${cmd} not exist`);
		}
		
		try {
			let dir = cmdData.path;
		
			let indexGroup = this.client.group.findIndex(arr => arr[0] == grp);
			let indexCmd = this.client.group[indexGroup][1].findIndex(index => index == cmd);
			
			await this.client.group[indexGroup][1].splice(indexCmd, 1);

			await this.client.command.splice(this.client.command.findIndex(c => Object.is(c, cmdData)), 1);
			delete require.cache[require.resolve(path.join(this.client.basedir, dir))];
		
			return msg.channel.send(oneLine`
				Unloaded \`${cmdData.name}\` command
				${cmdData.aliases.length > 0 ? `with \`${cmdData.aliases}\` as aliases.`: ''}
			`)
		} catch (e) {
			console.log(`Error: Command ${cmd} can't be unloaded`)
		}
	}
}