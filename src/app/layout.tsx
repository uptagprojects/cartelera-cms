import "octagon-ui/dist/index.css";
import "./rootLayout.css";

// eslint-disable-next-line import/no-unresolved
import { Analytics } from "@vercel/analytics/react";
// eslint-disable-next-line import/no-unresolved
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es-ES">
            <body>
                {children}
                {process.env.NODE_ENV === "production" && <Analytics />}
                {process.env.NODE_ENV === "production" && <SpeedInsights />}
            </body>
        </html>
    );
}
