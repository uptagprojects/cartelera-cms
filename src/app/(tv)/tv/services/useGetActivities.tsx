import { IActivity } from "./IActivity";

export async function useGetActivities(): Promise<IActivity[]> {
	const base = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:3000"; // Using an environment variable
	const data = await fetch(`${base}/api/activities`, {
		cache: "no-cache"
	}).then(res => res.json());

	return data;
}
