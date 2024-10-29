import { NextRequest, NextResponse } from "next/server";
import path from "path";

import { FileUploader } from "../../../../../contexts/cma/file/application/upload/FileUploader";
import { DropboxFileRepository } from "../../../../../contexts/cma/file/infrastructure/DropboxFileRepository";
import { DropboxConnection } from "../../../../../contexts/shared/infrastructure/DropboxConnection";
import { OfficialUuidGenerator } from "../../../../../contexts/shared/infrastructure/OfficialUuidGenerator";

export async function POST(request: NextRequest): Promise<NextResponse> {
	const formData = await request.formData();

	const file = formData.get("file");
	if (!file) {
		return NextResponse.json({ error: "No files received." }, { status: 400 });
	}

	const buffer = Buffer.from(await file.arrayBuffer());
	const dropboxConnection = new DropboxConnection();

	const url = await new FileUploader(
		new OfficialUuidGenerator(),
		new DropboxFileRepository(dropboxConnection)
	).upload(buffer, path.extname(file.name));

	return NextResponse.json({ url }, { status: 201 });
}
