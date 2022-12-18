import { NexClient } from '#core/NexClient';
import { NexCommand } from '#core/NexCommand';
import { AnimalSubcommand } from '#components/SubCommand/animal';
import { fetchData } from '#services/fetchData';
import {
	SlashCommandBuilder,
	EmbedBuilder,
	type ChatInputCommandInteraction,
} from 'discord.js';
import config from '#root/config';

interface ResultType {
	image: string,
	fact: string,
}

export class AppCommand extends NexCommand {
	constructor(client?: NexClient) {
		super(client);
	}

	buildApplicationCommand() {
		const slashCommand = new SlashCommandBuilder()
			.setName('animal')
			.setDescription('Sends animal image and fact');

		const animalNameData = [
			'bird', 'cat', 'dog',
			'fox', 'panda',
		];

		for (const animalName of animalNameData) {
			slashCommand.addSubcommand(AnimalSubcommand(animalName));
		}

		return slashCommand as SlashCommandBuilder;
	}

	async executeApplicationCommand(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();

		const animal = interaction.options.getSubcommand();
		const choice = interaction.options.getString('show');

		const result: ResultType = await fetchData({
			url: new URL(animal, config.api.sra.animal),
		});

		const embed = new EmbedBuilder()
			.setTitle(`Image of ${animal}`)
			.setColor(0xEE1280)
			.setFooter({ text: 'Powered by Some Random API' });

		if (choice === 'image' || choice === undefined) {
			embed.setImage(result.image);
		}
		if (choice === 'fact') {
			embed.setDescription(result.fact);
		}
		if (choice === 'both') {
			embed
				.setDescription(result.fact)
				.setImage(result.image);
		}

		await interaction.editReply({ embeds: [embed] });
	}
}