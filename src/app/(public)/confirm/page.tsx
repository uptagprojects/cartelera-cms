"use server";
import { getIronSession, IronSessionData } from "iron-session";
import { cookies } from "next/headers";

import { CredentialChallengeGenerator } from "../../../contexts/shared/infrastructure/CredentialChallengeGenerator";
import { sessionOptions } from "../../../contexts/shared/infrastructure/sessionOptions";
import { Confirm } from "./components/Confirm";
import { getSessionChallenge } from "./actions/getSessionChallenge";

export default async function ConfirmPage() {
	const { userId, challenge } = await getSessionChallenge();

	if (userId) {
		return {
			redirect: {
				destination: "/manage",
				permanent: false
			}
		};
	}

	return <Confirm challenge={challenge} />;
}
