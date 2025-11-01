export interface AuthAccount {
    authorization_details?: [];
    id: string;
    userId: string;
    provider: string;
    type: string;
    providerAccountId: string;
    access_token: string | null;
    expires_at: string | null;
    refresh_token: string | null;
    id_token: string | null;
    scope: string | null;
    session_state: string | null;
    token_type: string | null;
}
