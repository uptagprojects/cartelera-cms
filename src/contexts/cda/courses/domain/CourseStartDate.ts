import { DateValueObject } from "../../../shared/domain/DateValueObject";

export class CourseStartDate extends DateValueObject {
	constructor(value: string) {
		super(new Date(value));
	}
}
