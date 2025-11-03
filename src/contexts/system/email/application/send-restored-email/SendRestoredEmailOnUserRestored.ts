import { Service } from "diod";

import { UserRestoredDomainEvent } from "../../../../cma/users/domain/events/UserRestoredDomainEvent";
import { UserFinder } from "../../../../cma/users/domain/UserFinder";
import { DomainEventClass } from "../../../../shared/domain/events/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/events/DomainEventSubscriber";
import { RestoredEmailSender } from "./RestoredEmailSender";

@Service()
export class SendRestoredEmailOnUserRestored implements DomainEventSubscriber<UserRestoredDomainEvent> {
    constructor(
        private readonly sender: RestoredEmailSender,
        private readonly finder: UserFinder
    ) {}

    async on(event: UserRestoredDomainEvent): Promise<void> {
        const user = await this.finder.find(event.id);
        const { name, email } = user.toPrimitives();
        await this.sender.send(event.id, name, email);
    }

    subscribedTo(): DomainEventClass[] {
        return [UserRestoredDomainEvent];
    }

    name(): string {
        return "pnfi.system.send_restored_email_on_user_restored";
    }
}
