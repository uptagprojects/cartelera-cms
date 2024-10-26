import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { Course } from "../domain/Course";
import { CourseId } from "../domain/CourseId";
import { CourseRepository } from "../domain/CourseRepository";

interface DatabaseCourse {
	id: string;
	name: string;
	duration: number;
	instructorName: string;
	picture: string;
	location: string;
}

export class PostgresCourseRepository implements CourseRepository {
	constructor(private readonly connection: PostgresConnection) {}
	async search(id: CourseId): Promise<Course | null> {
		const res = await this.connection.searchOne<DatabaseCourse>(
			"SELECT *** insert PARAMETROS *** FROM cda__courses WHERE id = $1 LIMIT 1",
			[id.value]
		);

		if (!res) {
			return null;
		}

		return Course.fromPrimitives(res);
	}
}
