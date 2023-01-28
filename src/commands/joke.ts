import { NexClient } from '#core/NexClient';
import { NexCommand } from '#core/NexCommand';
import { fetchData } from '#services/fetchData';
import {
	ChatInputCommandInteraction,
	SlashCommandBuilder,
} from 'discord.js';
import config from '#root/config';

interface ResultType {
	joke: string,
}

export class AppCommand extends NexCommand {
	constructor(client?: NexClient) {
		super(client);
	}

	buildApplicationCommand() {
		return new SlashCommandBuilder()
			.setName('joke')
			.setDescription('Sends a random joke');
	}

	async executeApplicationCommand(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();

		const result: ResultType = await fetchData({
			url: config.api.icanhazdadjoke,
		});

		await interaction.editReply({
			content: result.joke,
		});
	}
}