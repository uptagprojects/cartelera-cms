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
	creation: string,
	lastUpdate: string
}
export class PostgresCourseRepository implements CourseRepository {
	constructor(private readonly connection: PostgresConnection) { }

	async save(course: Course): Promise<void> {
		const coursePrimitives = course.toPrimitives();

		const params = [coursePrimitives.id, coursePrimitives.name, coursePrimitives.abstract, coursePrimitives.instructor.toString(), coursePrimitives.picture, coursePrimitives.location, coursePrimitives.duration.toString(), coursePrimitives.price];

		await this.connection.execute(
			`INSERT INTO cma__courses (id, name, abstract, instructor, picture, location, duration, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (id) DO UPDATE SET name = $2`,
			params
		);
	}

	async search(id: CourseId): Promise<Course | null> {
		const res = await this.connection.searchOne<DatabaseCourse>(
			"SELECT id, name, abstract, instructor, picture, location, duration, price, stored_creation_timestamp AS 'creation', stored_update_timestamp AS 'lastUpdate' FROM cma__courses WHERE id = $1 LIMIT 1",
			[id.value]
		);

		if (!res) {
			return null;
		}

		return Course.fromPrimitives({
			id: res.id,
			name: res.name,
			abstract: res.abstract,
			instructor: res.instructor,
			picture: res.picture,
			location: res.location,
			duration: res.duration,
			price: res.price,
			creation: res.creation,
			lastUpdate: res.lastUpdate,
		});
	}

	async searchAll(): Promise<Course[]> {
		const res = await this.connection.searchAll<DatabaseCourse>(
			"SELECT id, title, content, publish_date, type, active FROM cma__announcements",
			[]
		);

		return res.map(r => Course.fromPrimitives(r));
	}

	async matching(criteria: Criteria): Promise<Course[]> {
		const converter = new CriteriaToPostgresSqlConverter();
		const { query, params } = converter.convert(
			["id", "name", "abstract", "instructor", "picture", "location", "duration", "price", "stored_creation_timestamp AS 'creation'", "stored_update_timestamp AS 'lastUpdate"],
			"cma__courses",
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
				price: a.price,
				creation: a.creation,
				lastUpdate: a.lastUpdate,
			})
		);
	}

	async remove(course: Course): Promise<void> {
		const { id } = course.toPrimitives();

		await this.connection.execute(
			"DELETE FROM cma__courses WHERE id = $1",
			[id]
		);
	}

}
