import { Service } from "diod";

import { GuidePublishedDomainEvent } from "../../../../cma/guides/domain/events/GuidePublishedDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/events/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/events/DomainEventSubscriber";
import { PublishedActivityUpdater } from "./PublishedActivityUpdater";

@Service()
export class UpdateActivityOnGuidePublished implements DomainEventSubscriber<GuidePublishedDomainEvent> {
    constructor(private readonly updater: PublishedActivityUpdater) {}

    async on(event: GuidePublishedDomainEvent): Promise<void> {
        await this.updater.update(event.id, "guide", event.title, event.content, event.occurredOn);
    }

    subscribedTo(): DomainEventClass[] {
        return [GuidePublishedDomainEvent];
    }

    name(): string {
        return "pnfi.cda.update_activity_on_guide_published";
    }
}
