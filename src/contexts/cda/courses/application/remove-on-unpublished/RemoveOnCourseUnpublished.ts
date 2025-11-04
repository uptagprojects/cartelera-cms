import { Service } from "diod";

import { CourseDomainEvent } from "../../../../cma/courses/domain/events/CourseDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/events/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/events/DomainEventSubscriber";
import { UnpublishedCourseRemover } from "./UnpublishedCourseRemover";

@Service()
export class RemoveOnCourseUnpublished implements DomainEventSubscriber<CourseDomainEvent> {
    constructor(private readonly remover: UnpublishedCourseRemover) {}

    async on(course: CourseDomainEvent): Promise<void> {
        await this.remover.remove(course.id);
    }

    subscribedTo(): DomainEventClass[] {
        return [];
    }

    name(): string {
        return "pnfi.cda.remove_course_on_unpublished";
    }
}
