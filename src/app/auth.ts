import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Nodemailer from "next-auth/providers/nodemailer";

import postgresAdapter from "../contexts/cma/auth/infrastructure/PostgresAuthAdapter";
import { OfficialUuidGenerator } from "../contexts/shared/infrastructure/OfficialUuidGenerator";
import { PostgresConnection } from "../contexts/shared/infrastructure/PostgresConnection";

export const { auth, handlers, signIn, signOut } = NextAuth({
	debug: process.env.NODE_ENV === "production",
	basePath: "/api/auth",
	providers: [
		Google({}),
		Nodemailer({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM
		})
	],
	adapter: postgresAdapter(new PostgresConnection(), new OfficialUuidGenerator()),
	callbacks: {}
});
