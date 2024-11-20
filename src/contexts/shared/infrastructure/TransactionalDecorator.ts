import { DatabaseConnection } from "../domain/DatabaseConnection";

export class TransactionalDecorator {
	static decorate<T>(decorated: T, connection: DatabaseConnection): T {
		// @ts-expect-error Property 'decorated' does not exist on type 'never'.
		return new Proxy(decorated as object, {
			get(target, property, _receiver) {
				// @ts-expect-error Property 'property' does not exist on type 'never'.
				const originalMethod = target[property];
				if (typeof originalMethod === "function") {
					return async (...args: Array<unknown>) => {
						try {
							await connection.beginTransaction();
							const result = await originalMethod.apply(target, args);
							await connection.commit();

							return result;
						} catch (error) {
							await connection.rollback();
							throw error;
						}
					};
				}

				return originalMethod;
			}
		});
	}
}
