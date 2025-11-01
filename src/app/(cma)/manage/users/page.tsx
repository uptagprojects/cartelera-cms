import { Metadata } from "next";

import { UserHeader, UserList } from "./components";

export const metadata: Metadata = {
    title: "PNFi | CMS | Anuncios",
    description: "Programa Nacional de Formacion en Informatica"
};

export default function UsersPage() {
    return (
        <article>
            <UserHeader />
            <section>
                <p>Los usuarios se activaran al confirmar su correo electrónico iniciando sesión.</p>
            </section>
            <section>
                <UserList />
            </section>
        </article>
    );
}
