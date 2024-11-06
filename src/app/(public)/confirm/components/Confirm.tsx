"use client";
import { create, supported } from "@github/webauthn-json";
import { useRouter } from "next/navigation";
import { Alert, Button, Container, TextInput } from "octagon-ui";
import { FC, FormEvent, useEffect, useState } from "react";

export const Confirm: FC<{ challenge: string }> = ({ challenge }) => {
	const router = useRouter();
	const [error, setError] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();

		// Create the credential
		const credential = await create({
			publicKey: {
				challenge,
				rp: {
					// Change these later
					name: "webauthn",
					id: "localhost"
				},
				user: {
					// Maybe change these later
					id: window.crypto.randomUUID(),
					name: email,
					displayName: username
				},
				// Don't change these later
				pubKeyCredParams: [{ alg: -7, type: "public-key" }],
				timeout: 60000,
				attestation: "direct",
				authenticatorSelection: {
					residentKey: "required",
					userVerification: "required"
				}
			}
		});
		// Call our registration endpoint with the new account details
		const result = await fetch("/api/auth/register", {
			method: "POST",
			body: JSON.stringify({ email, username, credential }),
			headers: {
				"Content-Type": "application/json"
			}
		});

		// Redirect to the admin page or render errors
		if (result.ok) {
			await router.push("/manage");
		} else {
			const { message } = await result.json();
			setError(message);
		}
	};

	useEffect(() => {
		const checkAvailability = async () => {
			const available =
				await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
			setIsAvailable(available && supported());
		};

		checkAvailability();
	}, []);

	if (!isAvailable) {
		return (
			<Container align="center" display>
				{error.length > 0 && (
					<Alert
						type="error"
						title={error}
						message="Intente mas tarde"
						onClose={() => setError("")}
					/>
				)}
				<h1>WebAuthn no está disponible</h1>
				<p>
					WebAuthn no está disponible en tu navegador. Por favor, intenta en otro
					navegador o dispositivo.
				</p>
			</Container>
		);
	}

	return (
		<Container align="center" display>
			<h1>Confirm your account</h1>
			<p>Confirma tu registro.</p>
			<form onSubmit={onSubmit}>
				<TextInput
					label="Nombre"
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<TextInput label="Email" onChange={e => setEmail(e.target.value)} />
				<Button variant="primary" type="submit" label="Confirmar" />
			</form>
		</Container>
	);
};
