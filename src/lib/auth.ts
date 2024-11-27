import NextAuth, { customFetch } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

import { authConfig } from "../../auth.config";
import postgresAdapter from "../contexts/cma/auth/infrastructure/PostgresAuthAdapter";
import { OfficialUuidGenerator } from "../contexts/shared/infrastructure/OfficialUuidGenerator";
import { PostgresConnection } from "../contexts/shared/infrastructure/PostgresConnection";

export const { auth, handlers, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		...authConfig.providers,
		Google({
			[customFetch]: fetch,
			allowDangerousEmailAccountLinking: true
		}),
		Resend({
			from: "PNFi <octagon@pnfi.pro>"
		})
	],
	session: { strategy: "jwt" },
	adapter: postgresAdapter(new PostgresConnection(), new OfficialUuidGenerator()),
	callbacks: {
		async jwt({ token, user }) {
			token.id = user.id;
			token.email = user.email;
			token.name = user.name;

			return token;
		},

		async signIn() {
			return true;
		}
	}
});
