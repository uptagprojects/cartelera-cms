import "octagon-ui/dist/index.css";

import { PageFooter } from "../../components/footer/PageFooter";
import { Nav } from "../../components/nav/Nav";

export default function cmaLayout({
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
