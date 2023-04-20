import { NexClient } from '#core/NexClient';
import { NekoBestCommand } from '#components/Commands/nekosBest';

export class AppCommand extends NekoBestCommand {
	constructor(client?: NexClient) {
		super('feed', '$user1 feeds $user2', client);
	}
}