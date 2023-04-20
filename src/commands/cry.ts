import { NexClient } from '#core/NexClient';
import { NekoBestCommand } from '#components/Commands/nekosBest';

export class AppCommand extends NekoBestCommand {
	constructor(client?: NexClient) {
		super('cry', '$user2 is crying', client);
	}
}