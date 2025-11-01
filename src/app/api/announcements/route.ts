import { NextRequest } from "next/server";

import { AllCdaAnnouncementsSearcher } from "../../../contexts/cda/announcements/application/search-all/AllCdaAnnouncementsSearcher";
import { PostgresCdaAnnouncementRepository } from "../../../contexts/cda/announcements/infrastructure/PostgresCdaAnnouncementRepository";
import { HTTPNextResponse } from "../../../contexts/shared/infrastructure/http/HTTPNextResponse";
import { PostgresConnection } from "../../../contexts/shared/infrastructure/PostgresConnection";

const searcher = new AllCdaAnnouncementsSearcher(new PostgresCdaAnnouncementRepository(new PostgresConnection()));

export async function GET(_: NextRequest): Promise<Response> {
    const announcements = await searcher.searchAll();

    return HTTPNextResponse.json(announcements);
}
