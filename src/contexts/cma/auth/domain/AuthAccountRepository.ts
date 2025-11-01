import { UserId } from "../../users/domain/UserId";
import { AuthAccount } from "./AuthAccount";

export interface AuthAccountRepository {
    save(account: AuthAccount): Promise<void>;
    search(id: string): Promise<AuthAccount | null>;
    searchByProvider(provider: string, providerAccountId: string): Promise<AuthAccount | null>;
    remove(account: AuthAccount): Promise<void>;
    removeAllByUserId(userId: UserId): Promise<void>;
}
