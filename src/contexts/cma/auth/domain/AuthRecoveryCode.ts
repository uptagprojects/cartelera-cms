export interface AuthRecoveryCode {
	expires: Date;
	identifier: string;
	token: string;
}
