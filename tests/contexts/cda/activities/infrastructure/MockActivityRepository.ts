import { Activity } from "../../../../../src/contexts/cda/activities/domain/Activity";
import { ActivityId } from "../../../../../src/contexts/cda/activities/domain/ActivityId";
import { ActivityRepository } from "../../../../../src/contexts/cda/activities/domain/ActivityRepository";
import { Criteria } from "../../../../../src/contexts/shared/domain/criteria/Criteria";

export class MockActivityRepository implements ActivityRepository {
	private readonly mockSearch = jest.fn();
	private readonly mockMatching = jest.fn();
	private readonly mockSave = jest.fn();

	async save(activity: Activity): Promise<void> {
		this.mockSave();
	}

	async search(id: ActivityId): Promise<Activity | null> {
		return this.mockSearch() as Promise<Activity | null>;
	}

	async matching(criteria: Criteria): Promise<Activity[]> {
		return this.mockMatching() as Promise<Activity[]>;
	}

	shouldSearch(activity: Activity | null): void {
		this.mockSearch.mockReturnValueOnce(activity);
	}

	shouldMatch(criteria: Criteria, activities: Activity[]): void {
		this.mockMatching.mockReturnValueOnce(activities);
	}

	shouldSave(): void {
		this.mockSave.mockReturnValueOnce(undefined);
	}
}
