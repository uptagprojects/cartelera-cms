import { Service } from "diod";

import { EventBus } from "../../../../shared/domain/event/EventBus";
import { UuidGenerator } from "../../../../shared/domain/UuidGenerator";
import { EmailSender } from "../../domain/EmailSender";
import { UserUpdatedNotificationEmail } from "../../domain/UserUpdatedNotificationEmail";

@Service()
export class UserUpdatedNotificationEmailSender {
	constructor(
		private readonly uuidGenerator: UuidGenerator,
		private readonly emailSender: EmailSender,
		private readonly eventBus: EventBus
	) {}

	async send(
		userId: string,
		name: string,
		propertyUpdated: string,
		emailAddress: string
	): Promise<void> {
		const email = UserUpdatedNotificationEmail.send(
			await this.uuidGenerator.generate(),
			userId,
			name,
			propertyUpdated,
			emailAddress
		);

		await this.emailSender.send(email);
		await this.eventBus.publish(email.pullDomainEvents());
	}
}
