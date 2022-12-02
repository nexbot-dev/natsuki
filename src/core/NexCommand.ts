import { CommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from 'discord.js';
import { NexClient } from '#core/NexClient';

export class NexCommand {
	public readonly client?: NexClient;
	public interaction?: CommandInteraction;

	public constructor(client?: NexClient) {
		this.client = client;
		this.interaction;

		return this;
	}

	public buildApplicationCommand?(): SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;

	public async executeApplicationCommand?(interaction: CommandInteraction): Promise<unknown>;
}