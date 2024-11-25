import { NextRequest, NextResponse } from "next/server";

export async function middleware(_: NextRequest): Promise<NextResponse> {
	// you can use getToken() to get the current user

	return NextResponse.next();
}

export const config = {
	// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
	matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"]
};
