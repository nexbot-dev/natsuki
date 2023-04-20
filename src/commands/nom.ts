import { NexClient } from '#core/NexClient';
import { NekoBestCommand } from '#components/Commands/nekosBest';

export class AppCommand extends NekoBestCommand {
	constructor(client?: NexClient) {
		super('nom', '$user2 is eating, nom... nom...', client);
	}
}