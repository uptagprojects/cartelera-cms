import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { loggerWrapper } from "./contexts/shared/infrastructure/telemetry/telemetry";

export async function middleware(request: NextRequest, event: NextFetchEvent): Promise<NextResponse> {
    // you can use getToken() to get the current user

    event.waitUntil(loggerWrapper.middleware(request));

    return NextResponse.next();
}

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"]
};
