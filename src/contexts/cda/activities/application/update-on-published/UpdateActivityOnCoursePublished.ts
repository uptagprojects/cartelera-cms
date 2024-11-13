import { Service } from "diod";

import { CoursePublishedDomainEvent } from "../../../../cma/courses/domain/event/CoursePublishedDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { PublishedActivityUpdater } from "./PublishedActivityUpdater";

@Service()
export class UpdateActivityOnCoursePublished
	implements DomainEventSubscriber<CoursePublishedDomainEvent>
{
	constructor(private readonly updater: PublishedActivityUpdater) {}

	async on(event: CoursePublishedDomainEvent): Promise<void> {
		await this.updater.update(event.id, "course", event.name, event.abstract, event.occurredOn);
	}

	subscribedTo(): DomainEventClass[] {
		return [CoursePublishedDomainEvent];
	}

	name(): string {
		return "pnfi.cda.update_activity_on_course_published";
	}
}
