import { NextRequest, NextResponse } from "next/server";

import { SearchParamsCriteriaFiltersParser } from "../../../../contexts/shared/infrastructure/criteria/SearchParamsCriteriaFiltersParser";
import { PostgresConnection } from "../../../../contexts/shared/infrastructure/PostgresConnection";
import { CourseByCriteriaSearcher } from "../../../../contexts/cma/courses/application/search-by-criteria/CourseByCriteriaSearcher";
import { PostgresCourseRepository } from "../../../../contexts/cma/courses/infrastructure/PostgresCourseRepository";


const searcher = new CourseByCriteriaSearcher(
	new PostgresCourseRepository(new PostgresConnection())
);

export async function GET(request: NextRequest): Promise<Response> {
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

	return NextResponse.json(events.map(announcement => announcement.toPrimitives()));
}
