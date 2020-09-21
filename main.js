const { AenBot } = require('aen-bot-dev');
const config = require('./config');

require('dotenv').config();

const client = new AenBot({
	everyone: false,
	basedir: __dirname,
	prefix: config.prefix,
	config: config
});

client.registry
.registerDefault()
.registerCommands([
	'animal',
	'anime',
	'dev'
]);

client.login(process.env.TOKEN);