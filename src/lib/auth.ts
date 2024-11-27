import NextAuth, { customFetch } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

import { authConfig } from "../../auth.config";
import postgresAdapter from "../contexts/cma/auth/infrastructure/PostgresAuthAdapter";
import { UserProviderConfirmer } from "../contexts/cma/users/application/confirm-from-provider/UserProviderConfirmer";
import { UserFinder } from "../contexts/cma/users/domain/UserFinder";
import { PostgresUserRepository } from "../contexts/cma/users/infrastructure/PostgresUserRepository";
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

		async signIn({ user, profile }) {
			if (!user.id) return false;

			const repository = new PostgresUserRepository(new PostgresConnection());

			const savedUser = await new UserFinder(repository).find(user.id);
			const { status } = savedUser.toPrimitives();

			if (status === "pending_confirmation") {
				await new UserProviderConfirmer(
					new PostgresUserRepository(new PostgresConnection())
				).confirm(user.id, profile?.name ?? undefined, profile?.picture);

				return true;
			}

			return savedUser.isActive();
		}
	}
});
