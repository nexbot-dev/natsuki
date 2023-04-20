import { NexClient } from '#core/NexClient';
import { NexCommand } from '#core/NexCommand';
import {
	ChatInputCommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
} from 'discord.js';
import { GifType, getNekosBest } from '#services/getNekosBest';
import { UserOption } from '#components/CommandOption/user';

export class NekoBestCommand extends NexCommand {
	public gifType: GifType;
	public gifText: string;

	constructor(gifType: GifType, gifText: string, client?: NexClient) {
		super(client);

		this.gifType = gifType;
		this.gifText = gifText;
	}

	buildApplicationCommand() {
		return new SlashCommandBuilder()
			.setName(this.gifType)
			.setDescription(`Sends ${this.gifType} gif from anime`)
			.addUserOption(UserOption({
				isRequired: true,
			})) as SlashCommandBuilder;
	}

	async executeApplicationCommand(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();

		const nekosbest = await getNekosBest(this.gifType);
		const neko = nekosbest.results[0];

		const user1 = interaction.user.username;
		const user2 = interaction.options.getUser('user')?.username;

		if (!user2) return;

		const titleText = this.gifText
			.replace('$user1', user1)
			.replace('$user2', user2);

		const embed = new EmbedBuilder()
			.setTitle(titleText)
			.setColor(0xEE1280)
			.setDescription(`Source: ${neko.anime_name}`)
			.setImage(neko.url)
			.setFooter({ text: 'Powered by Nekos Best' });

		await interaction.editReply({
			embeds: [embed],
		});
	}
}