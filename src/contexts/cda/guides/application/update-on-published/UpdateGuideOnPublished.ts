import { Service } from "diod";

import { GuidePublishedDomainEvent } from "../../../../cma/guides/domain/events/GuidePublishedDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/events/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/events/DomainEventSubscriber";
import { PublishedGuideUpdater } from "./PublishedGuideUpdater";

@Service()
export class UpdateGuideOnPublished implements DomainEventSubscriber<GuidePublishedDomainEvent> {
    constructor(private readonly updater: PublishedGuideUpdater) {}

    async on(event: GuidePublishedDomainEvent): Promise<void> {
        await this.updater.update(event.id, event.title, event.content, event.ucId, event.authorId, event.occurredOn);
    }

    subscribedTo(): DomainEventClass[] {
        return [GuidePublishedDomainEvent];
    }

    name(): string {
        return "pnfi.cda.update_guide_on_published";
    }
}
