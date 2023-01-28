import { NexClient } from '#core/NexClient';
import { NexCommand } from '#core/NexCommand';
import { UserOption } from '#components/CommandOption/user';
import {
	ChatInputCommandInteraction,
	SlashCommandBuilder,
} from 'discord.js';
import { roasts } from '#data/roasts';
import { rng } from '#libs/rng';

export class AppCommand extends NexCommand {
	constructor(client?: NexClient) {
		super(client);
	}

	buildApplicationCommand() {
		return new SlashCommandBuilder()
			.setName('roast')
			.setDescription('Roast people with random roast')
			.addUserOption(UserOption({
				isRequired: true,
			})) as SlashCommandBuilder;
	}

	async executeApplicationCommand(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();

		const random = rng(roasts.length);
		const user = interaction.options.getUser('user');

		await interaction.editReply({
			content: `${user?.username} ${roasts[random]}`,
		});
	}
}