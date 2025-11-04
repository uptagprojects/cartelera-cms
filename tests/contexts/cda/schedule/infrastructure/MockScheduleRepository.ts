import { Schedule } from "../../../../../src/contexts/cda/schedule/domain/Schedule";
import { ScheduleId } from "../../../../../src/contexts/cda/schedule/domain/ScheduleId";
import { ScheduleRepository } from "../../../../../src/contexts/cda/schedule/domain/ScheduleRepository";
import { Criteria } from "../../../../../src/contexts/shared/domain/criteria/Criteria";

export class MockScheduleRepository implements ScheduleRepository {
	private readonly mockSearch = jest.fn();
	private readonly mockSearchAll = jest.fn();
	private readonly mockMatching = jest.fn();

	async search(_id: ScheduleId): Promise<Schedule | null> {
		return this.mockSearch() as Promise<Schedule | null>;
	}

	async searchAll(): Promise<Schedule[]> {
		return this.mockSearchAll() as Promise<Schedule[]>;
	}

	async matching(_criteria: Criteria): Promise<Schedule[]> {
		return this.mockMatching() as Promise<Schedule[]>;
	}

	shouldSearch(schedule: Schedule | null): void {
		this.mockSearch.mockReturnValueOnce(schedule);
	}

	shouldSearchAll(schedules: Schedule[]): void {
		this.mockSearchAll.mockReturnValueOnce(schedules);
	}

	shouldMatch(criteria: Criteria, schedules: Schedule[]): void {
		this.mockMatching.mockReturnValueOnce(schedules);
	}
}
