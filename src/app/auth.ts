import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

import postgresAdapter from "../contexts/cma/auth/infrastructure/PostgresAuthAdapter";
import { OfficialUuidGenerator } from "../contexts/shared/infrastructure/OfficialUuidGenerator";
import { PostgresConnection } from "../contexts/shared/infrastructure/PostgresConnection";

export const { auth, handlers, signIn, signOut } = NextAuth({
	debug: process.env.NODE_ENV === "production",
	basePath: "/api/auth",
	providers: [
		Google({}),
		Resend
	],
	adapter: postgresAdapter(new PostgresConnection(), new OfficialUuidGenerator()),
	callbacks: {
		session({ session, user }) {
			session.userId = user.id;

			return session;
		}
	}
});
