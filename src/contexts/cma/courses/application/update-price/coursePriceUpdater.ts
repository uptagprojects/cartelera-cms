import { EventBus } from "../../../../shared/domain/events/EventBus";
import { CourseFinder } from "../../domain/CourseFinder";
import { CourseRepository } from "../../domain/CourseRepository";

export class EventPriceUpdater {
    private readonly finder: CourseFinder;
    constructor(
        private readonly repository: CourseRepository,
        private readonly eventBus: EventBus
    ) {
        this.finder = new CourseFinder(repository);
    }

    async update(id: string, price: number): Promise<void> {
        const course = await this.finder.find(id);
        course.updatePrice(price);
        await this.repository.save(course);
        await this.eventBus.publish(course.pullDomainEvents());
    }
}
