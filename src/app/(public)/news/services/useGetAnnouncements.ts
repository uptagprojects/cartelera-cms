import { customFetch } from "../../../../lib/fetch";
import { IAnnouncement } from "../components/IAnnouncement";

export async function useGetAnnouncements(): Promise<IAnnouncement[]> {
    const data = await customFetch(`/api/announcements`).then(res => res.json());

    return data;
}
