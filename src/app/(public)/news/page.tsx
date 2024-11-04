import { Metadata } from "next";
import { News } from "./components/News";
import { useGetAnnouncements } from "./services/useGetAnnouncements";
import { useGetRecentGuides } from "./services/useGetRecentGuides";
import { useGetUpcomingEvents } from "./services/useGetUpcomingEvents";
import { useGetUpcomingCourses } from "./services/useGetUpcomingCourses";

export const metadata: Metadata = {
	title: "PNFi | Noticias",
	description: "Programa Nacional de Formacion en Informatica"
};

export default async function NewsPage() {
    const announcements = await useGetAnnouncements();
    const guides = await useGetRecentGuides(3);
    const events = await useGetUpcomingEvents();
    const courses = await useGetUpcomingCourses();
    return (
        <News announcements={announcements} guides={guides} events={events} courses={courses}  />
    );
}