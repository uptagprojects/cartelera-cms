import { NextRequest, NextResponse } from "next/server";
import { GuideAttachmentsByGuideSearcher } from "../../../../../../contexts/cma/guide-attachments/application/search-all-by-schedule/GuideAttachmentsByGuideSearcher";
import { PostgresGuideAttachmentRepository } from "../../../../../../contexts/cma/guide-attachments/infrastructure/PostgresGuideAttachmentRepository";
import { PostgresConnection } from "../../../../../../contexts/shared/infrastructure/PostgresConnection";

export async function GET(_: NextRequest, {
    params
}: { params: Promise<{ id: string }> }): Promise<Response> {
    const { id } = await params;
	const searcher = new GuideAttachmentsByGuideSearcher(
		new PostgresGuideAttachmentRepository(new PostgresConnection())
	);

	const attachments = await searcher.search(id);

	return NextResponse.json(attachments.map(attachment => attachment.toPrimitives()));
}
