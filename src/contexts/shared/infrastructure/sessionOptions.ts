import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
	password: process.env.SECRET_COOKIE_PASSWORD ?? "secret-password",
	cookieName: "webauthn",
	cookieOptions: {
		secure: process.env.NODE_ENV === "production"
	}
};

// Define the cookie structure globally for TypeScript
declare module "iron-session" {
	interface IronSessionData {
		userId?: string;
		challenge?: string;
	}
}
