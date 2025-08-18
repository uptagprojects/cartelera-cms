import { MagicLinkGenerator } from "../../../../../src/contexts/system/email/domain/MagicLinkGenerator";

export class MockMagicLinkGenerator implements MagicLinkGenerator {
    private mockGenerate = jest.fn();

    async generate(userId: string): Promise<string> {
        return this.mockGenerate(userId);
    }

    shouldGenerate(url: string): void {
        this.mockGenerate.mockReturnValue(Promise.resolve(url));
    }
}
