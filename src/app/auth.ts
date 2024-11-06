import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
	return {
		redirectTo: "/manage",
		providers: [
			Google({
				clientId: process.env.AUTH_GOOGLE_ID ?? "google-client-id",
				clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "google-client-secret"
			})
		]
	};
});
