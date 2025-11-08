import { DateValueObject } from "../../../shared/domain/DateValueObject";

export class ScheduleStartDate extends DateValueObject {
	constructor(value: string) {
		super(new Date(value));
	}
}
