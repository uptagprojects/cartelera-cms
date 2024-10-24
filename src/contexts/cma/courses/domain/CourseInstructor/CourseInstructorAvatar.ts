import { UrlValueObject } from "../../../../shared/domain/UrlValueObject";

export class CourseInstructorAvatar extends UrlValueObject {
	constructor(value: string) {
		super(new URL(value));
	}
}
