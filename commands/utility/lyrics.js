const { Command } = require('aen-bot');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'lyrics',
            aliases: ['lyric', 'lyr'],
            group: 'utility',
            help: {
                description: 'Search for a lyrics.',
                arguments: ['<song>'],
                explains: ['The song name that you want to search the lyrics.'],
                example: ''
            },
            cooldown: {
                users: new Map(),
                usage: 2,
                time: 10000
            }
        })
    }

    async run(msg) {

    }
}