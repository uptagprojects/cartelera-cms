import { Metadata } from "next";

import { AnnouncementHeader, AnnouncementList } from "./components";

export const metadata: Metadata = {
	title: "PNFi | CMS | Anuncios",
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
