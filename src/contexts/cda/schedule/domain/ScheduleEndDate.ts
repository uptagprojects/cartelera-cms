import { DateValueObject } from "../../../shared/domain/DateValueObject";

export class ScheduleEndDate extends DateValueObject {
    constructor(value: string) {
        super(new Date(value));
    }
}
