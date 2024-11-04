import { NextRequest, NextResponse } from "next/server";
import { PostgresConnection } from "../../../../../contexts/shared/infrastructure/PostgresConnection";
import { PostgresUCRepository } from "../../../../../contexts/cma/uc/infrastructure/PostgresUCRepository";
import { UCFinder } from "../../../../../contexts/cma/uc/application/find/UCFinder";
import { UCDoesNotExist } from "../../../../../contexts/cma/uc/domain/UCDoesNotExist";

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params;
	let uc = null;
	try {
		const ucFinder = new UCFinder(
            new PostgresUCRepository(new PostgresConnection())
        );
		uc = await ucFinder.find(id);
	} catch (error) {
		if (error instanceof UCDoesNotExist) {
			return new Response(
				JSON.stringify({ code: "guide_not_found", message: error.message }),
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
