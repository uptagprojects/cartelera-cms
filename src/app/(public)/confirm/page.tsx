import { getIronSession, IronSessionData } from "iron-session";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { cookies } from "next/headers";

import { CredentialChallengeGenerator } from "../../../contexts/shared/infrastructure/CredentialChallengeGenerator";
import { sessionOptions } from "../../../contexts/shared/infrastructure/sessionOptions";
import { Confirm } from "./components/Confirm";

export const getServerSideProps = (async () => {
	const session = await getIronSession<IronSessionData>(await cookies(), sessionOptions);
	if (session.userId) {
		return {
			redirect: {
				destination: "/manage",
				permanent: false
			}
		};
	}
	const challenge = await new CredentialChallengeGenerator().generate();
	session.challenge = challenge;
	await session.save();

	return { props: { challenge } };
}) satisfies GetServerSideProps<{ challenge: string }>;

export default function ConfirmPage({
	challenge
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return <Confirm challenge={challenge} />;
}
