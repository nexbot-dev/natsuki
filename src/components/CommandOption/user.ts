import { SlashCommandUserOption } from 'discord.js';

interface UserOptionType {
	isRequired?: boolean;
}

export const UserOption = ({ isRequired }: UserOptionType) => (user: SlashCommandUserOption) => user
	.setName('user')
	.setDescription('The user account to target')
	.setRequired(isRequired ?? false);