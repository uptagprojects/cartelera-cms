import "octagon-ui/dist/index.css";

import type { Metadata } from "next";

import { PageFooter } from "../components/footer/PageFooter";
import { Nav } from "../components/nav/Nav";

export const metadata: Metadata = {
	title: "Cartelera PNFi-UPTAG",
	description: "Programa Nacional de Formacion en Informatica"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es-ES">
			<body>
				<Nav />
				<main>{children}</main>
				<PageFooter />
			</body>
		</html>
	);
}
