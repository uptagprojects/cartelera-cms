import { CoursePrimitives } from "../../../../../../src/contexts/cma/courses/domain/Course";
import { CourseNameUpdatedDomainEvent } from "../../../../../../src/contexts/cma/courses/domain/event/CourseNameUpdatedDomainEvent";
import { CourseIdMother } from "../CourseIdMother";
import { CourseNameMother } from "../CourseNameMother";

export class CourseNameUpdatedDomainEventMother {
	static create(params?: Partial<CoursePrimitives>): CourseNameUpdatedDomainEvent {
		return new CourseNameUpdatedDomainEvent(
			CourseIdMother.create(params?.id).value,
			CourseNameMother.create(params?.name).value
		);
	}
}
