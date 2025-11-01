import { MarkdownRemover } from "../../../../src/contexts/shared/domain/MarkdownRemover";

export class MockMarkdownRemover implements MarkdownRemover {
	private readonly mockRemove = jest.fn();

	async remove(value: string, maxValue?: number): Promise<string> {
		return this.mockRemove(value, maxValue) as Promise<string>;
	}

	shouldRemove(input: string, output: string): void {
		this.mockRemove.mockReturnValueOnce(output);
	}
}
