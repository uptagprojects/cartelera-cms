import { CoursePrimitives } from "../../../../../../src/contexts/cma/courses/domain/Course";
import { CourseLocationUpdatedDomainEvent } from "../../../../../../src/contexts/cma/courses/domain/event/CourseLocationUpdatedDomainEvent";
import { CourseIdMother } from "../CourseIdMother";
import { CourseLocationMother } from "../CourseLocationMother";

export class CourseLocationUpdatedDomainEventMother {
	static create(params?: Partial<CoursePrimitives>): CourseLocationUpdatedDomainEvent {
		return new CourseLocationUpdatedDomainEvent(
			CourseIdMother.create(params?.id).value,
			CourseLocationMother.create(params?.location).value
		);
	}
}
