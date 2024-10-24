import { DateTimeValueObject } from "../../../shared/domain/DateTimeValueObject";

export class AnnouncementPublishDate extends DateTimeValueObject {
    constructor (value : string) {
        super(new Date(value))
    }
}
