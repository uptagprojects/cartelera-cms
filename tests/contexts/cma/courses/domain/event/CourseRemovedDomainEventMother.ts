import { CoursePrimitives } from "../../../../../../src/contexts/cma/courses/domain/Course";
import { CourseRemovedDomainEvent } from "../../../../../../src/contexts/cma/courses/domain/events/CourseRemovedDomainEvent";
import { CourseIdMother } from "../CourseIdMother";

export class CourseRemovedDomainEventMother {
	static create(params?: Partial<CoursePrimitives>): CourseRemovedDomainEvent {
		return new CourseRemovedDomainEvent(CourseIdMother.create(params?.id).value);
	}
}
