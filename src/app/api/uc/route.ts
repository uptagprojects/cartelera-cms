import { NextRequest, NextResponse } from "next/server";
import { AnnouncementsByCriteriaSearcher } from "../../../contexts/cda/announcements/application/search_by_criteria/AnnouncementsByCriteriaSearcher";
import { PostgresAnnouncementRepository } from "../../../contexts/cda/announcements/infrastructure/PostgresAnnouncementRepository";
import { PostgresConnection } from "../../../contexts/shared/infrastructure/PostgresConnection";
import { SearchParamsCriteriaFiltersParser } from "../../../contexts/shared/infrastructure/criteria/SearchParamsCriteriaFiltersParser";

//const searcher = new AnnouncementsByCriteriaSearcher(new PostgresAnnouncementRepository(new PostgresConnection()));

export async function GET(request: NextRequest): Promise<Response> {


    return NextResponse.json({ id: 'patatadosmil', name: 'test succesfully' });

    // const { searchParams } = new URL(request.url);

    // const filters = SearchParamsCriteriaFiltersParser.parse(searchParams);
    // const announcements = await searcher.search(
    // 	filters,
    // 	searchParams.get("orderBy"),
    // 	searchParams.get("orderType"),
    // 	searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize") as string, 10) : null,
    // 	searchParams.get("pageNumber")
    // 		? parseInt(searchParams.get("pageNumber") as string, 10)
    // 		: null
    // );

    // return NextResponse.json(announcements.map(announcement => announcement.toPrimitives()));
}