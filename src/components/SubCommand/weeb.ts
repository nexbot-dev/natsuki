import { SlashCommandSubcommandBuilder } from 'discord.js';

export const WeebSubcommand = (weebType: string) => (subcommand: SlashCommandSubcommandBuilder) => subcommand
	.setName(weebType)
	.setDescription(`Sends ${weebType} animation from anime`);