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
	instructor: string;
	picture: string;
	location: string;
	duration: string;
	price: number;
}

export class PostgresCourseRepository implements CourseRepository {
	constructor(private readonly connection: PostgresConnection) {}

	async search(id: CourseId): Promise<Course | null> {
		const res = await this.connection.searchOne<DatabaseCourse>(
			"SELECT id, name, abstract, instructor, picture, location, duration, price FROM cda__courses WHERE id = $1 LIMIT 1",
			[id.value]
		);

		if (!res) {
			return null;
		}

		return Course.fromPrimitives({
			id: res.id,
			name: res.name,
			abstract: res.abstract,
			instructor: JSON.parse(res.instructor) as CourseInstructorPrimitives,
			picture: res.picture,
			location: res.location,
			duration: JSON.parse(res.duration) as CourseDurationPrimitives,
			price: res.price
		});
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
				instructor: JSON.parse(a.instructor) as CourseInstructorPrimitives,
				picture: a.picture,
				location: a.location,
				duration: JSON.parse(a.duration) as CourseDurationPrimitives,
				price: a.price
			})
		);
	}
}
