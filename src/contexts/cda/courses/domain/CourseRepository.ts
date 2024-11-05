import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { Course } from "./Course";
import { CourseId } from "./CourseId";

export abstract class CourseRepository {
	abstract save(course: Course): Promise<void>;

	abstract search(id: CourseId): Promise<Course | null>;

	abstract matching(criteria: Criteria): Promise<Course[]>;

	abstract remove(course: Course): Promise<void>;
}
