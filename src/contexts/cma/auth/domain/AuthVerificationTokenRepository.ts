import { AuthVerificationToken } from "./AuthVerificationToken";

export interface AuthVerificationTokenRepository {
	save(verificationToken: AuthVerificationToken): Promise<void>;
	search(id: string, token: string): Promise<AuthVerificationToken | null>;
	remove(verificationToken: AuthVerificationToken): Promise<void>;
}
