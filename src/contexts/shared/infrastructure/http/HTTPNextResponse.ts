import { STATUS_CODES } from "http";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { DomainError } from "../../domain/DomainError";

export class HTTPNextResponse {
    static domainError(error: DomainError, statusCode: number): NextResponse {
        return NextResponse.json(
            {
                error: error.toPrimitives()
            },
            {
                status: statusCode
            }
        );
    }

    static validationError(error: ZodError, statusCode: number): NextResponse {
        return NextResponse.json(
            {
                error: Object.fromEntries(
                    Object.entries(error.flatten().fieldErrors).map(([field, errors]) => [
                        field,
                        errors && errors.length > 0
                            ? {
                                  type: "validation_error",
                                  description: errors.join(", "),
                                  data: errors
                              }
                            : null
                    ])
                )
            },
            {
                status: statusCode
            }
        );
    }

    static internalServerError(): NextResponse {
        return NextResponse.json(
            {
                code: "internal_server_error",
                message: STATUS_CODES[500],
                data: {}
            },
            {
                status: 500
            }
        );
    }

    static unauthorizedError(): NextResponse {
        return NextResponse.json(
            {
                code: "unauthorized_error",
                message: STATUS_CODES[401],
                data: {}
            },
            {
                status: 401
            }
        );
    }

    static created(): NextResponse {
        return new NextResponse(null, {
            status: 201
        });
    }

    static accepted(): NextResponse {
        return new NextResponse(null, {
            status: 202
        });
    }

    static deleted(): NextResponse {
        return new NextResponse(null, {
            status: 204
        });
    }

    static json<JSONBody>(data: JSONBody): NextResponse {
        return NextResponse.json(data, { status: 200 });
    }
}
