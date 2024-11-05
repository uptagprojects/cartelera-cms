import { NextRequest, NextResponse } from "next/server";
import { EventsByCriteriaSearcher } from "../../../contexts/cda/events/application/search-by-criteria/EventsByCriteriaSearcher";
import { PostgresConnection } from "../../../contexts/shared/infrastructure/PostgresConnection";
import { PostgresEventRepository } from "../../../contexts/cda/events/infrastructure/PostgresEventRepository";
import { SearchParamsCriteriaFiltersParser } from "../../../contexts/shared/infrastructure/criteria/SearchParamsCriteriaFiltersParser";

export async function GET(request: NextRequest): Promise<Response> {
	const searcher = new EventsByCriteriaSearcher(
		new PostgresEventRepository(new PostgresConnection())
	);
	const { searchParams } = new URL(request.url);

	const filters = SearchParamsCriteriaFiltersParser.parse(searchParams);
	const events = await searcher.search(
		filters,
		searchParams.get("orderBy"),
		searchParams.get("orderType"),
		searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize") as string, 10) : null,
		searchParams.get("pageNumber")
			? parseInt(searchParams.get("pageNumber") as string, 10)
			: null
	);

	return NextResponse.json(events.map(event => event.toPrimitives()));
}
