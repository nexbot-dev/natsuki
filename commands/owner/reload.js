const { Command } = require('aen-bot');
const { oneLine } = require('common-tags');
const path = require('path');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'reload',
			aliases: ['r'],
			group: 'owner',
			ownerOnly: true,
			help: {
				description: 'Reloads a command',
				arguments: ['<command>'],
				explains: ['The command name to be reloaded'],
				example: 'ping'
			}
		});
	}
	
	async run(msg, args) {
		let [cmd] = args, cmdName;
		
		if (!cmd) return msg.channel.send(`No command entered. Please specify a command to be reloaded.`);
		
		try {
			let cmdData = await this.client.command.find(c => c.name == cmd || c.aliases.includes(cmd));
			cmdName = cmdData;
		} catch (e) {
			console.log(e);
			return msg.channel.send(`Error: Command ${cmd} is not exist`);
		}
		
		// command cannot reloaded
		// wrong suspect: client.command is not having the entered command_name
		// correct suspect: cmd path uses backslash (\) but forwardslash (/) used to split
		try {
			let cmdpath = cmdName.path.split('\\');
			let dir = path.join(cmdpath[0], cmdpath[1]);
			let filename = cmdpath[2];
			
			await this.client.command.splice(this.client.command.findIndex(c => Object.is(c, cmdName)), 1);
			delete require.cache[require.resolve(path.join(this.client.basedir, cmdName.path))];
		
			await this.client.registry.registerCommand(this.client.basedir, dir, filename);
		
			return msg.channel.send(oneLine`
				Reloaded \`${cmdName.name}\` command
				${cmdName.aliases.length > 0 ? `with \`${cmdName.aliases}\` as aliases.`: ''}
			`)
		} catch (e) {
			console.log(`Error: Command ${cmd} can't be reloaded`)
		}
	}
}