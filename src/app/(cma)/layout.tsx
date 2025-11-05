import "octagon-ui/dist/index.css";

import { redirect } from "next/navigation";

import { PageFooter } from "../../components/footer/PageFooter";
import { Nav } from "../../components/nav/Nav";
import { createClient } from "../../lib/supabase/server";
import { Sidebar } from "./_components/Sidebar";
import styles from "./ManageLayout.module.css";

export default async function CMALayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	//Get the user from Supabase
	const supabase = createClient();
	const {
		data: { user }
	} = await supabase.auth.getUser();

	//Protect the route. If no user, redirect to home.
	if (!user) {
		redirect("/");
	}

	return (
		<>
			<Nav user={user} />
			<Sidebar />
			<main className={styles.mainContainer}>{children}</main>
			<PageFooter />
		</>
	);
}
