import { NexClient } from '#core/NexClient';
import { NekoBestCommand } from '#components/Commands/nekosBest';

export class AppCommand extends NekoBestCommand {
	constructor(client?: NexClient) {
		super('shoot', '$user1 shoots $user2', client);
	}
}