import { customFetch } from "../../../../lib/fetch";
import { IActivity } from "./IActivity";

export async function useGetActivities(): Promise<IActivity[]> {
	const data = await customFetch(`/api/activities`, {
		cache: "no-cache"
	}).then(res => res.json());

	return data;
}
