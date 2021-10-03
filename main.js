const { AenBot } = require('aen-bot-dev');
const config = require('./config');

require('dotenv').config();

const client = new AenBot({
	disableMentions: 'everyone',
	basedir: __dirname,
	prefix: config.prefix,
	config: config
});

client.registry
.registerDefault()
.registerCommands([
	'animal',
	'fun',
	'weeb'
]);

client.login(process.env.TOKEN);