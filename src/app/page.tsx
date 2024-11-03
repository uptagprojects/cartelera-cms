import { Metadata } from "next";

import { PageFooter } from "../components/footer/PageFooter";
import { Nav } from "../components/nav/Nav";
import { Home } from "./components/Home";
import { useGetCurrentWeek } from "./services/useGetCurrentWeek";
import { useGetPublishedSchedules } from "./services/useGetPublishedSchedules";

export const metadata: Metadata = {
	title: "Cartelera PNFi-UPTAG",
	description: "Programa Nacional de Formacion en Informatica"
};

export default async function HomePage() {
	const week = await useGetCurrentWeek();
	const schedules = await useGetPublishedSchedules();

	return (
		<>
			<Nav />
			<main>
				<Home week={week} schedule={schedules[0]?.id} />
			</main>
			<PageFooter />
		</>
	);
}
