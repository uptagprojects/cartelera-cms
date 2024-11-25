import { customFetch } from "../../lib/fetch";

export async function useGetCurrentWeek(): Promise<number> {
	const { week }: { week: number } = await customFetch(`/api/week`).then(res => res.json());

	return week;
}
