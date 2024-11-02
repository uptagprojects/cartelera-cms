export abstract class MarkdownRemover {
	abstract remove(value: string, maxValue?: number): Promise<string>;
}
