import { DateTimeValueObject } from "../../../shared/domain/DateTimeValueObject";

<<<<<<< HEAD
export class GuidePublishDate extends DateTimeValueObject {}
=======
export class GuidePublishDate extends DateTimeValueObject {
    constructor(value: string) {
        super(new Date(value))
    }
}
>>>>>>> feature/cda-domain
