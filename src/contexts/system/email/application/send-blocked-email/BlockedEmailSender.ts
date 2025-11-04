import { Service } from "diod";

import { EventBus } from "../../../../shared/domain/events/EventBus";
import { UuidGenerator } from "../../../../shared/domain/UuidGenerator";
import { BlockedEmail } from "../../domain/BlockedEmail";
import { EmailSender } from "../../domain/EmailSender";

@Service()
export class BlockedEmailSender {
    constructor(
        private readonly uuidGenerator: UuidGenerator,
        private readonly emailSender: EmailSender,
        private readonly eventBus: EventBus
    ) {}

    async send(userId: string, name: string, emailAddress: string): Promise<void> {
        const email = BlockedEmail.send(await this.uuidGenerator.generate(), userId, name, emailAddress);

        await this.emailSender.send(email);
        await this.eventBus.publish(email.pullDomainEvents());
    }
}
