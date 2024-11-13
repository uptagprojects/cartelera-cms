import { NextRequest, NextResponse } from "next/server";

import { AllAnnouncementsSearcher } from "../../../contexts/cda/announcements/application/search-all/AllAnnouncementsSearcher";
import { PostgresAnnouncementRepository } from "../../../contexts/cda/announcements/infrastructure/PostgresAnnouncementRepository";
import { PostgresConnection } from "../../../contexts/shared/infrastructure/PostgresConnection";

const searcher = new AllAnnouncementsSearcher(
	new PostgresAnnouncementRepository(new PostgresConnection())
);

export async function GET(_: NextRequest): Promise<Response> {
	const announcements = await searcher.searchAll();

	return NextResponse.json(announcements.map(announcement => announcement.toPrimitives()));
}
