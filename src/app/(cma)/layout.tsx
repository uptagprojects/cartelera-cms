import "octagon-ui/dist/index.css";

import { PageFooter } from "../../components/footer/PageFooter";
import { Nav } from "../../components/nav/Nav";
import { Sidebar } from "./_components/Sidebar";

export default function CMALayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	if (!globalGETRateLimit()) {
		return "Too many requests";
	}
	const { session, user } = getCurrentSession();
	if (session === null) {
		return redirect("/login");
	}
	if (!user.emailVerified) {
		return redirect("/verify-email");
	}
	if (!user.registered2FA) {
		return redirect("/2fa/setup");
	}
	if (!session.twoFactorVerified) {
		return redirect("/2fa");
	}

	return (
		<>
			<Nav />
			<Sidebar />
			<main>{children}</main>
			<PageFooter />
		</>
	);
}
