import { Client, type ClientOptions, Collection } from 'discord.js';
import { NexCommand } from '#core/NexCommand';
import { Registry } from '#core/NexRegistry';

export class NexClient extends Client {
	public readonly commands: Collection<string, NexCommand>;
	public readonly registry: Registry;

	public constructor(options: ClientOptions) {
		super(options);

		this.commands = new Collection();
		this.registry = new Registry(this);
	}
}