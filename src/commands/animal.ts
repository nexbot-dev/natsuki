import { NexClient } from '#core/NexClient';
import { NexCommand } from '#core/NexCommand';
import {
	ChatInputCommandInteraction,
	SlashCommandBuilder,
	EmbedBuilder,
} from 'discord.js';
import { AnimalChoice } from '#components/CommandOption/animal';
import { fetchAnimalData } from '#services/animal';

export class AenexCommand extends NexCommand {
	constructor(client?: NexClient) {
		super(client);
	}

	buildApplicationCommand() {
		return new SlashCommandBuilder()
			.setName('animal')
			.setDescription('Sends animal image and facts')
			.addSubcommand(subcommand => subcommand
				.setName('bird')
				.setDescription('Sends bird image or facts')
				.addStringOption(AnimalChoice),
			)
			.addSubcommand(subcommand => subcommand
				.setName('cat')
				.setDescription('Sends cat image or facts')
				.addStringOption(AnimalChoice),
			)
			.addSubcommand(subcommand => subcommand
				.setName('dog')
				.setDescription('Sends dog image or facts')
				.addStringOption(AnimalChoice),
			)
			.addSubcommand(subcommand => subcommand
				.setName('panda')
				.setDescription('Sends panda image or facts')
				.addStringOption(AnimalChoice),
			);
	}

	async executeApplicationCommand(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();

		const animal = interaction.options.getSubcommand();
		const choice = interaction.options.getString('show');
		const result = await fetchAnimalData(animal);

		const embed = new EmbedBuilder()
			.setTitle(`Image of ${animal}`)
			.setColor(0xEE1280)
			.setFooter({ text: 'Powered by Some-Random-API' });

		if (choice === 'facts') {
			embed.setDescription(result.fact);
		}
		else if (choice === 'both') {
			embed.setDescription(result.fact).setImage(result.image);
		}
		else {
			embed.setImage(result.image);
		}

		await interaction.editReply({ embeds: [embed] });
	}
}