import { Service } from "diod";

import { UserEmailUpdatedDomainEvent } from "../../../../cma/users/domain/events/UserEmailUpdatedDomainEvent";
import { UserFinder } from "../../../../cma/users/domain/UserFinder";
import { DomainEventClass } from "../../../../shared/domain/events/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/events/DomainEventSubscriber";
import { UserUpdatedNotificationEmailSender } from "./UserUpdatedNotificationEmailSender";

@Service()
export class SendNotificationEmailOnUserEmailChanged implements DomainEventSubscriber<UserEmailUpdatedDomainEvent> {
    constructor(
        private readonly sender: UserUpdatedNotificationEmailSender,
        private readonly finder: UserFinder
    ) {}

    async on(event: UserEmailUpdatedDomainEvent): Promise<void> {
        const user = await this.finder.find(event.id);
        const { name } = user.toPrimitives();
        await this.sender.send(event.id, name, "email", event.email);
    }

    subscribedTo(): DomainEventClass[] {
        return [UserEmailUpdatedDomainEvent];
    }

    name(): string {
        return "pnfi.system.send_notification_email_on_user_email_changed";
    }
}
