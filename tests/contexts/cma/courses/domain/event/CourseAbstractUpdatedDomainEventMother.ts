import { CoursePrimitives } from "../../../../../../src/contexts/cma/courses/domain/Course";
import { CourseAbstractUpdatedDomainEvent } from "../../../../../../src/contexts/cma/courses/domain/event/CourseAbstractUpdatedDomainEvent";
import { CourseAbstractMother } from "../CourseAbstractMother";
import { CourseIdMother } from "../CourseIdMother";

export class CourseAbstractUpdatedDomainEventMother {
	static create(params?: Partial<CoursePrimitives>): CourseAbstractUpdatedDomainEvent {
		return new CourseAbstractUpdatedDomainEvent(
			CourseIdMother.create(params?.id).value,
			CourseAbstractMother.create(params?.abstract).value
		);
	}
}
