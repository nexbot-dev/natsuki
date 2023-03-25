import { NexClient } from '#core/NexClient';
import { NexCommand } from '#core/NexCommand';
import {
	ChatInputCommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
} from 'discord.js';
import { GifType, getNekosBest } from '#services/getNekosBest';

export class NekoBestCommand extends NexCommand {
	public gifType: GifType;

	constructor(gifType: GifType, client?: NexClient) {
		super(client);

		this.gifType = gifType;
	}

	buildApplicationCommand() {
		return new SlashCommandBuilder()
			.setName(this.gifType)
			.setDescription(`Sends ${this.gifType} gif from anime`) as SlashCommandBuilder;
	}

	async executeApplicationCommand(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();

		const nekosbest = await getNekosBest(this.gifType);
		const neko = nekosbest.results[0];

		const embed = new EmbedBuilder()
			.setTitle(this.gifType)
			.setColor(0xEE1280)
			.setDescription(`Source: ${neko.anime_name}`)
			.setImage(neko.url)
			.setFooter({ text: 'Powered by Nekos Best' });

		await interaction.editReply({
			embeds: [embed],
		});
	}
}