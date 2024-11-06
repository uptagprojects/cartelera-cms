import { Adapter, AdapterUser, VerificationToken } from "@auth/core/adapters";

import { User } from "../../cma/users/domain/User";
import { UserDoesNotExist } from "../../cma/users/domain/UserDoesNotExist";
import { UserEmail } from "../../cma/users/domain/UserEmail";
import { UserId } from "../../cma/users/domain/UserId";
import { PostgresUserRepository } from "../../cma/users/infrastructure/PostgresUserRepository";
import { InvalidIdentifierError } from "../domain/InvalidIdentifierError";
import { PostgresConnection } from "./PostgresConnection";
import { UuidGenerator } from "../domain/UuidGenerator";

export class AuthAdapter implements Adapter {
	private readonly userRepository: PostgresUserRepository;
	constructor(
		private readonly connection: PostgresConnection,
		private readonly uuidGenerator: UuidGenerator
	) {
		this.userRepository = new PostgresUserRepository(connection);
	}

	async createVerificationToken(
		verificationToken: VerificationToken
	): Promise<VerificationToken> {
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

		await this.connection.execute(
			"DELETE FROM cma__verification_token WHERE identifier = $1 AND token = $2",
			[identifier, token]
		);

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


	async linkAccount(account) {
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
		`
  
		const params = [
			id,
		  account.userId,
		  account.provider,
		  account.type,
		  account.providerAccountId,
		  account.access_token,
		  account.expires_at,
		  account.refresh_token,
		  account.id_token,
		  account.scope,
		  account.session_state,
		  account.token_type
		];

		await this.connection.execute(sql, params)


  
		const result = await client.query(sql, params)
		return this.mapExpiresAt({

		})
	  },

	  
	private mapExpiresAt(account: any): any {
		const expires_at: number = parseInt(account.expires_at)
		return {
			...account,
			expires_at,
		}
	}
}
