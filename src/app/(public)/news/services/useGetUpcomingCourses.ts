import qs from "qs";

import { ICourse } from "../components/ICourse";

export async function useGetUpcomingCourses(): Promise<ICourse[]> {
	const base = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:3000"; // Using an environment variable
	const query = qs.stringify({
		pageSize: 4
	});

	const data = await fetch(`${base}/api/courses?${query}`).then(res => res.json());

	return data;
}
