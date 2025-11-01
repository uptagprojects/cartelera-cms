import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { CriteriaToPostgresSqlConverter } from "../../../shared/infrastructure/criteria/CriteriaToPostgresSqlConverter";
import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { Course } from "../domain/Course";
import { CourseDurationPrimitives } from "../domain/CourseDuration/CourseDuration";
import { CourseId } from "../domain/CourseId";
import { CourseInstructorPrimitives } from "../domain/CourseInstructor/CourseInstructor";
import { CourseRepository } from "../domain/CourseRepository";
import { CourseRemovedDomainEvent } from "../domain/event/CourseRemovedDomainEvent";

interface DatabaseCourse {
    id: string;
    name: string;
    abstract: string;
    instructor: string;
    picture: string;
    location: string;
    duration: string;
    price: number;
    creation: string;
    lastUpdate: string;
}

export class PostgresCourseRepository implements CourseRepository {
    constructor(private readonly connection: PostgresConnection) {}

    async save(course: Course): Promise<void> {
        const coursePrimitives = course.toPrimitives();

        const params = [
            coursePrimitives.id,
            coursePrimitives.name,
            coursePrimitives.abstract,
            JSON.stringify(coursePrimitives.instructor),
            coursePrimitives.picture,
            coursePrimitives.location,
            JSON.stringify(coursePrimitives.duration),
            coursePrimitives.price
        ];

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
            instructor: JSON.parse(res.instructor) as CourseInstructorPrimitives,
            picture: res.picture,
            location: res.location,
            duration: JSON.parse(res.duration) as CourseDurationPrimitives,
            price: res.price,
            creation: res.creation,
            lastUpdate: res.lastUpdate
        });
    }

    async searchAll(): Promise<Course[]> {
        const res = await this.connection.searchAll<DatabaseCourse>(
            "id, name, abstract, instructor, picture, location, duration, price, stored_creation_timestamp AS 'creation', stored_update_timestamp AS 'lastUpdate' FROM cma__courses",
            []
        );

        return res.map(r =>
            Course.fromPrimitives({
                id: r.id,
                name: r.name,
                abstract: r.abstract,
                instructor: JSON.parse(r.instructor) as CourseInstructorPrimitives,
                picture: r.picture,
                location: r.location,
                duration: JSON.parse(r.duration) as CourseDurationPrimitives,
                price: r.price,
                creation: r.creation,
                lastUpdate: r.lastUpdate
            })
        );
    }

    async matching(criteria: Criteria): Promise<Course[]> {
        const converter = new CriteriaToPostgresSqlConverter();
        const { query, params } = converter.convert(
            [
                "id",
                "name",
                "abstract",
                "instructor",
                "picture",
                "location",
                "duration",
                "price",
                "stored_creation_timestamp AS 'creation'",
                "stored_update_timestamp AS 'lastUpdate"
            ],
            "cma__courses",
            criteria
        );

        const results = await this.connection.searchAll<DatabaseCourse>(query, params);

        return results.map(a =>
            Course.fromPrimitives({
                id: a.id,
                name: a.name,
                abstract: a.abstract,
                instructor: JSON.parse(a.instructor),
                picture: a.picture,
                location: a.location,
                duration: JSON.parse(a.duration),
                price: a.price,
                creation: a.creation,
                lastUpdate: a.lastUpdate
            })
        );
    }

    async remove(course: Course): Promise<void> {
        const { id } = course.toPrimitives();

        course.record(new CourseRemovedDomainEvent(id));
        await this.connection.execute("DELETE FROM cma__courses WHERE id = $1", [id]);
    }
}
