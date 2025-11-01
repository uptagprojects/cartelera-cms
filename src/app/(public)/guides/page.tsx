import { Metadata } from "next";

import { GuideList } from "./components";

export const metadata: Metadata = {
    title: "PNFi | Guías",
    description: "Programa Nacional de Formacion en Informatica"
};

export default async function PageGuides() {
    return <GuideList />;
}
