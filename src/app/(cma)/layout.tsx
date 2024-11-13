import "octagon-ui/dist/index.css";

import { redirect } from "next/navigation";

import { PageFooter } from "../../components/footer/PageFooter";
import { Nav } from "../../components/nav/Nav";
import { auth } from "../auth";
import { Sidebar } from "./_components/Sidebar";
import styles from "./ManageLayout.module.css";

export default async function CMALayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	if (!session) {
		redirect("/");
	}

	return (
		<>
			<Nav session={Boolean(session)} />
			<Sidebar />
			<main className={styles.mainContainer}>{children}</main>
			<PageFooter />
		</>
	);
}
