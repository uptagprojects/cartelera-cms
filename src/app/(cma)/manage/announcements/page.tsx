import { Metadata } from "next";

import { AnnouncementHeader } from "./components";
import { AnnouncementList } from "./components/AnnouncementList";

export const metadata: Metadata = {
	title: "PNFi | Anuncios",
	description: "Programa Nacional de Formacion en Informatica"
};

export default function AnnouncementsPage() {
	return (
		<article>
			<AnnouncementHeader />
			<section>
				<p>
					Los anuncios son alertas que seran mostrados al resto de la pagina y en la TV.
				</p>
			</section>
			<section>
				<AnnouncementList />
			</section>
		</article>
	);
}
