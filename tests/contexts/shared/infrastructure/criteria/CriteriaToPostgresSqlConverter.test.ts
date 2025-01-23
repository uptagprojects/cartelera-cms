import { CriteriaToPostgresSqlConverter } from "../../../../../src/contexts/shared/infrastructure/criteria/CriteriaToPostgresSqlConverter";
import { CriteriaMother } from "../../domain/criteria/CriteriaMother";

describe("CriteriaToSqlConverter should", () => {
	const converter = new CriteriaToPostgresSqlConverter();

	it("generate a select from an empty criteria", () => {
		const query = converter.convert(["id", "name"], "users", CriteriaMother.empty());

		expect(query).toStrictEqual({
			query: "SELECT id, name FROM users;",
			params: []
		});
	});

	it("generate a select with order", () => {
		const query = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.emptySorted("id", "ASC")
		);

		expect(query).toStrictEqual({
			query: "SELECT id, name FROM users ORDER BY $1 ASC;",
			params: ["id"]
		});
	});

	it("generate a select with pagination", () => {
		const query = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.emptyPaginated(10, 4)
		);

		expect(query).toStrictEqual({
			query: "SELECT id, name FROM users LIMIT $1 OFFSET $2;",
			params: [10, 30]
		});
	});

	it("generate a select with one filter", () => {
		const query = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilter("name", "EQUAL", "Jane")
		);

		expect(query).toStrictEqual({
			query: "SELECT id, name FROM users WHERE name = $1;",
			params: ["Jane"]
		});
	});

	it("generate a filtered select escaping fields", () => {
		const query = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilter("name", "EQUAL", "Jane; DROP TABLE users;")
		);

		expect(query).toStrictEqual({
			query: "SELECT id, name FROM users WHERE name = $1;",
			params: ["Jane; DROP TABLE users;"]
		});
	});

	it("generate a select with one filter and sorted", () => {
		const query = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilterSorted("name", "EQUAL", "Jane", "id", "DESC")
		);

		expect(query).toStrictEqual({
			query: "SELECT id, name FROM users WHERE name = $1 ORDER BY $2 DESC;",
			params: ["Jane", "id"]
		});
	});

	it("generate a select with multiple filters", () => {
		const query = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.create({
				filters: [
					{ field: "name", operator: "EQUAL", value: "Jane" },
					{ field: "email", operator: "EQUAL", value: "jane@example.com" }
				],
				orderBy: null,
				orderType: null,
				pageNumber: null,
				pageSize: null
			})
		);

		expect(query).toStrictEqual({
			query: "SELECT id, name FROM users WHERE name = $1 AND email = $2;",
			params: ["Jane", "jane@example.com"]
		});
	});

	it("generate a select with multiple filters and sorted", () => {
		const query = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.create({
				filters: [
					{ field: "name", operator: "EQUAL", value: "John" },
					{ field: "email", operator: "EQUAL", value: "john@example.com" }
				],
				orderBy: "id",
				orderType: "DESC",
				pageNumber: null,
				pageSize: null
			})
		);

		expect(query).toStrictEqual({
			query: "SELECT id, name FROM users WHERE name = $1 AND email = $2 ORDER BY $3 DESC;",
			params: ["John", "john@example.com", "id"]
		});
	});

	it("generate a select with multiple filters, sorted and paginated", () => {
		const query = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.create({
				filters: [
					{ field: "name", operator: "EQUAL", value: "Jane" },
					{ field: "email", operator: "EQUAL", value: "jane@example.com" }
				],
				orderBy: "id",
				orderType: "DESC",
				pageNumber: 2,
				pageSize: 10
			})
		);

		expect(query).toStrictEqual({
			query: "SELECT id, name FROM users WHERE name = $1 AND email = $2 ORDER BY $3 DESC LIMIT $4 OFFSET $5;",
			params: ["Jane", "jane@example.com", "id", 10, 10]
		});
	});

	it("generate a select with one contains filter", () => {
		const query = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilter("name", "CONTAINS", "Jane")
		);

		expect(query).toStrictEqual({
			query: "SELECT id, name FROM users WHERE name LIKE $1;",
			params: ["%Jane%"]
		});
	});

	it("generate a select with one not contains filter", () => {
		const query = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilter("name", "NOT_CONTAINS", "Jane")
		);

		expect(query).toStrictEqual({
			query: "SELECT id, name FROM users WHERE name NOT LIKE $1;",
			params: ["%Jane%"]
		});
	});

	it("generate a select with one not equals filter", () => {
		const query = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilter("name", "NOT_EQUAL", "Jane")
		);

		expect(query).toStrictEqual({
			query: "SELECT id, name FROM users WHERE name != $1;",
			params: ["Jane"]
		});
	});
});
