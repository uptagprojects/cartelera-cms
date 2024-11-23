import NextAuth from "next-auth";
import nodemailer from "next-auth/providers/nodemailer";

import postgresAdapter from "../contexts/cma/auth/infrastructure/PostgresAuthAdapter";
import { OfficialUuidGenerator } from "../contexts/shared/infrastructure/OfficialUuidGenerator";
import { PostgresConnection } from "../contexts/shared/infrastructure/PostgresConnection";
import { authConfig } from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		...authConfig.providers,
		nodemailer({
			from: process.env.EMAIL_FROM,
			server: process.env.EMAIL_SERVER
		})
	],
	session: { strategy: "jwt" },
	adapter: postgresAdapter(new PostgresConnection(), new OfficialUuidGenerator())
});
