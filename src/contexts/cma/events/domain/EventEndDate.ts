import { DateValueObject } from "../../../shared/domain/DateValueObject";

export class EventEndDate extends DateValueObject {
    constructor(value: string) {
        super(new Date(value));
    }
}
