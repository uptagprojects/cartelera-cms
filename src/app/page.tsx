import { Metadata } from "next";

import { PageFooter } from "../components/footer/PageFooter";
import { Nav } from "../components/nav/Nav";
import { createClient } from "../lib/supabase/server";
import { Home } from "./components/Home";
import { ISchedule } from "./services/ISchedule";

export const metadata: Metadata = {
	title: "Cartelera PNFi-UPTAG",
	description: "Programa Nacional de Formacion en Informatica"
};

export default async function HomePage() {
	const week = 0;
	const schedules = [] as ISchedule[];

	const supabase = createClient();
	const {
		data: { user }
	} = await supabase.auth.getUser();

	return (
		<>
			<Nav user={user} />
			<main>
				<Home week={week} schedule={schedules[0]?.id} />
			</main>
			<PageFooter />
		</>
	);
}
