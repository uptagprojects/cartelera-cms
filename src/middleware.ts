import { NextRequest, NextResponse } from "next/server";

import { HTTPNextResponse } from "./contexts/shared/infrastructure/http/HTTPNextResponse";

export async function middleware(request: NextRequest): Promise<NextResponse> {
	if (request.method === "GET") {
		const response = NextResponse.next();
		const token = request.cookies.get("session")?.value ?? null;
		if (token !== null) {
			// Only extend cookie expiration on GET requests since we can be sure
			// a new session wasn't set when handling the request.
			response.cookies.set("session", token, {
				path: "/",
				maxAge: 60 * 60 * 24 * 30,
				sameSite: "lax",
				httpOnly: true,
				secure: process.env.NODE_ENV === "production"
			});
		}

		return response;
	}

	const originHeader = request.headers.get("Origin");
	// NOTE: You may need to use `X-Forwarded-Host` instead
	const hostHeader = request.headers.get("Host");
	if (originHeader === null || hostHeader === null) {
		return HTTPNextResponse.invalidHeadersError();
	}

	let origin: URL;
	try {
		origin = new URL(originHeader);
	} catch {
		return HTTPNextResponse.invalidHeadersError();
	}
	if (origin.host !== hostHeader) {
		return HTTPNextResponse.unauthorizedError();
	}

	return NextResponse.next();
}
