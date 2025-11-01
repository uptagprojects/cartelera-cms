import { UrlValueObject } from "../../../shared/domain/UrlValueObject";

export class ScheduleAttachmentURL extends UrlValueObject {
    constructor(value: string) {
        super(new URL(value));
    }
}
