import { UserId } from "../../users/domain/UserId";
import { Auth } from "./Auth";

export interface AuthRepository {
	save(auth: Auth): Promise<void>;
	search(id: UserId): Promise<Auth | null>;
}
