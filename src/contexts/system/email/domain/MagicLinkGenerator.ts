export abstract class MagicLinkGenerator {
	abstract generate(userId: string): Promise<string>;
}
