import { NextRequest } from "next/server";

export async function POST(_req: NextRequest, _res: Response): Promise<Response> {
	return Response.json({}, { status: 403 });
}
