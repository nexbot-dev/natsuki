const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const config = require('../../config');

class Weeb {
    constructor(request) {
        this.request = request;

        return this;
    }

    async getData() {
        const url = `${config.api.weeb.request}?type=${this.request.type}&nsfw=${this.request.nsfw}`;

        let fetched = await fetch(url, {
            method: 'GET'
        }).then(res => res.json());

        return fetched;
    }

    async makeEmbed() {
        let data = await this.getData();
        let filename = data.path.replace(/\/i\//, '');
        let imageURL = `${config.api.weeb.cdn}/${filename}`;

        let result = new MessageEmbed()
            .setTitle(`${filename}`)
            .setColor(config.color)
            .setURL(imageURL)
            .setImage(imageURL)
            .setTimestamp()
            .setFooter(config.version);

        return result.toJSON();
    }
}

module.exports = Weeb;