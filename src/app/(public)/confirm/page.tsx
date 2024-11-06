"use server";
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
