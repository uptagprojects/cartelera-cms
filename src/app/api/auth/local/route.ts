import { NextRequest } from "next/server";

export async function POST(_req: NextRequest): Promise<Response> {
	return Response.json({}, { status: 403 });
}
