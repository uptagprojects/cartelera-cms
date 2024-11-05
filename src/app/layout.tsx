import "octagon-ui/dist/index.css";
import "./rootLayout.css";

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es-ES">
			<body>{children}</body>
		</html>
	);
}
