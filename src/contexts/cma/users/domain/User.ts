import { UserEmail } from "./UserEmail";
import { UserEmailIsNotValid } from "./UserEmailIsNotValid";
import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserPassword } from "./UserPassword";

export class User {
    readonly id: UserId;
    readonly name: UserName;
    readonly email: UserEmail;
    readonly password: UserPassword;
  
    constructor(id: UserId, name: UserName, email: UserEmail, password: UserPassword) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
    }
}