import qs from "qs";

import { ICourse } from "../components/ICourse";
import { customFetch } from "../../../../lib/fetch";

export async function useGetUpcomingCourses(): Promise<ICourse[]> {
	const query = qs.stringify({
		pageSize: 4
	});

	const data = await customFetch(`/api/courses?${query}`).then(res => res.json());

	return data;
}
