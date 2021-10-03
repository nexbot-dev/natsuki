const { Command } = require('aen-bot');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
            name: 'meme',
			group: 'fun',
			help: {
				description: 'Sends a meme to chat.'
			},
			cooldown: {
				users: new Map(),
				usage: 2,
				time: 5000
			}
		})
	}

    async run(msg) {
        const url = this.client.conf.api.sra.meme;
        const data = await fetch(url, {
            method: 'GET'
        }).then(res => res.json());
        
        const embed = new MessageEmbed()
                .setTitle(data.caption)
                .setColor(this.client.conf.color)
                .setImage(data.image)
                .setTimestamp()
                .setFooter(this.client.conf.version)
            
        return msg.channel.send({embed: embed});
    }
}