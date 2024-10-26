import { User } from "../../../../../src/contexts/cma/users/domain/User";
import { UserEmail } from "../../../../../src/contexts/cma/users/domain/UserEmail";
import { UserPassword } from "../../../../../src/contexts/cma/users/domain/UserPassword";
import { UserRepository } from "../../../../../src/contexts/cma/users/domain/UserRepository";

export class MockUserRepository implements UserRepository {
    private readonly mockSearchByEmailAndPassword = jest.fn();
    private readonly mockSave = jest.fn();

    async searchByEmailAndPassword(email: UserEmail, password: UserPassword): Promise<User | null> {
        expect(this.mockSearchByEmailAndPassword).toHaveBeenCalledWith(email, password);
        return this.mockSearchByEmailAndPassword() as Promise<User | null>;
    }

    async save(user: User): Promise<void> {
        expect(this.mockSave).toHaveBeenCalledWith(user.toPrimitives());
    }

    shouldSearchByEmailAndPassword(user: User, password: UserPassword): void {
        const { email } = user.toPrimitives();
        this.mockSearchByEmailAndPassword(email, password);
        this.mockSearchByEmailAndPassword.mockReturnValueOnce(user);
    }

    shouldNotSearchByEmailAndPassword(email: UserEmail, password: UserPassword): void {
        this.mockSearchByEmailAndPassword(email, password);
        this.mockSearchByEmailAndPassword.mockReturnValueOnce(null);
    }
    
    shouldSave(user:User): void {
        this.mockSave(user.toPrimitives());
    }
}