import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { NexClient } from '#core/NexClient';

export class NexCommand {
	public readonly client?: NexClient;
	public interaction?: CommandInteraction;

	public constructor(client?: NexClient) {
		this.client = client;
		this.interaction;

		return this;
	}

	public buildApplicationCommand?(): SlashCommandBuilder;

	public async executeApplicationCommand?(interaction: CommandInteraction): Promise<unknown>;
}