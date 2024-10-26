import { Service } from "diod";
import { UserRegisteredDomainEvent } from "../../../../cma/users/domain/event/UserRegisteredDomainEvent";
import { DomainEventName } from "../../../../shared/domain/event/DomainEventName";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { WelcomeEmailSender } from "./WelcomeEmailSender";

@Service()
export class SendWelcomeEmailOnUserRegistered implements DomainEventSubscriber<UserRegisteredDomainEvent> {
    constructor(private readonly sender: WelcomeEmailSender) {}

    async on(event: UserRegisteredDomainEvent): Promise<void> {
        await this.sender.send(event.id, event.name, event.email);
    }

    subscribedTo(): DomainEventName<UserRegisteredDomainEvent>[] {
        return [UserRegisteredDomainEvent];
    }

    name(): string {
        return "pnfi.cartelera.send_welcome_email_on_user_registered";
    }
}