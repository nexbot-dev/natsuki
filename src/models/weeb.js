const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const config = require('../../config');

class Weeb {
    constructor(request) {
        this.request = request;

        return this;
    }

    async getData() {
        const url = config.api.weeb.request + `?type=${this.request}`;

        let fetched = await fetch(url, {method: 'GET'})
            .then(res => res.json());

        return fetched;
    }

    async makeEmbed() {
        let data = await this.getData();
        let path = data.path.replace(/\/i/i, '');
        let imageURL = config.api.weeb.cdn + path;

        let result = new MessageEmbed()
            .setTitle(`${this.request}.gif`)
            .setColor(config.color)
            .setURL(imageURL)
            .setImage(imageURL)
            .setTimestamp()
            .setFooter(config.version);

        return result.toJSON();
    }
}

module.exports = Weeb;