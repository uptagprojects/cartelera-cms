import { customFetch } from "../../../../lib/fetch";
import { IRecentGuide } from "../components/IRecentGuide";

export async function useGetRecentGuides(max = 3): Promise<IRecentGuide[]> {
    const searchParams = new URLSearchParams();
    searchParams.append("orderBy", "publishDate");
    searchParams.append("orderType", "DESC");
    searchParams.append("pageSize", max.toString());

    const data = await customFetch(`/api/guides?${searchParams.toString()}`).then(res => res.json());

    return data;
}
