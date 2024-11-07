import {
	Adapter,
	AdapterAccount,
	AdapterSession,
	AdapterUser,
	VerificationToken
} from "@auth/core/adapters";

import { InvalidIdentifierError } from "../../../shared/domain/InvalidIdentifierError";
import { UuidGenerator } from "../../../shared/domain/UuidGenerator";
import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { User } from "../../users/domain/User";
import { UserDoesNotExist } from "../../users/domain/UserDoesNotExist";
import { UserEmail } from "../../users/domain/UserEmail";
import { UserId } from "../../users/domain/UserId";
import { PostgresUserRepository } from "../../users/infrastructure/PostgresUserRepository";
import { AuthAccount } from "../domain/AuthAccount";
import { AuthSession } from "../domain/AuthSession";
import { PostgresAuthAccountRepository } from "./PostgresAuthAccountRepository";
import { PostgresAuthSessionRepository } from "./PostgresAuthSessionRepository";
import { PostgresAuthVerificationTokenRepository } from "./PostgresAuthVerificationTokenRepository";

export default function postgresAdapter(
	connection: PostgresConnection,
	uuidGenerator: UuidGenerator
): Adapter {
	const authVerificationTokenRepository = new PostgresAuthVerificationTokenRepository(connection);
	const authAccountRepository = new PostgresAuthAccountRepository(connection);
	const authSessionRepository = new PostgresAuthSessionRepository(connection);
	const userRepository = new PostgresUserRepository(connection);

	return {
		async createVerificationToken(
			verificationToken: VerificationToken
		): Promise<VerificationToken> {
			await authVerificationTokenRepository.save(verificationToken);

			return verificationToken;
		},

		async useVerificationToken({
			identifier,
			token
		}: {
			identifier: string;
			token: string;
		}): Promise<VerificationToken | null> {
			const savedToken = await authVerificationTokenRepository.search(identifier, token);

			if (savedToken) {
				authVerificationTokenRepository.remove(savedToken);
			}

			return savedToken;
		},

		async createUser(user: AdapterUser): Promise<AdapterUser> {
			let savedUser = await userRepository.searchByEmail(new UserEmail(user.email));

			if (!savedUser) {
				savedUser = User.create(
					user.id,
					user.name ?? "",
					user.email,
					user.image ?? "https://avatar.iran.liara.run/public"
				);
			}

			await userRepository.save(savedUser);

			const primitives = savedUser.toPrimitives();

			return {
				id: primitives.id,
				name: primitives.name,
				email: primitives.email,
				emailVerified: primitives.emailVerified,
				image: primitives.avatar
			};
		},

		async getUser(id: string): Promise<AdapterUser | null> {
			const user = await userRepository.search(new UserId(id));

			if (!user) {
				return null;
			}

			const primitives = user.toPrimitives();

			return {
				id: primitives.id,
				name: primitives.name,
				email: primitives.email,
				emailVerified: primitives.emailVerified,
				image: primitives.avatar
			};
		},

		async getUserByEmail(email: string): Promise<AdapterUser | null> {
			const user = await userRepository.searchByEmail(new UserEmail(email));

			if (!user) {
				return null;
			}

			const primitives = user.toPrimitives();

			return {
				id: primitives.id,
				name: primitives.name,
				email: primitives.email,
				emailVerified: primitives.emailVerified,
				image: primitives.avatar
			};
		},

		async getUserByAccount({
			providerAccountId,
			provider
		}: Pick<AdapterAccount, "provider" | "providerAccountId">): Promise<AdapterUser | null> {
			const account = await authAccountRepository.searchByProvider(
				provider,
				providerAccountId
			);

			if (!account) {
				return null;
			}

			const user = await userRepository.search(new UserId(account.userId));

			if (!user) {
				return null;
			}

			const primitives = user.toPrimitives();

			return {
				id: primitives.id,
				name: primitives.name,
				email: primitives.email,
				emailVerified: primitives.emailVerified,
				image: primitives.avatar
			};
		},

		async updateUser(
			user: Partial<AdapterUser> & Pick<AdapterUser, "id">
		): Promise<AdapterUser> {
			if (!user.id) {
				throw new InvalidIdentifierError("User id is required");
			}

			const savedUser = await userRepository.search(new UserId(user.id));

			if (!savedUser) {
				throw new UserDoesNotExist(user.id);
			}

			if (user.name) {
				savedUser.updateName(user.name);
			}

			if (user.email) {
				savedUser.updateEmail(user.email);
			}

			if (user.image) {
				savedUser.updateAvatar(user.image);
			}

			if (user.emailVerified) {
				savedUser.verifyEmail(user.emailVerified);
			}

			await userRepository.save(savedUser);

			const primitives = savedUser.toPrimitives();

			return {
				id: primitives.id,
				name: primitives.name,
				email: primitives.email,
				emailVerified: primitives.emailVerified,
				image: primitives.avatar
			};
		},

		async linkAccount(
			account: AdapterAccount
		): Promise<void | undefined | null | AdapterAccount> {
			const id = await uuidGenerator.generate();

			const saveAccount = {
				...account,
				id,
				session_state: account.session_state?.toString() ?? "",
				expires_at: account.expires_at?.toString() ?? null
			} as AuthAccount;

			await authAccountRepository.save(saveAccount);

			return account;
		},

		async createSession({
			sessionToken,
			userId,
			expires
		}: AdapterSession): Promise<AdapterSession> {
			const id = await uuidGenerator.generate();

			await authSessionRepository.save({
				id,
				sessionToken,
				userId,
				expires
			});

			return {
				userId,
				expires,
				sessionToken
			};
		},

		async getSessionAndUser(sessionToken: string): Promise<{
			session: AdapterSession;
			user: AdapterUser;
		} | null> {
			if (!sessionToken) {
				return null;
			}

			const session = await authSessionRepository.searchByToken(sessionToken);

			if (!session) {
				return null;
			}

			const user = await userRepository.search(new UserId(session.userId));

			if (!user) {
				return null;
			}

			const primitives = user.toPrimitives();

			const adapterUser = {
				id: primitives.id,
				name: primitives.name,
				email: primitives.email,
				emailVerified: primitives.emailVerified,
				image: primitives.avatar
			};

			return {
				session: {
					userId: session.userId,
					expires: session.expires,
					sessionToken: session.sessionToken
				},
				user: adapterUser
			};
		},

		async updateSession(
			session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
		): Promise<AdapterSession | null | undefined> {
			const savedSession = await authSessionRepository.searchByToken(session.sessionToken);

			if (!savedSession) {
				return null;
			}

			const newSession: AuthSession = {
				...savedSession,
				...session
			};

			await authSessionRepository.save(newSession);

			return {
				userId: newSession.userId,
				expires: newSession.expires,
				sessionToken: newSession.sessionToken
			};
		},

		async deleteSession(sessionToken: string): Promise<void> {
			const session = await authSessionRepository.searchByToken(sessionToken);

			if (session) {
				await authSessionRepository.remove(session);
			}
		},

		async unlinkAccount({
			provider,
			providerAccountId
		}: Partial<AdapterAccount>): Promise<void> {
			const account = await authAccountRepository.searchByProvider(
				provider as string,
				providerAccountId as string
			);
			if (account) {
				authAccountRepository.remove(account);
			}
		},

		async deleteUser(userId: string): Promise<void> {
			const id = new UserId(userId);
			await authSessionRepository.removeAllByUserId(id);
			await authAccountRepository.removeAllByUserId(id);

			const user = await userRepository.search(new UserId(userId));
			if (user) {
				user.archive();
				await userRepository.save(user);
			}
		}
	} as Adapter;
}
