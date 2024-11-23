import { NextAuthConfig } from "next-auth";
import google from "next-auth/providers/google";

export const authConfig = {
	debug: process.env.NODE_ENV === "production",
	basePath: "/api/auth",
	providers: [
		google({
			allowDangerousEmailAccountLinking: process.env.NODE_ENV === "development"
		})
	],
	callbacks: {
		session({ session }) {
			session.userId = session.user.id;

			return session;
		}
	}
} satisfies NextAuthConfig;
