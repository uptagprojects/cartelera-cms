import "octagon-ui/dist/index.css";

import { PageFooter } from "../../components/footer/PageFooter";
import { Nav } from "../../components/nav/Nav";
import { createClient } from "../../lib/supabase/server";

export default async function PublicLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Get the user from Supabase
	const supabase = createClient();
	const {
		data: { user }
	} = await supabase.auth.getUser();

	return (
		<>
			<Nav user={user} />
			<main>{children}</main>
			<PageFooter />
		</>
	);
}
