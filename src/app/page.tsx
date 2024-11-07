import { Metadata } from "next";

import { PageFooter } from "../components/footer/PageFooter";
import { Nav } from "../components/nav/Nav";
import { Home } from "./components/Home";
import { ISchedule } from "./services/ISchedule";

export const metadata: Metadata = {
	title: "Cartelera PNFi-UPTAG",
	description: "Programa Nacional de Formacion en Informatica"
};

export default async function HomePage() {
	"use server";
	const week = 0;
	const schedules = [] as ISchedule[];
	//const week = await useGetCurrentWeek();
	//const schedules = await useGetPublishedSchedules();

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
