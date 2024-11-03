import { DateValueObject } from "../../../shared/domain/DateValueObject";

export class EventStartDate extends DateValueObject {
	constructor(value: string) {
		super(new Date(value));
	}
}
