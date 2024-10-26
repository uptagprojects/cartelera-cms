import { DateTimeValueObject } from "../../../shared/domain/DateTimeValueObject";

export class GuidePublishDate extends DateTimeValueObject {
	constructor(value: string) {
		super(new Date(value));
	}
}
