import { ExternalLinkIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { useServerGetManageUCs } from "../uc/serverActions";
import { GuideHeader, GuideList } from "./components";

export const metadata: Metadata = {
    title: "PNFi | CMS | Guías",
    description: "Programa Nacional de Formacion en Informatica"
};

export default async function GuidesPage() {
    const ucs = await useServerGetManageUCs();
    const ucMap = Object.fromEntries(ucs.map(uc => [uc.id, uc]));

    return (
        <>
            <GuideHeader />
            <section>
                <p>
                    Publica información creando guías usando{" "}
                    <Link target="_blank" href="https://tutorialmarkdown.com/guia">
                        Markdown
                        <ExternalLinkIcon />
                    </Link>
                </p>
            </section>
            <section>
                <GuideList ucs={ucMap} />
            </section>
        </>
    );
}
