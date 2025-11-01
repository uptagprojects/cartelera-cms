import { Event } from "../../../../../src/contexts/cma/events/domain/Event";
import { EventId } from "../../../../../src/contexts/cma/events/domain/EventId";
import { EventRepository } from "../../../../../src/contexts/cma/events/domain/EventRepository";
import { Criteria } from "../../../../../src/contexts/shared/domain/criteria/Criteria";

export class MockEventRepository implements EventRepository {
	private readonly mockSearch = jest.fn();
	private readonly mockSearchAll = jest.fn();
	private readonly mockMatching = jest.fn();
	private readonly mockSave = jest.fn();
	private readonly mockRemove = jest.fn();

	async save(_event: Event): Promise<void> {
		this.mockSave();
	}

	async search(_id: EventId): Promise<Event | null> {
		return this.mockSearch() as Promise<Event | null>;
	}

	async searchAll(): Promise<Event[]> {
		return this.mockSearchAll() as Promise<Event[]>;
	}

	async matching(_criteria: Criteria): Promise<Event[]> {
		return this.mockMatching() as Promise<Event[]>;
	}

	async remove(_event: Event): Promise<void> {
		this.mockRemove();
	}

	shouldSearch(event: Event): void {
		this.mockSearch.mockReturnValueOnce(event);
	}

	shouldSearchAll(events: Event[]): void {
		this.mockSearchAll.mockReturnValueOnce(events);
	}

	shouldMatch(criteria: Criteria, events: Event[]): void {
		this.mockMatching.mockReturnValueOnce(events);
	}

	shouldSave(): void {
		this.mockSave.mockReturnValueOnce(undefined);
	}

	shouldRemove(): void {
		this.mockRemove.mockReturnValueOnce(undefined);
	}
}
