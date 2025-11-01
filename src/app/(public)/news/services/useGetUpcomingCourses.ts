import qs from "qs";

import { customFetch } from "../../../../lib/fetch";
import { ICourse } from "../components/ICourse";

export async function useGetUpcomingCourses(): Promise<ICourse[]> {
    const query = qs.stringify({
        pageSize: 4
    });

    const data = await customFetch(`/api/courses?${query}`).then(res => res.json());

    return data;
}
