// eslint-disable-next-line camelcase
import { Lexend, Open_Sans } from "next/font/google";

export const lexend = Lexend({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
	variable: "--font-lexend"
});

export const openSans = Open_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
	variable: "--font-open-sans"
});
