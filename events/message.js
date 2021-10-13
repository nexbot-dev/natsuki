const { CommandValidator } = require('aen-bot');

module.exports = class {
	constructor(client) {
		this.client = client;
	}
	
	async run (msg) {
		if (msg.author.bot) return;
		
		var pref = false;

		for (var confix of this.client.prefix) {
			if (msg.content.toLowerCase().startsWith(confix)) pref = confix;
		}
		
		if (!msg.content.toLowerCase().startsWith(pref)) return;
		
		let args = msg.content.slice(pref.length).trim().split(/ +/g);
		let cmd = args.shift().toLowerCase();
		
		let command = this.client.command.find(c => c.name == cmd || c.aliases.includes(cmd))
		
		if (!command) return;
		
		const validation = new CommandValidator(this.client, msg);
		const validRes = validation.validateCommand({
			owner: command.owner,
			guild: command.guild,
			//donor: command.donor,
			nsfw: command.nsfw,
			cPerms: command.Cperms,
			uPerms: command.Uperms,
			cooldown: command.cooldown
		});
		
		if (validRes === true) return command.run(msg, args);
		else return;
	}
}