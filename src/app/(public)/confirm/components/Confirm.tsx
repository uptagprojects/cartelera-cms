"use client";
import { useRouter } from "next/navigation";
import { Alert, Button, Container, TextInput } from "octagon-ui";
import { FC, FormEvent, useEffect, useState } from "react";

export const Confirm: FC<{ challenge: string }> = ({ challenge }) => {
	const router = useRouter();
	const [error, setError] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

	if (!isAvailable) {
		return (
			<Container align="center" display>
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
			{error.length > 0 && (
					<Alert
						type="error"
						title={error}
						message="Intente mas tarde"
						onClose={() => setError("")}
					/>
				)}
			<h1>Confirm your account</h1>
			<p>Confirma tu registro.</p>
			<form onSubmit={() =>{}}>
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
