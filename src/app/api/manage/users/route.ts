import { NextRequest, NextResponse } from "next/server";
import { SearchParamsCriteriaFiltersParser } from "../../../../contexts/shared/infrastructure/criteria/SearchParamsCriteriaFiltersParser";
import { UsersByCriteriaSearcher } from "../../../../contexts/cma/users/application/search-by-criteria/UsersByCriteriaSearcher";
import { PostgresConnection } from "../../../../contexts/shared/infrastructure/PostgresConnection";
import { PostgresUserRepository } from "../../../../contexts/cma/users/infrastructure/PostgresUserRepository";

const searcher = new UsersByCriteriaSearcher(new PostgresUserRepository(new PostgresConnection()));

export async function GET(request: NextRequest): Promise<Response> {
    const { searchParams } = new URL(request.url);
    
    const filters = SearchParamsCriteriaFiltersParser.parse(searchParams);
    const users = await searcher.search(
        filters,
        searchParams.get("orderBy"),
        searchParams.get("orderType"),
        searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize") as string, 10) : null,
        searchParams.get("pageNumber") ? parseInt(searchParams.get("pageNumber") as string, 10) : null
    );

    return NextResponse.json(users.map((user) => user.toPrimitives()));
}