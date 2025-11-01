import { Metadata } from "next";

import { UCHeader, UCList } from "./components";

export const metadata: Metadata = {
    title: "PNFi | CMS | Unidades Curriculares",
    description: "Programa Nacional de Formacion en Informatica"
};

export default function UCPage() {
    return (
        <>
            <UCHeader />
            <section>
                <p>Las unidades curriculares son todas las materias que se dictan en el PNFi.</p>
            </section>
            <section>
                <UCList />
            </section>
        </>
    );
}
