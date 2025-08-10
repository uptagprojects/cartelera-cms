import { AuthSession } from "../../../../../src/contexts/cma/auth-sessions/domain/AuthSession";
import { AuthSessionRepository } from "../../../../../src/contexts/cma/auth-sessions/domain/AuthSessionRepository";
import { AuthSessionToken } from "../../../../../src/contexts/cma/auth-sessions/domain/AuthSessionToken";
import { UserId } from "../../../../../src/contexts/cma/users/domain/UserId";

export class MockAuthSessionRepository implements AuthSessionRepository {
    private readonly mockSearch = jest.fn();
    private readonly mockSave = jest.fn();
    private readonly mockRemove = jest.fn();
    private readonly mockRemoveAllByUserId = jest.fn();

    async save(authSession: AuthSession): Promise<void> {
        expect(this.mockSave).toHaveBeenCalledWith(authSession.toPrimitives());
    }

    async search(token: AuthSessionToken): Promise<AuthSession | null> {
        expect(this.mockSearch).toHaveBeenCalledWith(token);

        return this.mockSearch() as Promise<AuthSession | null>;
    }

    async remove(session: AuthSession): Promise<void> {
        expect(this.mockRemove).toHaveBeenCalledWith(session.toPrimitives());
    }

    async removeAllByUserId(userId: UserId): Promise<void> {
        expect(this.mockRemoveAllByUserId).toHaveBeenCalledWith(userId);
    }


    shouldSearch(authSession: AuthSession): void {
        this.mockSearch(authSession.getToken());
        this.mockSearch.mockReturnValueOnce(authSession);
    }

    shouldSearchAndReturnNull(token: AuthSessionToken): void {
        this.mockSearch(token);
        this.mockSearch.mockReturnValueOnce(null);
    }

    shouldSave(authSession: AuthSession): void {
        this.mockSave(authSession.toPrimitives());
    }

    shouldRemove(authSession: AuthSession): void {
        this.mockRemove(authSession.toPrimitives());
    }

    shouldRemoveAllByUserId(userId: UserId): void {
        this.mockRemoveAllByUserId(userId);
    }
}
