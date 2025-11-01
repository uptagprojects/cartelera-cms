import { UrlValueObject } from "../../../../shared/domain/UrlValueObject";

export class CourseInstructorRelatedUrl extends UrlValueObject {
    constructor(value: string) {
        super(new URL(value));
    }
}
