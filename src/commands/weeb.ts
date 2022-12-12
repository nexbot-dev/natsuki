import { NexClient } from '#core/NexClient';
import { NexCommand } from '#core/NexCommand';
import { fetchWeebData } from '#services/weeb';
import { WeebSubcommand } from '#components/SubCommand/weeb';
import {
	ChatInputCommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
} from 'discord.js';

export class AenexCommand extends NexCommand {
	declare public interaction: ChatInputCommandInteraction;

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
			slashCommand.addSubcommand(WeebSubcommand(weebType));
		}

		return slashCommand;
	}

	async executeApplicationCommand(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();

		const weebType = interaction.options.getSubcommand();
		const result = await fetchWeebData({
			type: weebType,
			isNsfw: false,
		});

		const embed = new EmbedBuilder()
			.setTitle(result.filename)
			.setColor(0xEE1280)
			.setImage(result.url.toString())
			.setFooter({ text: 'Powered by Ram Moe' });

		await interaction.editReply({ embeds: [embed] });
	}
}