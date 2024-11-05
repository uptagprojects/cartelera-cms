import { NextRequest, NextResponse } from "next/server";
import { ActivitiesByCriteriaSearcher } from "../../../contexts/cda/activities/application/search-all-by-criteria/ActivitiesByCriteriaSearcher";
import { PostgresConnection } from "../../../contexts/shared/infrastructure/PostgresConnection";
import { PostgresActivityRepository } from "../../../contexts/cda/activities/infrastructure/PostgresActivityRepository";
import { SearchParamsCriteriaFiltersParser } from "../../../contexts/shared/infrastructure/criteria/SearchParamsCriteriaFiltersParser";

export async function GET(request: NextRequest): Promise<Response> {
	const { searchParams } = new URL(request.url);
	const searcher = new ActivitiesByCriteriaSearcher(
		new PostgresActivityRepository(new PostgresConnection())
	);
	const filters = SearchParamsCriteriaFiltersParser.parse(searchParams);

	const activities = await searcher.search(
		filters,
		searchParams.get("orderBy"),
		searchParams.get("orderType"),
		searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize") as string, 10) : null,
		searchParams.get("pageNumber")
			? parseInt(searchParams.get("pageNumber") as string, 10)
			: null
	);

	return NextResponse.json(
		activities.map(activities => activities.toPrimitives()),
		{
			status: 200
		}
	);
}
