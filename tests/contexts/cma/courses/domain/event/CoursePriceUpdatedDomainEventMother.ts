import { CoursePrimitives } from "../../../../../../src/contexts/cma/courses/domain/Course";
import { CoursePriceUpdatedDomainEvent } from "../../../../../../src/contexts/cma/courses/domain/event/CoursePriceUpdatedDomainEvent";
import { CourseIdMother } from "../CourseIdMother";
import { CoursePriceMother } from "../CoursePriceMother";

export class CoursePriceUpdatedDomainEventMother {
	static create(params?: Partial<CoursePrimitives>): CoursePriceUpdatedDomainEvent {
		return new CoursePriceUpdatedDomainEvent(
			CourseIdMother.create(params?.id).value,
			CoursePriceMother.create(params?.price).value
		);
	}
}
