import { Metadata } from "next";

import { TV } from "./components/TV";
import { useGetActivities } from "./services/useGetActivities";
import { OfficialMarkdownRemover } from "../../../contexts/shared/infrastructure/OfficialMarkdownRemover";

export const metadata: Metadata = {
	title: "PNFi | TV",
	description: "Programa Nacional de Formacion en Informatica"
};

const mdRemover = new OfficialMarkdownRemover();

export default async function TVPage() {
	let activities = await useGetActivities();

	activities.map(async (activity, i) => {
		activities[i].context = await mdRemover.remove(activity.context, 180);
	});

	return <TV activities={activities} />;
}
