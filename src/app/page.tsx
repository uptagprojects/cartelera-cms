import { Metadata } from "next";

import { PageFooter } from "../components/footer/PageFooter";
import { Home } from "../components/home/Home";
import { Nav } from "../components/nav/Nav";

export const metadata: Metadata = {
	title: "Cartelera PNFi-UPTAG",
	description: "Programa Nacional de Formacion en Informatica"
};

export default async function HomePage() {
	const { week } = await fetch("http://localhost:3000/api/week/").then(res => res.json());
	const { schedule } = await fetch("http://localhost:3000/api/schedules/current/").then(res =>
		res.json()
	);

	return (
		<>
			<Nav />
			<main>
				<Home week={week} schedule={schedule} />
			</main>
			<PageFooter />
		</>
	);
}
