const { AenBot } = require('aen-bot');
const config = require('./config');

require('dotenv').config();

const client = new AenBot({
	everyone: false,
	basedir: __dirname,
	prefix: config.prefix,
	config: config
});

client.registerDefaultEvents();
client.registerDefaultCommands();
client.registerCommands([
	'animal'
]);

client.login(process.env.TOKEN);