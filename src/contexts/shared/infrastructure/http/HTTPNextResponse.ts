import { STATUS_CODES } from "http";
import { NextResponse } from "next/server";

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

	static created(): NextResponse {
		return new NextResponse(null, {
			status: 201
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
