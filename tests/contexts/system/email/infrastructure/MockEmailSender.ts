import { Email } from "../../../../../src/contexts/system/email/domain/Email";
import { EmailSender } from "../../../../../src/contexts/system/email/domain/EmailSender";

export class MockEmailSender implements EmailSender {
	private mockSend = jest.fn();

	async send<T extends Email>(email: T): Promise<void> {
		this.mockSend(email);
	}

	shouldSend(): void {
		this.mockSend = jest.fn();
	}

	assertSendHaveBeenCalledWith(expectedEmail: any): void {
		expect(this.mockSend).toHaveBeenCalledWith(expectedEmail);
	}
}
