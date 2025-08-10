import { Service } from "diod";

import { EventBus } from "../../../../shared/domain/event/EventBus";
import { UuidGenerator } from "../../../../shared/domain/UuidGenerator";
import { EmailSender } from "../../domain/EmailSender";
import { WelcomeEmail } from "../../domain/WelcomeEmail";

@Service()
export class WelcomeEmailSender {
	constructor(
		private readonly uuidGenerator: UuidGenerator,
		private readonly emailSender: EmailSender,
		private readonly eventBus: EventBus
	) {}

	async send(userId: string, name: string, emailAddress: string, presenterName: string, presenterEmailAddress: string): Promise<void> {
		const email = WelcomeEmail.send(
			await this.uuidGenerator.generate(),
			userId,
			name,
			emailAddress,
			presenterName,
			presenterEmailAddress,
		);

		await this.emailSender.send(email);
		await this.eventBus.publish(email.pullDomainEvents());
	}

	private generateConfirmationUrl() {
		return `https://pnfi.pro/confirm?`
	}
}
