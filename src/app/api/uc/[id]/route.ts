import { NextRequest, NextResponse } from "next/server";

import { PostgresConnection } from "../../../../contexts/shared/infrastructure/PostgresConnection";
import { CourseDoesNotExists } from "../../../../contexts/cda/courses/domain/CourseDoesNotExists";
import { PostgresUCRepository } from "../../../../contexts/cda/uc/infrastructure/PostgresUCRepository";
import { UCFinder } from "../../../../contexts/cda/uc/application/find/UCFinder";
import { UCDoesNotExists } from "../../../../contexts/cda/uc/domain/UCDoesNotExist";

export async function GET(
    _: NextRequest,
    { params: { id } }: { params: { id: string } }
): Promise<Response> {
    const postgresConnection = new PostgresConnection();
    let uc = null;
    try {
        const ucRepository = new PostgresUCRepository(postgresConnection);
        const ucFinder = new UCFinder(ucRepository);
        uc = await ucFinder.find(id);
    } catch (error) {
        if (error instanceof UCDoesNotExists) {
            return new Response(
                JSON.stringify({ code: "uc_not_found", message: error.message }),
                {
                    status: 404,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        return new Response(
            JSON.stringify({ code: "unexpected_error", message: "Something happened" }),
            {
                status: 503,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    return NextResponse.json(uc.toPrimitives());
}
