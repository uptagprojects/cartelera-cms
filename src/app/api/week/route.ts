import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest): Promise<Response> {
	return NextResponse.json(
		{
			week: 1
		},
		{
			status: 200
		}
	);
}
