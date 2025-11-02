import { CoursePrimitives } from "../../../../../../src/contexts/cma/courses/domain/Course";
import { CoursePictureUpdatedDomainEvent } from "../../../../../../src/contexts/cma/courses/domain/event/CoursePictureUpdatedDomainEvent";
import { CourseIdMother } from "../CourseIdMother";
import { CoursePictureMother } from "../CoursePictureMother";

export class CoursePictureUpdatedDomainEventMother {
	static create(params?: Partial<CoursePrimitives>): CoursePictureUpdatedDomainEvent {
		return new CoursePictureUpdatedDomainEvent(
			CourseIdMother.create(params?.id).value,
			CoursePictureMother.create(params?.picture).value
		);
	}
}
