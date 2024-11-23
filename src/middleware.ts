import NextAuth from "next-auth";

import { authConfig } from "./app/auth.config";

const { auth } = NextAuth(authConfig);
export const middleware = auth;

export const config = {
	// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
};
