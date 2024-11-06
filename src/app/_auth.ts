import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";

//import { OfficialUuidGenerator } from "../contexts/shared/infrastructure/OfficialUuidGenerator";
//import { PostgresConnection } from "../contexts/shared/infrastructure/PostgresConnection";
//import postgresAdapter from "../contexts/cma/auth/infrastructure/PostgresAuthAdapter";

 
const providers: Provider[] = [
  Google
]

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
	return {
		debug: process.env.NODE_ENV === "development",
		providers,
		pages: {
			signIn: "/login",
		},
		basePath: "/api/auth",
		secret: process.env.AUTH_SECRET,
		//adapter: postgresAdapter(new PostgresConnection(), new OfficialUuidGenerator())
	};
});
