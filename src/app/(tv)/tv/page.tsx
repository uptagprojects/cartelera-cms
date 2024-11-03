import { Metadata } from "next";

import { TV } from "./components/TV";
import { useGetActivities } from "./services/useGetActivities";

export const metadata: Metadata = {
	title: "PNFi | TV",
	description: "Programa Nacional de Formacion en Informatica"
};

export default async function TVPage() {
	const activities = await useGetActivities();

	return <TV activities={activities} />;
}
