import dotenv from 'dotenv';
import { NexDeploy } from '../dist/core/NexDeploy.js';

dotenv.config();

(async function deployCommands() {
	const deployment = new NexDeploy(process.env.DISCORD_BOT_TOKEN);

	(await deployment.loadCommands()).deployToGlobal();
})();