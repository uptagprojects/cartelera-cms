import { ISchedule } from "./ISchedule";

export async function useGetPublishedSchedules(): Promise<ISchedule[]> {
	const base = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:3000"; // Using an environment variable
	const data = await fetch(`${base}/api/schedules`).then(res => res.json());

	return data;
}
