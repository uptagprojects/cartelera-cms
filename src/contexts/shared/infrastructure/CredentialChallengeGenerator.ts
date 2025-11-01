// challenge from https://ianmitchell.dev/blog/nextjs-and-webauthn
import crypto from "node:crypto";

export class CredentialChallengeGenerator {
    async generate(): Promise<string> {
        return this.clean(crypto.randomBytes(40).toString("base64"));
    }

    private clean(raw: string): string {
        return raw.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    }
}
