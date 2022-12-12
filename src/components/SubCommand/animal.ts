import { SlashCommandSubcommandBuilder } from 'discord.js';
import { AnimalChoices } from '#components/CommandOption/animal';

export const AnimalSubcommand = (animalName: string) => (subcommand: SlashCommandSubcommandBuilder) => subcommand
	.setName(animalName)
	.setDescription(`Sends ${animalName} image or fact`)
	.addStringOption(AnimalChoices);