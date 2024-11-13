import "octagon-ui/dist/index.css";

import { PageFooter } from "../../components/footer/PageFooter";
import { Nav } from "../../components/nav/Nav";
import { auth } from "../auth";

export default async function PublicLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	return (
		<>
			<Nav session={Boolean(session)} />
			<main>{children}</main>
			<PageFooter />
		</>
	);
}
