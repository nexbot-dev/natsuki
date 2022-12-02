import type { NexClient } from '#core/NexClient';
import type { Interaction } from 'discord.js';

const MetadataInteractionCreateEvent = {
	name: 'interactionCreate',
};

async function ExecuteInteractionCreateEvent(client: NexClient, interaction: Interaction) {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (command === undefined) return;

	try {
		command.executeApplicationCommand?.(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({
			content: 'There was an error while executing this command!',
			ephemeral: true,
		});
	}
}

export {
	MetadataInteractionCreateEvent as metadata,
	ExecuteInteractionCreateEvent as execute,
};