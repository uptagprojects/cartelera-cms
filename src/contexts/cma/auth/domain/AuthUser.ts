import { AdapterUser } from "next-auth/adapters";

export interface AuthUser extends AdapterUser {
    status: string;
}
