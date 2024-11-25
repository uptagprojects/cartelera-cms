import { NextAuthConfig } from "next-auth";

export const authConfig = {
	debug: process.env.NODE_ENV !== "production",
	basePath: "/api/auth",
	theme: {
		brandColor: "var(--orange-500)"
	},
	secret: process.env.AUTH_SECRET,
	trustHost: true,
	providers: [],
	callbacks: {
		session({ session }) {
			session.userId = session.user.id;

			return session;
		}
	}
} satisfies NextAuthConfig;
