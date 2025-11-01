import { Course } from "../../../../../src/contexts/cma/courses/domain/Course";
import { CourseId } from "../../../../../src/contexts/cma/courses/domain/CourseId";
import { CourseRepository } from "../../../../../src/contexts/cma/courses/domain/CourseRepository";
import { Criteria } from "../../../../../src/contexts/shared/domain/criteria/Criteria";

export class MockCourseRepository implements CourseRepository {
	private readonly mockSearch = jest.fn();
	private readonly mockSearchAll = jest.fn();
	private readonly mockMatching = jest.fn();
	private readonly mockSave = jest.fn();
	private readonly mockRemove = jest.fn();

	async save(_course: Course): Promise<void> {
		this.mockSave();
	}

	async search(_id: CourseId): Promise<Course | null> {
		return this.mockSearch() as Promise<Course | null>;
	}

	async searchAll(): Promise<Course[]> {
		return this.mockSearchAll() as Promise<Course[]>;
	}

	async matching(_criteria: Criteria): Promise<Course[]> {
		return this.mockMatching() as Promise<Course[]>;
	}

	async remove(_course: Course): Promise<void> {
		this.mockRemove();
	}

	shouldSearch(course: Course): void {
		this.mockSearch.mockReturnValueOnce(course);
	}

	shouldSearchAll(courses: Course[]): void {
		this.mockSearchAll.mockReturnValueOnce(courses);
	}

	shouldMatch(criteria: Criteria, courses: Course[]): void {
		this.mockMatching.mockReturnValueOnce(courses);
	}

	shouldSave(): void {
		this.mockSave.mockReturnValueOnce(undefined);
	}

	shouldRemove(): void {
		this.mockRemove.mockReturnValueOnce(undefined);
	}
}
