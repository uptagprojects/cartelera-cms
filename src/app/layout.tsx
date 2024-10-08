import "./globals.css";

import type { Metadata } from "next";

import { lexend, openSans } from "./fonts";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es-ES" className={[lexend.variable, openSans.variable].join(" ")}>
			<body>{children}</body>
		</html>
	);
}
