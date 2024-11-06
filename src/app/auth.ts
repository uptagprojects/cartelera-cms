import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { AuthAdapter } from "../contexts/shared/infrastructure/AuthAdapter";
import { OfficialUuidGenerator } from "../contexts/shared/infrastructure/OfficialUuidGenerator";
import { PostgresConnection } from "../contexts/shared/infrastructure/PostgresConnection";

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
	return {
		redirectTo: "/manage",
		providers: [
			Google({
				clientId: process.env.AUTH_GOOGLE_ID ?? "google-client-id",
				clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "google-client-secret"
			})
		],
		adapter: new AuthAdapter(new PostgresConnection(), new OfficialUuidGenerator())
	};
});
