import { Service } from "diod";
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
	duration: string;
	price: number;
}

@Service()
export class PostgresCourseRepository implements CourseRepository {
	constructor(private readonly connection: PostgresConnection) {}

	async save(course: Course): Promise<void> {
		const primitives = course.toPrimitives();

		await this.connection.execute(
			"INSERT INTO cda__courses (id, name, abstract, instructor, duration, price) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO UPDATE SET name=$2, abstract=$3, instructor=$4, duration=$5, price=$6",
			[
				course.id.value,
				primitives.name,
				primitives.abstract,
				JSON.stringify(primitives.instructor),
				JSON.stringify(primitives.duration),
				primitives.price
			]
		);
	}

	async search(id: CourseId): Promise<Course | null> {
		const res = await this.connection.searchOne<DatabaseCourse>(
			"SELECT id, name, abstract, instructor, duration, price FROM cda__courses WHERE id = $1 LIMIT 1",
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
			duration: JSON.parse(res.duration) as CourseDurationPrimitives,
			price: res.price
		});
	}

	async matching(criteria: Criteria): Promise<Course[]> {
		const converter = new CriteriaToPostgresSqlConverter();
		const { query, params } = converter.convert(
			["id", "name", "abstract", "instructor", "duration", "price"],
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
				duration: JSON.parse(a.duration) as CourseDurationPrimitives,
				price: a.price
			})
		);
	}

	async remove(course: Course): Promise<void> {
		await this.connection.execute("DELETE FROM cda__courses WHERE id = $1", [course.id.value]);
	}
}
