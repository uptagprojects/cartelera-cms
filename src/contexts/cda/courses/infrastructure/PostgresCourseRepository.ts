import { Pool } from 'pg';
import { CourseRepository } from '../domain/CourseRepository';
import { CourseId } from '../domain/CourseId';
import { Course } from '../domain/Course';

interface DatabaseCourse {
    id: string;
    name: string;
    duration: number;
    instructorName: string;
    picture: string;
    location: string
}

export class PostgresCourseRepository implements CourseRepository {
    constructor(private readonly pool: Pool) { }
    async search(id: CourseId) {
        const client = await this.pool.connect();

        const res = await client.query<DatabaseCourse>(
            "SELECT *** insert PARAMETROS *** FROM cda__courses WHERE id = $1 LIMIT 1",
            [id.value]
        );
        client.release();

        if (res.rows.length < 1 || !res.rows[0]) {
            return null;
        }

        return Course.fromPrimitives(res.rows[0]);
    }
}