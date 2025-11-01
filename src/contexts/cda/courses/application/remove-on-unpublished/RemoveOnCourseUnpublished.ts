import { Service } from "diod";

import { CourseDomainEvent } from "../../../../cma/courses/domain/event/CourseDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
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
