import "./layout.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cartelera PNFi-UPTAG",
    description: "Programa Nacional de Formacion en Informatica"
};

export default function TVLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="tv-layout">
            <div role="progressbar" className="indicator">
                <div className="indicator-value" />
            </div>
            {children}
        </div>
    );
}
