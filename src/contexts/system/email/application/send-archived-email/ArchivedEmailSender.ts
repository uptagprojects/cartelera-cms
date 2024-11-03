import { Service } from "diod";

import { EventBus } from "../../../../shared/domain/event/EventBus";
import { UuidGenerator } from "../../../../shared/domain/UuidGenerator";
import { ArchivedEmail } from "../../domain/ArchivedEmail";
import { EmailSender } from "../../domain/EmailSender";

@Service()
export class ArchivedEmailSender {
	constructor(
		private readonly uuidGenerator: UuidGenerator,
		private readonly emailSender: EmailSender,
		private readonly eventBus: EventBus
	) {}

	async send(userId: string, name: string, emailAddress: string): Promise<void> {
		const email = ArchivedEmail.send(
			await this.uuidGenerator.generate(),
			userId,
			name,
			emailAddress
		);

		await this.emailSender.send(email);
		await this.eventBus.publish(email.pullDomainEvents());
	}
}
