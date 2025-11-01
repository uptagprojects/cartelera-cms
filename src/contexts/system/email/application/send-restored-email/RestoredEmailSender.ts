import { Service } from "diod";

import { EventBus } from "../../../../shared/domain/event/EventBus";
import { UuidGenerator } from "../../../../shared/domain/UuidGenerator";
import { EmailSender } from "../../domain/EmailSender";
import { RestoredEmail } from "../../domain/RestoredEmail";

@Service()
export class RestoredEmailSender {
    constructor(
        private readonly uuidGenerator: UuidGenerator,
        private readonly emailSender: EmailSender,
        private readonly eventBus: EventBus
    ) {}

    async send(userId: string, name: string, emailAddress: string): Promise<void> {
        const email = RestoredEmail.send(await this.uuidGenerator.generate(), userId, name, emailAddress);

        await this.emailSender.send(email);
        await this.eventBus.publish(email.pullDomainEvents());
    }
}
