import { CourseDomainEvent } from "../../../../../../src/contexts/cma/courses/domain/event/CourseDomainEvent";
import { CourseIdMother } from "../CourseIdMother";

export class CourseDomainEventMother {
	static create(params?: { id?: string }): CourseDomainEvent {
		const id = params?.id ?? CourseIdMother.create().value;

		return new CourseDomainEvent(
			"pnfi.cma.course.test",
			id
		);
	}
}
