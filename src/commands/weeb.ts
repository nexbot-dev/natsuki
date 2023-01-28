import { NexClient } from '#core/NexClient';
import { NexCommand } from '#core/NexCommand';
import { fetchData } from '#services/fetchData';
import {
	ChatInputCommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
} from 'discord.js';
import config from '#root/config';

interface ResultType {
	path: string,
	id: string,
	type: string,
	nsfw: string,
}

export class AppCommand extends NexCommand {
	constructor(client?: NexClient) {
		super(client);
	}

	buildApplicationCommand() {
		const slashCommand = new SlashCommandBuilder()
			.setName('weeb')
			.setDescription('Sends anime GIF or image');

		const weebTypeData = [
			'cry', 'cuddle', 'hug',
			'kiss', 'lick', 'nom',
			'pat', 'pout', 'slap',
			'smug', 'stare', 'tickle',
		];

		for (const weebType of weebTypeData) {
			slashCommand.addSubcommand(subcommand => subcommand
				.setName(weebType)
				.setDescription(`Sends ${weebType} animation from anime`),
			);
		}

		return slashCommand as SlashCommandBuilder;
	}

	async executeApplicationCommand(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();

		const weebType = interaction.options.getSubcommand();
		const result: ResultType = await fetchData({
			url: config.api.weeb.request,
			params: [
				['type', weebType],
				['nsfw', 'false'],
			],
		});

		const filename = result.path.replace('/i/', '');
		const url = new URL(filename, config.api.weeb.cdn);

		const embed = new EmbedBuilder()
			.setTitle(filename)
			.setColor(0xEE1280)
			.setImage(url.toString())
			.setFooter({ text: 'Powered by Ram Moe' });

		await interaction.editReply({
			embeds: [embed],
		});
	}
}