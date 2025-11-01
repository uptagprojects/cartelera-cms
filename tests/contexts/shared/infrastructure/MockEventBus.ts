import { DomainEvent } from "../../../../src/contexts/shared/domain/event/DomainEvent";
import { EventBus } from "../../../../src/contexts/shared/domain/event/EventBus";

export class MockEventBus implements EventBus {
	private readonly mockPublish = jest.fn();

	async publish(events: DomainEvent[]): Promise<void> {
		if (events.length === 0) {
			expect(this.mockPublish).toHaveBeenCalledWith([]);
		} else {
			expect(this.mockPublish).toHaveBeenCalledWith(
				expect.arrayContaining(
					events.map(event =>
						expect.objectContaining({
							...event,
							eventId: expect.any(String),
							occurredOn: expect.anything()
						})
					)
				)
			);
		}
	}

	shouldPublish(events: DomainEvent[]): void {
		this.mockPublish(events);
	}
}
