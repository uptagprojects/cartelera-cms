import "octagon-ui/dist/index.css";

import { PageFooter } from "../../components/footer/PageFooter";
import { Nav } from "../../components/nav/Nav";
import { Sidebar } from "./_components/Sidebar";

export default function CMALayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Nav />
			<Sidebar />
			<main>{children}</main>
			<PageFooter />
		</>
	);
}
