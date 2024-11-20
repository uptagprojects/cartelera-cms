import { NextRequest } from "next/server";

import { ActivitiesByCriteriaSearcher } from "../../../contexts/cda/activities/application/search-all-by-criteria/ActivitiesByCriteriaSearcher";
import { PostgresActivityRepository } from "../../../contexts/cda/activities/infrastructure/PostgresActivityRepository";
import { SearchParamsCriteriaFiltersParser } from "../../../contexts/shared/infrastructure/criteria/SearchParamsCriteriaFiltersParser";
import { HTTPNextResponse } from "../../../contexts/shared/infrastructure/http/HTTPNextResponse";
import { PostgresConnection } from "../../../contexts/shared/infrastructure/PostgresConnection";

export async function GET(request: NextRequest): Promise<Response> {
	const { searchParams } = new URL(request.url);
	try {
		const searcher = new ActivitiesByCriteriaSearcher(
			new PostgresActivityRepository(new PostgresConnection())
		);
		const filters = SearchParamsCriteriaFiltersParser.parse(searchParams);

		const activities = await searcher.search(
			filters,
			searchParams.get("orderBy"),
			searchParams.get("orderType"),
			searchParams.get("pageSize")
				? parseInt(searchParams.get("pageSize") as string, 10)
				: null,
			searchParams.get("pageNumber")
				? parseInt(searchParams.get("pageNumber") as string, 10)
				: null
		);

		return HTTPNextResponse.json(activities);
	} catch (_error) {
		return HTTPNextResponse.internalServerError();
	}
}
