import { SlashCommandStringOption } from 'discord.js';

export const AnimalChoice = (choices: SlashCommandStringOption) => choices
	.setName('show')
	.setDescription('What to show between image (default), facts, and both')
	.setRequired(false)
	.addChoices(
		{ name: 'image', value: 'image' },
		{ name: 'facts', value: 'facts' },
		{ name: 'both', value: 'both' },
	);