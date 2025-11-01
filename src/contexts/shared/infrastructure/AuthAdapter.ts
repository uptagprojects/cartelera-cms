import { Adapter, AdapterAccount, AdapterSession, AdapterUser, VerificationToken } from "@auth/core/adapters";

import { User } from "../../cma/users/domain/User";
import { UserDoesNotExistError } from "../../cma/users/domain/UserDoesNotExistError";
import { UserEmail } from "../../cma/users/domain/UserEmail";
import { UserId } from "../../cma/users/domain/UserId";
import { PostgresUserRepository } from "../../cma/users/infrastructure/PostgresUserRepository";
import { InvalidIdentifierError } from "../domain/InvalidIdentifierError";
import { UuidGenerator } from "../domain/UuidGenerator";
import { PostgresConnection } from "./PostgresConnection";

type DatabaseSession = {
    id: string;
    userId: string;
    expires: Date;
    sessionToken: string;
};

export class AuthAdapter implements Adapter {
    private readonly userRepository: PostgresUserRepository;
    constructor(
        private readonly connection: PostgresConnection,
        private readonly uuidGenerator: UuidGenerator
    ) {
        this.userRepository = new PostgresUserRepository(connection);
    }

    async createVerificationToken(verificationToken: VerificationToken): Promise<VerificationToken> {
        const { identifier, expires, token } = verificationToken;

        await this.connection.execute(
            "INSERT INTO cma__verification_token ( identifier, expires, token ) VALUES ($1, $2, $3)",
            [identifier, expires, token]
        );

        return verificationToken;
    }

    async useVerificationToken({
        identifier,
        token
    }: {
        identifier: string;
        token: string;
    }): Promise<VerificationToken | null> {
        const saved = await this.connection.searchOne<VerificationToken>(
            "SELECT identifier, expires, token FROM cma__verification_token WHERE identifier = $1 AND token = $2",
            [identifier, token]
        );

        await this.connection.execute("DELETE FROM cma__verification_token WHERE identifier = $1 AND token = $2", [
            identifier,
            token
        ]);

        return saved;
    }

    async createUser(user: AdapterUser): Promise<AdapterUser> {
        let savedUser = await this.userRepository.searchByEmail(new UserEmail(user.email));

        if (!savedUser) {
            savedUser = User.create(
                user.id,
                user.name ?? "",
                user.email,
                user.image ?? "https://avatar.iran.liara.run/public"
            );
        }

        await this.userRepository.save(savedUser);

        const primitives = savedUser.toPrimitives();

        return {
            id: primitives.id,
            name: primitives.name,
            email: primitives.email,
            emailVerified: primitives.emailVerified,
            image: primitives.avatar
        };
    }

    async getUser(id: string): Promise<AdapterUser | null> {
        const user = await this.userRepository.search(new UserId(id));

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
    }

    async getUserByEmail(email: string): Promise<AdapterUser | null> {
        const user = await this.userRepository.searchByEmail(new UserEmail(email));

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
    }

    async getUserByAccount({
        providerAccountId,
        provider
    }: {
        providerAccountId: string;
        provider: string;
    }): Promise<AdapterUser | null> {
        const account = await this.connection.searchOne<{
            user_id: string;
        }>("SELECT user_id FROM cma__accounts WHERE provider = $1 AND provider_account_id = $2", [
            provider,
            providerAccountId
        ]);

        if (!account) {
            return null;
        }

        const user = await this.userRepository.search(new UserId(account.user_id));

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
    }

    async updateUser(user: Partial<AdapterUser>): Promise<AdapterUser> {
        if (!user.id) {
            throw new InvalidIdentifierError("User id is required");
        }

        const savedUser = await this.userRepository.search(new UserId(user.id));

        if (!savedUser) {
            throw new UserDoesNotExistError(user.id);
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

        await this.userRepository.save(savedUser);

        const primitives = savedUser.toPrimitives();

        return {
            id: primitives.id,
            name: primitives.name,
            email: primitives.email,
            emailVerified: primitives.emailVerified,
            image: primitives.avatar
        };
    }

    async linkAccount(account: AdapterAccount): Promise<void> {
        const id = await this.uuidGenerator.generate();
        const sql = `
		insert into cma__accounts 
		(
		  id,
		  user_id, 
		  provider, 
		  type, 
		  provider_account_id, 
		  access_token,
		  expires_at,
		  refresh_token,
		  id_token,
		  scope,
		  session_state,
		  token_type
		)
		values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
		`;

        await this.connection.execute(sql, [
            id,
            account.userId,
            account.provider,
            account.type,
            account.providerAccountId,
            account.access_token ?? null,
            account.expires_at ?? null,
            account.refresh_token ?? null,
            account.id_token ?? null,
            account.scope ?? null,
            account.session_state?.toString() ?? null,
            account.token_type ?? null
        ]);
    }

    async createSession({ sessionToken, userId, expires }: AdapterSession): Promise<AdapterSession> {
        const id = await this.uuidGenerator.generate();

        await this.connection.execute(
            "INSERT INTO cma__sessions (id, user_id, expires, session_token) VALUES ($1, $2, $3, $4)",
            [id, userId, expires, sessionToken]
        );

        return {
            userId,
            expires,
            sessionToken
        };
    }

    async getSessionAndUser(sessionToken: string | undefined): Promise<{
        session: AdapterSession;
        user: AdapterUser;
    } | null> {
        if (sessionToken === undefined) {
            return null;
        }

        const result = await this.connection.searchOne<DatabaseSession>(
            "SELECT id, user_id as userId, expires, session_token as sessionToken FROM cma__sessions WHERE session_token = $1",
            [sessionToken]
        );

        if (!result) {
            return null;
        }

        const user = await this.userRepository.search(new UserId(result.userId));

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
                userId: result.userId,
                expires: result.expires,
                sessionToken: result.sessionToken
            },
            user: adapterUser
        };
    }

    async updateSession(
        session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
    ): Promise<AdapterSession | null | undefined> {
        const { sessionToken } = session;

        const savedSession = await this.connection.searchOne<DatabaseSession>(
            "SELECT id, user_id, expires, session_token FROM cma__sessions WHERE session_token = $1",
            [sessionToken]
        );

        if (!savedSession) {
            return null;
        }

        const newSession: AdapterSession = {
            ...savedSession,
            ...session
        };

        await this.connection.execute("UPDATE cma__sessions SET expires = $2 WHERE session_token = $1", [
            newSession.sessionToken,
            newSession.expires
        ]);

        return newSession;
    }

    async deleteSession(sessionToken: string): Promise<void> {
        await this.connection.execute("DELETE FROM cma__sessions WHERE session_token = $1", [sessionToken]);
    }

    async unlinkAccount(partialAccount: Partial<AdapterAccount>): Promise<void> {
        const { provider, providerAccountId } = partialAccount;
        await this.connection.execute("DELETE FROM cma__accounts WHERE provider_account_id = $1 AND provider = $2", [
            providerAccountId as string,
            provider as string
        ]);
    }

    async deleteUser(userId: string): Promise<void> {
        const user = await this.userRepository.search(new UserId(userId));
        if (user) {
            user.archive();
            await this.userRepository.save(user);
        }
        await this.connection.execute("DELETE FROM cma__sessions WHERE user_id = $1", [userId]);
        await this.connection.execute("DELETE FROM cma__accounts WHERE user_id = $1", [userId]);
    }
}
