const { Command } = require('aen-bot');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
            name: 'joke',
            aliases: ['jokes', 'jk'],
			group: 'fun',
			help: {
				description: 'Sends a joke to chat.'
			},
			cooldown: {
				users: new Map(),
				usage: 2,
				time: 5000
			}
		})
	}

    async run(msg) {
        const data = await fetch(this.client.conf.api.icanhazdadjoke, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => res.json());

        return msg.channel.send(data.joke);
    }
}