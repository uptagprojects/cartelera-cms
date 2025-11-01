import { Service } from "diod";

import { UserArchivedDomainEvent } from "../../../../cma/users/domain/event/UserArchivedDomainEvent";
import { UserFinder } from "../../../../cma/users/domain/UserFinder";
import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { ArchivedEmailSender } from "./ArchivedEmailSender";

@Service()
export class SendArchivedEmailOnUserArchived implements DomainEventSubscriber<UserArchivedDomainEvent> {
    constructor(
        private readonly sender: ArchivedEmailSender,
        private readonly finder: UserFinder
    ) {}

    async on(event: UserArchivedDomainEvent): Promise<void> {
        const user = await this.finder.find(event.id);
        const { name, email } = user.toPrimitives();
        await this.sender.send(event.id, name, email);
    }

    subscribedTo(): DomainEventClass[] {
        return [UserArchivedDomainEvent];
    }

    name(): string {
        return "pnfi.system.send_archived_email_on_user_archived";
    }
}
