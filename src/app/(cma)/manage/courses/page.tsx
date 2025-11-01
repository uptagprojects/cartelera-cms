import { Metadata } from "next";

import { CourseHeader } from "./components";

export const metadata: Metadata = {
    title: "PNFi | Courses",
    description: "Programa Nacional de Formacion en Informatica"
};

export default function AnnouncementsPage() {
    return (
        <article>
            <CourseHeader />
            <section>
                <p>Los cursos generalmente son realizados inter-trimestre.</p>
            </section>
        </article>
    );
}
