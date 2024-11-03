import { redirect } from "next/navigation";
import { z } from "zod";

export const LocalAuthenticationFormSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email." }).trim(),
	password: z.string()
});

export type LocalAuthenticationFormState =
	| {
			errors?: {
				email?: string[];
				password?: string[];
			};
			message?: string;
	  }
	| undefined;

export async function localAuthentication(
	_state: LocalAuthenticationFormState,
	formData: FormData
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
	const validatedFields = LocalAuthenticationFormSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password")
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors
		};
	}

	await fetch("http://127.0.0.1:3000/api/auth/local", {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST",
		body: JSON.stringify({
			email: validatedFields.data.email,
			password: validatedFields.data.password
		})
	});

	redirect("/");
}
