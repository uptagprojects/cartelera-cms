import { UserFinder } from "../../../../../src/contexts/cma/users/domain/UserFinder";
import { User } from "../../../../../src/contexts/cma/users/domain/User";

export class MockUserFinder extends UserFinder {
private mockFind = jest.fn();

constructor() {
super(null as any);
}

async find(id: string): Promise<User> {
return this.mockFind() as Promise<User>;
}

shouldFind(user: User): void {
this.mockFind.mockReturnValueOnce(user);
}
}
