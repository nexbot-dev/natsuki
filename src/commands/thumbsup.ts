import { NexClient } from '#core/NexClient';
import { NekoBestCommand } from '#components/Commands/nekosBest';

export class AppCommand extends NekoBestCommand {
	constructor(client?: NexClient) {
		super('thumbsup', '$user1 gives a thumbsup to $user2', client);
	}
}