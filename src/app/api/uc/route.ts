import { NextRequest, NextResponse } from "next/server";

import { UCByCriteriaSearcher } from "../../../contexts/cda/uc/application/search_by_criteria/UCByCriteriaSearcher";
import { PostgresUCRepository } from "../../../contexts/cda/uc/infrastructure/PostgresUCRepository";
import { SearchParamsCriteriaFiltersParser } from "../../../contexts/shared/infrastructure/criteria/SearchParamsCriteriaFiltersParser";
import { PostgresConnection } from "../../../contexts/shared/infrastructure/PostgresConnection";

export async function GET(request: NextRequest): Promise<Response> {
	const { searchParams } = new URL(request.url);

	const searcher = new UCByCriteriaSearcher(new PostgresUCRepository(new PostgresConnection()));
	const filters = SearchParamsCriteriaFiltersParser.parse(searchParams);

	const ucs = await searcher.search(
		filters,
		searchParams.get("orderBy"),
		searchParams.get("orderType"),
		null,
		null
	);

	return NextResponse.json(
		ucs.map(uc => uc.toPrimitives()),
		{
			status: 200
		}
	);
}
