export interface AuthSession {
    id: string;
    expires: Date;
    sessionToken: string;
    userId: string;
}
