import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest): Promise<Response> {
	return NextResponse.json([], {
		status: 200
	});
}
