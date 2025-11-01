import { NextRequest, NextResponse } from "next/server";

import { ImageUploader } from "../../../../../contexts/cma/images/application/upload/ImageUploader";
import { CloudinaryImageRepository } from "../../../../../contexts/cma/images/infrastructure/CloudinaryImageRepository";
import { OfficialUuidGenerator } from "../../../../../contexts/shared/infrastructure/OfficialUuidGenerator";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const formData = await request.formData();

    const file = formData.get("image") as File | null;
    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const image = await new ImageUploader(new OfficialUuidGenerator(), new CloudinaryImageRepository()).upload(buffer);

    return NextResponse.json(image.toPrimitives(), { status: 201 });
}
