import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { CriteriaToPostgresSqlConverter } from "../../../shared/infrastructure/criteria/CriteriaToPostgresSqlConverter";
import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { Course } from "../domain/Course";
import { CourseDurationPrimitives } from "../domain/CourseDuration/CourseDuration";
import { CourseId } from "../domain/CourseId";
import { CourseInstructorPrimitives } from "../domain/CourseInstructor/CourseInstructor";
import { CourseRepository } from "../domain/CourseRepository";

interface DatabaseCourse {
	id: string;
	name: string;
	abstract: string;
	instructor: CourseInstructorPrimitives;
	picture: string;
	location: string;
	duration: CourseDurationPrimitives;
	price: number;
}

export class PostgresCourseRepository implements CourseRepository {
	constructor(private readonly connection: PostgresConnection) { }
	async search(id: CourseId): Promise<Course | null> {
		const res = await this.connection.searchOne<DatabaseCourse>(
			"SELECT id, name, abstract, instructor, picture, location, duration, price FROM cda__courses WHERE id = $1 LIMIT 1",
			[id.value]
		);

		if (!res) {
			return null;
		}

		return Course.fromPrimitives(res);
	}

	async matching(criteria: Criteria): Promise<Course[]> {
		const converter = new CriteriaToPostgresSqlConverter();
		const { query, params } = converter.convert(
			["id", "name", "abstract", "instructor", "picture", "location", "duration", "price"],
			"cda__courses",
			criteria
		);

		const results = await this.connection.searchAll<DatabaseCourse>(query, params);

		return results.map(a =>
			Course.fromPrimitives({
				id: a.id,
				name: a.name,
				abstract: a.abstract,
				instructor: a.instructor,
				picture: a.picture,
				location: a.location,
				duration: a.duration,
				price: a.price
			})
		);
	}
}
