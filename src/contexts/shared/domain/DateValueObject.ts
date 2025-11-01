import { InvalidDateError } from "./InvalidDateError";

export abstract class DateValueObject {
    constructor(public readonly value: Date) {
        this.ensureIsValidDate(value);
    }

    private ensureIsValidDate(value: Date) {
        if (value.getHours() > 0 || value.getMinutes() > 0 || value.getSeconds() > 0 || value.getMilliseconds() > 0) {
            throw new InvalidDateError(value);
        }
    }
}
