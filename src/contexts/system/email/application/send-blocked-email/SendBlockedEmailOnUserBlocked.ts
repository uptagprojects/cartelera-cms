import { Service } from "diod";

import { UserBlockedDomainEvent } from "../../../../cma/users/domain/event/UserBlockedDomainEvent";
import { UserFinder } from "../../../../cma/users/domain/UserFinder";
import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { BlockedEmailSender } from "./BlockedEmailSender";

@Service()
export class SendBlockedEmailOnUserBlocked implements DomainEventSubscriber<UserBlockedDomainEvent> {
    constructor(
        private readonly sender: BlockedEmailSender,
        private readonly finder: UserFinder
    ) {}

    async on(event: UserBlockedDomainEvent): Promise<void> {
        const user = await this.finder.find(event.id);
        const { name, email } = user.toPrimitives();
        await this.sender.send(event.id, name, email);
    }

    subscribedTo(): DomainEventClass[] {
        return [UserBlockedDomainEvent];
    }

    name(): string {
        return "pnfi.system.send_blocked_email_on_user_blocked";
    }
}
