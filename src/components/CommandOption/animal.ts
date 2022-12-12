import { SlashCommandStringOption } from 'discord.js';

export const AnimalChoices = (choices: SlashCommandStringOption) => choices
	.setName('show')
	.setDescription('What to show between image (default), fact, and both')
	.setRequired(false)
	.addChoices(
		{ name: 'image', value: 'image' },
		{ name: 'fact', value: 'fact' },
		{ name: 'both', value: 'both' },
	);