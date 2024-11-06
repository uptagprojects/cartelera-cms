import { IronSessionData, getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "../../../../contexts/shared/infrastructure/sessionOptions";
import { CredentialChallengeGenerator } from "../../../../contexts/shared/infrastructure/CredentialChallengeGenerator";

export const getSessionChallenge = async (): Promise<{ userId?: string, challenge: string }> => {
      const session = await getIronSession<IronSessionData>(await cookies(), sessionOptions);
		
		const challenge = await new CredentialChallengeGenerator().generate();
		//session.challenge = challenge;
		//await session.save();
		return {
			userId: session.userId, 
			challenge
		};
};