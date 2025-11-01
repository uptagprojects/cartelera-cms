import { Metadata } from "next";

import { OfficialMarkdownRemover } from "../../../contexts/shared/infrastructure/OfficialMarkdownRemover";
import { TV } from "./components/TV";
import { useGetActivities } from "./services/useGetActivities";

export const metadata: Metadata = {
    title: "PNFi | TV",
    description: "Programa Nacional de Formacion en Informatica"
};

const mdRemover = new OfficialMarkdownRemover();

export default async function TVPage() {
    const activities = await useGetActivities();

    await Promise.all(
        activities.map(async (activity, i) => {
            activities[i].context = await mdRemover.remove(activity.context, 180);
        })
    );

    return <TV activities={activities} />;
}
