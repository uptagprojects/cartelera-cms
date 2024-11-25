import { Metadata } from "next";

import { News } from "./components/News";
import { useGetAnnouncements } from "./services/useGetAnnouncements";
import { useGetRecentGuides } from "./services/useGetRecentGuides";
import { useGetUC } from "./services/useGetUC";

export const metadata: Metadata = {
	title: "PNFi | Noticias",
	description: "Programa Nacional de Formacion en Informatica"
};

export default async function NewsPage() {
	const announcements = await useGetAnnouncements();
	const guides = await useGetRecentGuides(3);
	//const courses = await useGetUpcomingCourses();
	const uc = await useGetUC();

	return <News announcements={announcements} guides={guides} events={[]} courses={[]} ucs={uc} />;
}
