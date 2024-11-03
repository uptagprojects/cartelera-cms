import { NextRequest, NextResponse } from "next/server";

import { UCFinder } from "../../../../contexts/cda/uc/application/find/UCFinder";
import { UCDoesNotExist } from "../../../../contexts/cda/uc/domain/UCDoesNotExist";
import { PostgresUCRepository } from "../../../../contexts/cda/uc/infrastructure/PostgresUCRepository";
import { PostgresConnection } from "../../../../contexts/shared/infrastructure/PostgresConnection";

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params;
	const postgresConnection = new PostgresConnection();
	let uc = null;
	try {
		const ucRepository = new PostgresUCRepository(postgresConnection);
		const ucFinder = new UCFinder(ucRepository);
		uc = await ucFinder.find(id);
	} catch (error) {
		if (error instanceof UCDoesNotExist) {
			return new Response(JSON.stringify({ code: "uc_not_found", message: error.message }), {
				status: 404,
				headers: {
					"Content-Type": "application/json"
				}
			});
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
