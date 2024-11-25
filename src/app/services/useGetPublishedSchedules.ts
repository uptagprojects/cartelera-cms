import { customFetch } from "../../lib/fetch";
import { ISchedule } from "./ISchedule";

export async function useGetPublishedSchedules(): Promise<ISchedule[]> {
	const data = await customFetch(`/api/schedules`).then(res => res.json());

	return data;
}
