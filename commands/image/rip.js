const { Command } = require('aen-bot');
const { MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'rip',
			group: 'image',
			help: {
				description: 'Check if today is your lucky day'
			},
			cooldown: {
				users: new Map(),
				usage: 2,
				time: 5000
			}
		})
	}
	
	async run(msg) {
		let w = 512, h = 512;

		let cvs = createCanvas(w, h);
		let pen = cvs.getContext('2d');

		let img = await loadImage(msg.author.displayAvatarURL({format: 'png', size: 2048}));

		pen.drawImage(img, 0, 0, w, h);
		pen.drawImage(img, w/4, h/4, w/2, h/2);

		let buffer = cvs.toBuffer();
		let attach = new MessageAttachment(buffer, 'rip.png');

		msg.channel.send({files: [attach]});
	}
}