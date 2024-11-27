import NextAuth, { Profile, customFetch } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

import { authConfig } from "../../auth.config";
import postgresAdapter from "../contexts/cma/auth/infrastructure/PostgresAuthAdapter";
import { OfficialUuidGenerator } from "../contexts/shared/infrastructure/OfficialUuidGenerator";
import { PostgresConnection } from "../contexts/shared/infrastructure/PostgresConnection";
import { PostgresUserRepository } from "../contexts/cma/users/infrastructure/PostgresUserRepository";
import { logger } from "../contexts/shared/infrastructure/telemetry/telemetry";
import { UserEmail } from "../contexts/cma/users/domain/UserEmail";
import { UserProviderConfirmer } from "../contexts/cma/users/application/confirm-from-provider/UserProviderConfirmer";
import { AuthUser } from "../contexts/cma/auth/domain/AuthUser";
import { AuthAccount } from "../contexts/cma/auth/domain/AuthAccount";

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
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.name = user.name;
			}
			return token;
		},

		// eslint-disable-next-line $rulename
		async signIn({ user, profile }: { user: AuthUser, account: AuthAccount | null, profile?: Profile }) {
			if(!user.id) return false;

			if(user.status === "pending_confirmation") {
				await new UserProviderConfirmer(new PostgresUserRepository(new PostgresConnection())).confirm(user.id, profile?.name ?? undefined, profile?.picture);
				return true;
			}

			return user.status === "active";
		}
	}
});
