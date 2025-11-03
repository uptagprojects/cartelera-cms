import { Service } from "diod";

import { UCCreatedDomainEvent } from "../../../../cma/uc/domain/events/UCCreatedDomainEvent";
import { UCRenamedDomainEvent } from "../../../../cma/uc/domain/events/UCRenamedDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/events/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/events/DomainEventSubscriber";
import { PublishedUCUpdater } from "./PublishedUCUpdater";

@Service()
export class UpdateUCOnPublished implements DomainEventSubscriber<UCCreatedDomainEvent | UCRenamedDomainEvent> {
    constructor(private readonly updater: PublishedUCUpdater) {}

    async on(event: UCCreatedDomainEvent | UCRenamedDomainEvent): Promise<void> {
        await this.updater.update(event.id, event.name);
    }

    subscribedTo(): DomainEventClass[] {
        return [UCCreatedDomainEvent, UCRenamedDomainEvent];
    }

    name(): string {
        return "pnfi.cda.update_uc_on_published";
    }
}
