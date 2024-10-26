import { DateTimeValueObject } from "../../../shared/domain/DateTimeValueObject";

export class CourseUpdate extends DateTimeValueObject {
	constructor(value: string) {
		super(new Date(value));
	}
}
