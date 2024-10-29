import { z } from "zod";

export const LocalAuthenticationFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z.string()
});

export type LocalAuthenticationFormState = {
    errors?: {
        email?: string[]
        password?: string[]
    }
    message?: string
} | undefined;

export async function localAuthentication(state: LocalAuthenticationFormState, formData: FormData) {
    const validatedFields = LocalAuthenticationFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    fetch("/api/manage/auth/local", {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            email: validatedFields.data.email,
            password: validatedFields.data.password
        })
    });
}