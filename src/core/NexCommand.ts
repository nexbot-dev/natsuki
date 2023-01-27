import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { NexClient } from '#core/NexClient';

export class NexCommand {
	public readonly client?: NexClient;

	public constructor(client?: NexClient) {
		this.client = client;

		return this;
	}

	public buildApplicationCommand?(): SlashCommandBuilder;

	public async executeApplicationCommand?(interaction: CommandInteraction): Promise<unknown>;
}