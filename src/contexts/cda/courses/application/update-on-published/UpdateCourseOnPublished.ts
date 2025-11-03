import { Service } from "diod";

import { CoursePublishedDomainEvent } from "../../../../cma/courses/domain/events/CoursePublishedDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/events/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/events/DomainEventSubscriber";
import { PublishedCourseUpdater } from "./PublishedCourseUpdater";

@Service()
export class UpdateCourseOnPublished implements DomainEventSubscriber<CoursePublishedDomainEvent> {
    constructor(private readonly updater: PublishedCourseUpdater) {}

    async on(event: CoursePublishedDomainEvent): Promise<void> {
        await this.updater.update(event.id, event.name, event.abstract, event.price, event.duration, event.instructor);
    }

    subscribedTo(): DomainEventClass[] {
        return [CoursePublishedDomainEvent];
    }

    name(): string {
        return "pnfi.cda.update_course_on_published";
    }
}
