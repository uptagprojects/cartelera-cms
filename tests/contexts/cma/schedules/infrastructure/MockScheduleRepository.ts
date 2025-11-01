import { Schedule } from "../../../../../src/contexts/cma/schedules/domain/Schedule";
import { ScheduleId } from "../../../../../src/contexts/cma/schedules/domain/ScheduleId";
import { ScheduleRepository } from "../../../../../src/contexts/cma/schedules/domain/ScheduleRepository";
import { Criteria } from "../../../../../src/contexts/shared/domain/criteria/Criteria";

export class MockScheduleRepository implements ScheduleRepository {
	private readonly mockSearch = jest.fn();
	private readonly mockMatching = jest.fn();
	private readonly mockSave = jest.fn();

	async save(_schedule: Schedule): Promise<void> {
		this.mockSave();
	}

	async search(_id: ScheduleId): Promise<Schedule | null> {
		return this.mockSearch() as Promise<Schedule | null>;
	}

	async matching(_criteria: Criteria): Promise<Schedule[]> {
		return this.mockMatching() as Promise<Schedule[]>;
	}

	shouldSearch(schedule: Schedule): void {
		this.mockSearch.mockReturnValueOnce(schedule);
	}

	shouldMatch(criteria: Criteria, schedules: Schedule[]): void {
		this.mockMatching.mockReturnValueOnce(schedules);
	}

	shouldSave(): void {
		this.mockSave.mockReturnValueOnce(undefined);
	}
}
