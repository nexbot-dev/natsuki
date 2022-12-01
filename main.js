const { AenBot } = require('aen-bot-dev');
const config = require('./config');

require('dotenv').config();

const client = new AenBot({
	disableMentions: 'everyone',
	basedir: __dirname,
	prefix: config.prefix,
	config: config
});

client.registry.register({
	eventDirectory: 'events',
	commandDirectory: 'commands',
	commandGroup: [
		'animal',
		'fun',
		'general',
		'owner',
		'weeb'
	]
});

client.login(process.env.TOKEN);