import type { NexClient } from '#core/NexClient';

const MetadataReadyEvent = {
	name: 'ready',
	once: true,
};

function ExecuteReadyEvent(client: NexClient) {
	console.log(`Ready! Logged in as ${client.user?.tag}`);
	console.log(`Guilds   : ${client.guilds.cache.size}`);
	console.log(`Channels : ${client.channels.cache.size}`);
	console.log(`Users    : ${client.users.cache.size}`);
}

export {
	MetadataReadyEvent as metadata,
	ExecuteReadyEvent as execute,
};