import dotenv from 'dotenv';
import { GatewayIntentBits } from 'discord.js';
import { NexClient } from '#core/NexClient';

dotenv.config();

(function main() {
	const botToken = process.env.DISCORD_BOT_TOKEN;

	if (!botToken) return;

	const client = new NexClient({
		intents: [GatewayIntentBits.Guilds],
	});

	const registry = client.registry;

	registry.registerEvents();
	registry.registerCommands();

	client.login(botToken);
})();