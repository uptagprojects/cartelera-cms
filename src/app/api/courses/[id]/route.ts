import { NextRequest, NextResponse } from "next/server";

import { CourseFinder } from "../../../../contexts/cda/courses/application/find/CourseFinder";
import { CourseDoesNotExists } from "../../../../contexts/cda/courses/domain/CourseDoesNotExists";
import { PostgresCourseRepository } from "../../../../contexts/cda/courses/infrastructure/PostgresCourseRepository";
import { PostgresConnection } from "../../../../contexts/shared/infrastructure/PostgresConnection";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
    const { id } = await params;
    const postgresConnection = new PostgresConnection();
    let course = null;
    try {
        const courseRepository = new PostgresCourseRepository(postgresConnection);
        const couseFinder = new CourseFinder(courseRepository);
        course = await couseFinder.find(id);
    } catch (error) {
        if (error instanceof CourseDoesNotExists) {
            return new Response(JSON.stringify({ code: "course_not_found", message: error.message }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        return new Response(JSON.stringify({ code: "unexpected_error", message: "Something happened" }), {
            status: 503,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    return NextResponse.json(course.toPrimitives());
}
