import { REST, Routes, RESTPostAPIApplicationCommandsJSONBody } from 'discord.js';
import readDirectory from '#libs/readDirectory';
import { NexCommand } from '#core/NexCommand';
import config from '#root/config';

export class NexDeploy {
	readonly #token: string;
	readonly #commands: Array<RESTPostAPIApplicationCommandsJSONBody>;
	readonly #rest: REST;

	public constructor(token: string) {
		this.#token = token;
		this.#commands = [];
		this.#rest = new REST({
			version: '10',
		}).setToken(this.#token);

		return this;
	}

	public async loadCommands() {
		const { directoryPath, filteredFiles } = await readDirectory('./../commands');

		for (const file of filteredFiles) {
			const filePath = new URL(`./commands/${file}`, directoryPath).href;
			const { AenexCommand } = await import(filePath);
			const command: NexCommand = new AenexCommand();

			if (command.buildApplicationCommand?.() === undefined) continue;

			this.#commands.push(command.buildApplicationCommand().toJSON());
		}

		return this;
	}

	public deployToGlobal() {
		this.#rest
			.put(Routes.applicationCommands(config.clientId), {
				body: this.#commands,
			})
			.then(() => (
				console.log('Successfully registered global application commands.')
			))
			.catch(console.error);
	}

	public deployToServer() {
		for (const guild of config.guilds) {
			this.#rest
				.put(Routes.applicationGuildCommands(config.clientId, guild.guildId), {
					body: this.#commands,
				})
				.then(() => (
					console.log(`Successfully registered application commands in ${guild.guildName}.`)
				))
				.catch(console.error);
		}
	}
}