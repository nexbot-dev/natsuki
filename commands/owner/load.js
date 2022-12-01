const { Command } = require('aen-bot');
const { oneLine } = require('common-tags');
const path = require('path');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'load',
			aliases: ['l'],
			group: 'owner',
			ownerOnly: true,
			help: {
				description: 'Loads a command',
				arguments: ['<group>', '<command>'],
				explains: [
					'The name of command group, where the command to be loaded belongs',
					'The command name to be loaded'
				],
				example: 'load utility userinfo'
			}
		});
	}
	
	async run(msg, args) {
		let [grp, cmd] = args;
		
		if (!grp || !cmd) return msg.channel.send(`No group/command entered. Please specify a group/command to be loaded.`);
		
		let cmdData = this.client.command.find(c => c.name == cmd);
		
		if (cmdData) {
			return msg.channel.send(`Error: Command ${cmd} is already registered`);
		}
			
		try {
			let dir = path.join('commands', grp);
			let file = `${cmd}.js`;
	
			await this.client.registry.registerCommand(this.client.basedir, dir, file);

			let cmdName = this.client.command.find(c => c.name == cmd)
			let indexGroup = this.client.group.findIndex(arr => arr[0] == grp);

			if (indexGroup >= 0) {
				await this.client.group[indexGroup][1].push(cmdName.name);
			}
			else {
				await this.client.group.push([grp, [cmdName.name]]);
			}
			
			return msg.channel.send(oneLine`
				Loaded \`${cmdName.name}\` command
				${cmdName.aliases.length > 0 ? `with \`${cmdName.aliases}\` as aliases.`: ''}
			`)
		} catch (e) {
			console.log(`Error: Command ${cmd} can't be loaded\n${e}`)
		}
	}
}