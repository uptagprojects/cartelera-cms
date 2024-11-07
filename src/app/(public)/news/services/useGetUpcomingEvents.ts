import qs from "qs";

import { IEvent } from "../components/IEvent";

export async function useGetUpcomingEvents(): Promise<IEvent[]> {
	const base = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:3000"; // Using an environment variable
	const query = qs.stringify({
		orderBy: "start_date",
		orderType: "ASC",
		filters: [
			{
				field: "start_date",
				operator: ">",
				value: encodeURIComponent(new Date().toISOString().split("T")[0])
			}
		]
	});

	const data = await fetch(`${base}/api/events?${query}`).then(res => res.json());

	return data;
}
