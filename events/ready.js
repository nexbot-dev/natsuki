const { log } = console;

module.exports = class {
	constructor(client) {
		this.client = client;
	}
	
	async run() {
		this.client.prefix.push(`<@${this.client.user.id}>`);
		
		log('CLIENT IS READY TO SERVE!');
		log(`Guilds   : ${this.client.guilds.cache.size}`);
		log(`Channels : ${this.client.channels.cache.size}`);
		log(`Users    : ${this.client.users.cache.size}`);

		this.client.user.setPresence({
			activity: {
				name: `Discord | ${this.client.prefix[0]} help`,
				type: 'PLAYING'
			},
			status: 'online'
		});
	}
}