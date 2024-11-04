import { NextRequest, NextResponse } from "next/server";
import { PostgresConnection } from "../../../../../contexts/shared/infrastructure/PostgresConnection";
import { PostgresGuideRepository } from "../../../../../contexts/cma/guides/infrastructure/PostgresGuideRepository";
import { GuideFinder } from "../../../../../contexts/cma/guides/application/find/GuideFinder";
import { GuideDoesNotExists } from "../../../../../contexts/cda/guides/domain/GuideDoesNotExists";

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params;
	const postgresConnection = new PostgresConnection();
	let guide = null;
	try {
		const guideRepository = new PostgresGuideRepository(postgresConnection);
		const guideFinder = new GuideFinder(guideRepository);
		guide = await guideFinder.find(id);
	} catch (error) {
		if (error instanceof GuideDoesNotExists) {
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

	return NextResponse.json(guide.toPrimitives());
}
