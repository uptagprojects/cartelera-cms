import { NextRequest, NextResponse } from "next/server";
import path from "path";

import { FileUploader } from "../../../../../contexts/cma/files/application/upload/FileUploader";
import { DropboxFileRepository } from "../../../../../contexts/cma/files/infrastructure/DropboxFileRepository";
import { DropboxConnection } from "../../../../../contexts/shared/infrastructure/file-storage/dropbox/DropboxConnection";
import { OfficialUuidGenerator } from "../../../../../contexts/shared/infrastructure/OfficialUuidGenerator";

export async function POST(request: NextRequest): Promise<NextResponse> {
	const formData = await request.formData();

	const file = formData.get("file") as File | null;
	if (!file) {
		return NextResponse.json({ error: "No files received." }, { status: 400 });
	}

	const buffer = Buffer.from(await file.arrayBuffer());
	const dropboxConnection = new DropboxConnection();

	const f = await new FileUploader(
		new OfficialUuidGenerator(),
		new DropboxFileRepository(dropboxConnection)
	).upload(buffer, path.extname(file.name));

	return NextResponse.json(f.toPrimitives(), { status: 201 });
}
