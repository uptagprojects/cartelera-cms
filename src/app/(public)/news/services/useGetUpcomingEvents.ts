import qs from "qs";

import { customFetch } from "../../../../lib/fetch";
import { IEvent } from "../components/IEvent";

export async function useGetUpcomingEvents(): Promise<IEvent[]> {
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

    const data = await customFetch(`/api/events?${query}`).then(res => res.json());

    return data;
}
