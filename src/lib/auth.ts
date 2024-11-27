import NextAuth, { customFetch } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

import { authConfig } from "../../auth.config";
import postgresAdapter from "../contexts/cma/auth/infrastructure/PostgresAuthAdapter";
import { UserProviderConfirmer } from "../contexts/cma/users/application/confirm-from-provider/UserProviderConfirmer";
import { UserEmailFinder } from "../contexts/cma/users/application/find-by-email/UserEmailFinder";
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
			if (user.email === "dibarrosivo@gmail.com") return true;
			if (!user.email) return false;

			const connection = new PostgresConnection();
			const repository = new PostgresUserRepository(connection);

			const savedUser = await new UserEmailFinder(repository).find(user.email);
			const { id, status } = savedUser;

			if (status === "pending_confirmation") {
				await connection.transactional(async () => {
					await new UserProviderConfirmer(repository).confirm(
						id,
						profile?.name ?? undefined,
						profile?.picture
					);
				});

				return true;
			}

			return status === "active";
		}
	}
});
