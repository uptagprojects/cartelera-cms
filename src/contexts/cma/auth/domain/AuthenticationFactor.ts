export interface AuthenticationFactor<T> {
	generate(): Promise<T>;

	verify(code: T): Promise<boolean>;
}
