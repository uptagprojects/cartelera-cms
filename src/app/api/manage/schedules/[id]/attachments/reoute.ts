import { NextRequest, NextResponse } from "next/server";

import { ScheduleAttachmentsByScheduleSearcher } from "../../../../../../contexts/cma/schedule-attachments/application/search-all-by-schedule/ScheduleAttachmentsByScheduleSearcher";
import { PostgresScheduleAttachmentRepository } from "../../../../../../contexts/cma/schedule-attachments/infrastructure/PostgresScheduleAttachmentRepository";
import { PostgresConnection } from "../../../../../../contexts/shared/infrastructure/PostgresConnection";

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params;
	const searcher = new ScheduleAttachmentsByScheduleSearcher(
		new PostgresScheduleAttachmentRepository(new PostgresConnection())
	);

	const attachments = await searcher.search(id);

	return NextResponse.json(attachments.map(attachment => attachment.toPrimitives()));
}
