import { DateTimeValueObject } from "../../../shared/domain/DateTimeValueObject";

export class CourseCreation extends DateTimeValueObject {
    constructor(value: string) {
        super(new Date(value))
    }
}
