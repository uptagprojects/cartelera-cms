import { DomainEvent } from "../../../../src/contexts/shared/domain/event/DomainEvent";
import { EventBus } from "../../../../src/contexts/shared/domain/event/EventBus";

export class MockEventBus implements EventBus {
	private mockPublish = jest.fn();
	private publishedEvents: DomainEvent[] = [];

	async publish(events: DomainEvent[]): Promise<void> {
		this.mockPublish(events);
		this.publishedEvents.push(...events);
	}

	shouldPublish(events: DomainEvent[]): void {
		this.mockPublish = jest.fn();
	}

	getPublishedEvents(): DomainEvent[] {
		return this.publishedEvents;
	}

	assertLastPublishedEventIs(expectedEvent: any): void {
		const lastEvent = this.publishedEvents[this.publishedEvents.length - 1];
		expect(lastEvent).toBeInstanceOf(expectedEvent);
	}
}
