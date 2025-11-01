import { NextRequest, NextResponse } from "next/server";

import { SchedulesByCriteriaSearcher } from "../../../../contexts/cma/schedules/application/search-by-criteria/SchedulesByCriteriaSearcher";
import { PostgresScheduleRepository } from "../../../../contexts/cma/schedules/infrastructure/PostgresScheduleRepository";
import { SearchParamsCriteriaFiltersParser } from "../../../../contexts/shared/infrastructure/criteria/SearchParamsCriteriaFiltersParser";
import { PostgresConnection } from "../../../../contexts/shared/infrastructure/PostgresConnection";

const searcher = new SchedulesByCriteriaSearcher(new PostgresScheduleRepository(new PostgresConnection()));

export async function GET(request: NextRequest): Promise<Response> {
    const { searchParams } = new URL(request.url);

    const filters = SearchParamsCriteriaFiltersParser.parse(searchParams);
    const guides = await searcher.search(
        filters,
        searchParams.get("orderBy"),
        searchParams.get("orderType"),
        searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize") as string, 10) : null,
        searchParams.get("pageNumber") ? parseInt(searchParams.get("pageNumber") as string, 10) : null
    );

    return NextResponse.json(guides.map(guide => guide.toPrimitives()));
}
