import { DateValueObject } from "../../../shared/domain/DateValueObject";

export class ScheduleFinishDate extends DateValueObject {
	constructor(value: string | Date) {
		super(new Date(value));
	}
}
