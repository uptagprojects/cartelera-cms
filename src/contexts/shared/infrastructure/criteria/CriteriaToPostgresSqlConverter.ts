import { Criteria } from "../../domain/criteria/Criteria";
import { Filter } from "../../domain/criteria/Filter";

type Mappings = { [key: string]: string };

export class CriteriaToPostgresSqlConverter {
	convert(
		fieldsToSelect: string[],
		tableName: string,
		criteria: Criteria,
		mappings: Mappings = {}
	): { query: string; params: (string | number)[] } {
		let query = `SELECT ${fieldsToSelect.join(", ")} FROM ${tableName}`;
		const params: (string | number)[] = [];

		if (criteria.hasFilters()) {
			query += " WHERE ";

			const whereQueries = criteria.filters.value.map(filter =>
				this.generateWhereQuery(filter, mappings, params)
			);

			query += whereQueries.join(" AND ");
		}

		if (criteria.hasOrder()) {
			query += ` ORDER BY $${params.length + 1} ${criteria.order.orderType.value}`;

			params.push(criteria.order.orderBy.value);
		}

		if (criteria.pageSize !== null) {
			query += ` LIMIT $${params.length + 1}`;

			params.push(criteria.pageSize);
		}

		if (criteria.pageSize !== null && criteria.pageNumber !== null) {
			query += ` OFFSET $${params.length + 1}`;

			params.push(criteria.pageSize * (criteria.pageNumber - 1));
		}

		const finalQuery = { query: `${query};`, params };

		return finalQuery;
	}

	private generateWhereQuery(
		filter: Filter,
		mappings: Mappings = {},
		params: (string | number)[]
	): string {
		const field = mappings[filter.field.value] || filter.field.value;

		let queryPart = `${field} `;
		const value = filter.value.value;

		const paramIndex = `$${params.length + 1}`;

		if (filter.operator.isContains()) {
			queryPart += `LIKE ${paramIndex}`;
			params.push(`%${value}%`);
		} else if (filter.operator.isNotContains()) {
			queryPart += `NOT LIKE ${paramIndex}`;
			params.push(`%${value}%`);
		} else if (filter.operator.isNotEquals()) {
			queryPart += `!= ${paramIndex}`;
			params.push(value);
		} else if (filter.operator.isGreaterThan()) {
			queryPart += `> ${paramIndex}`;
			params.push(value);
		} else if (filter.operator.isGreaterThanOrEqual()) {
			queryPart += `>= ${paramIndex}`;
			params.push(value);
		} else if (filter.operator.isLowerThan()) {
			queryPart += `< ${paramIndex}`;
			params.push(value);
		} else if (filter.operator.isLowerThanOrEqual()) {
			queryPart += `<= ${paramIndex}`;
			params.push(value);
		} else {
			queryPart += `${filter.operator.value} ${paramIndex}`;
			params.push(value);
		}

		return queryPart;
	}
}
