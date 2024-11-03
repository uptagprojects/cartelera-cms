import { EventBus } from "../../../../shared/domain/event/EventBus";
import { CourseFinder } from "../../domain/CourseFinder";
import { CourseRepository } from "../../domain/CourseRepository";

export class EventRemover {
	private readonly finder: CourseFinder;

	constructor(
		private readonly repository: CourseRepository,
		private readonly eventBus: EventBus
	) {
		this.finder = new CourseFinder(repository);
	}

	async remove(id: string): Promise<void> {
		const course = await this.finder.find(id);
		await this.repository.remove(course);
		await this.eventBus.publish(course.pullDomainEvents());
	}
}
