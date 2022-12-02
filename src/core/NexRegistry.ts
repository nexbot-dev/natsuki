import readDirectory from '#libs/readDirectory';
import type { NexClient } from './NexClient';
import type { Interaction } from 'discord.js';
import { URL } from 'node:url';
import { NexCommand } from './NexCommand';

export interface EventType {
	metadata: {
		name: string,
		once?: boolean
	};
	execute: (client: NexClient, interaction: Interaction, ...args: unknown[]) => void;
}

export class Registry {
	readonly #client: NexClient;

	public constructor(client: NexClient) {
		this.#client = client;

		return this;
	}

	async #registerEvent(fileName: string, directoryPath: URL) {
		const filePath = new URL(`./events/${fileName}`, directoryPath).href;
		const event: EventType = await import(filePath);

		if (event.metadata.once) {
			this.#client.once(event.metadata.name, (...args) => event.execute(this.#client, args[0], ...args));
		}
		else {
			this.#client.on(event.metadata.name, (...args) => event.execute(this.#client, args[0], ...args));
		}
	}

	public async registerEvents() {
		const { directoryPath, filteredFiles } = await readDirectory('./../events');

		for (const file of filteredFiles) {
			await this.#registerEvent(file, directoryPath);
		}

		return this;
	}

	async #registerCommand(fileName: string, directoryPath: URL) {
		const filePath = new URL(`./commands/${fileName}`, directoryPath).href;
		const { AenexCommand } = await import(filePath);
		const command: NexCommand = new AenexCommand(this.#client);

		if (command.buildApplicationCommand?.() === undefined) {
			return;
		}

		this.#client.commands.set(command.buildApplicationCommand().name, command);
	}

	public async registerCommands() {
		const { directoryPath, filteredFiles } = await readDirectory('./../commands');

		for (const file of filteredFiles) {
			await this.#registerCommand(file, directoryPath);
		}

		return this;
	}
}