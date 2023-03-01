import { NexClient } from '#core/NexClient';
import { NexCommand } from '#core/NexCommand';
import {
	ChatInputCommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
	italic,
} from 'discord.js';
import { fetchData } from '#services/fetchData';
import config from '#root/config';
import { stripIndents } from 'common-tags';

interface ResultType {
	anime: string,
	character: string,
	quote: string,
}

export class AppCommand extends NexCommand {
	constructor(client?: NexClient) {
		super(client);
	}

	buildApplicationCommand() {
		return new SlashCommandBuilder()
			.setName('quote')
			.setDescription('Views random quote from anime')
			.addStringOption(option => option
				.setName('getby')
				.setDescription('Gets the quote either by anime name or character name')
				.setRequired(false)
				.addChoices(
					{ name: 'Anime Title', value: 'anime' },
					{ name: 'Character Name', value: 'character' },
				),
			)
			.addStringOption(option => option
				.setName('name')
				.setDescription('The name of anime/character')
				.setRequired(false),
			) as SlashCommandBuilder;
	}

	async executeApplicationCommand(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();

		const getBy = interaction.options.getString('getby');
		const name = interaction.options.getString('name');

		if (getBy !== null && name === null) {
			return await interaction
				.editReply('You must enter the name, if you are going to get a quote by anime or character');
		}
		if (getBy === null && name !== null) {
			return await interaction
				.editReply('You must enter a choice between anime and character, if you are going to get a quote by name');
		}

		let result: ResultType;

		if (getBy === 'character' && name !== null) {
			result = await fetchData({
				url: config.api.animechan.char,
				params: [
					['name', name],
				],
			});
		}
		else if (getBy === 'anime' && name !== null) {
			result = await fetchData({
				url: config.api.animechan.anime,
				params: [
					['title', name],
				],
			});
		}
		else {
			result = await fetchData({
				url: config.api.animechan.random,
			});
		}

		if (result && !result.quote) {
			return await interaction
				.editReply(`Sorry, no quote is found by ${getBy} of ${name}`);
		}

		const italizedSource = italic<string>(`${result.character} (${result.anime})`);

		const embed = new EmbedBuilder()
			.setTitle('Anime Quote')
			.setColor(0xEE1280)
			.setDescription(stripIndents`
			${result.quote}
			
			-- ${italizedSource}
			`)
			.setFooter({ text: 'Powered by Animechan API' });

		await interaction.editReply({
			embeds: [embed],
		});
	}
}