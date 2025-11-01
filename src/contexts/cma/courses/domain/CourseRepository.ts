import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { Course } from "./Course";
import { CourseId } from "./CourseId";

export interface CourseRepository {
    save(announcement: Course): Promise<void>;

    search(id: CourseId): Promise<Course | null>;

    searchAll(): Promise<Course[]>;

    matching(criteria: Criteria): Promise<Course[]>;

    remove(id: Course): Promise<void>;
}
