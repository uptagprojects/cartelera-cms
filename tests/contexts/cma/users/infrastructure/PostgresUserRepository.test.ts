import { PostgresUserRepository } from "../../../../../src/contexts/cma/users/infrastructure/PostgresUserRepository";
import { PostgresConnection } from "../../../../../src/contexts/shared/infrastructure/PostgresConnection";
import { CriteriaMother } from "../../../shared/domain/criteria/CriteriaMother";
import { UserEmailMother } from "../domain/UserEmailMother";
import { UserIdMother } from "../domain/UserIdMother";
import { UserMother } from "../domain/UserMother";

describe("PostgresUserRepository should", () => {
	const connection = new PostgresConnection();
	const repository = new PostgresUserRepository(connection);

	beforeEach(async () => {
		await connection.truncate("cma__users");
	});
	afterAll(async () => {
		await connection.close();
	});

	it("save an user", async () => {
		const user = UserMother.create();

		await repository.save(user);
	});

	it("return null searching a non existent user", async () => {
		const userId = UserIdMother.create();

		expect(await repository.search(userId)).toBeNull();
	});

	it("return existing user", async () => {
		const user = UserMother.create();

		await repository.save(user);

		expect(await repository.search(user.getId())).toStrictEqual(user);
	});

	it("return null searching by email a non existent user", async () => {
		const userEmail = UserEmailMother.create();

		expect(await repository.searchByEmail(userEmail)).toBeNull();
	});

	it("return existing user searching by email", async () => {
		const expectedEmail = UserEmailMother.create();
		const user = UserMother.create({ email: expectedEmail.value });

		await repository.save(user);

		expect(await repository.searchByEmail(expectedEmail)).toStrictEqual(user);
	});

	it("return existing user searching by criteria", async () => {
		const expectedFirstUser = UserMother.create();
		const expectedSecondUser = UserMother.create({ name: "Jane Doe" });

		await repository.save(expectedFirstUser);
		await repository.save(expectedSecondUser);

		expect(
			await repository.matching(CriteriaMother.withOneFilter("name", "EQUAL", "Jane Doe"))
		).toStrictEqual([expectedSecondUser]);
	});
});
