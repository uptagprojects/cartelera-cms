import { Metadata } from "next";

import { GuideList } from "./components";

export const metadata: Metadata = {
	title: "PNFi | Guias",
	description: "Programa Nacional de Formacion en Informatica"
};

export default async function PageGuides() {
	return <GuideList />;
}
