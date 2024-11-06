"use client";
import { signIn, auth, providerMap } from "../../../_auth"
import { Container } from "octagon-ui";

import { ProviderLoginForm } from "./ProviderLoginForm";

export const Login = ({ callbackUrl }: {callbackUrl: string | undefined}) => (
	<Container align="center" display>
		<header>
			<h3>Iniciar Sesion</h3>
		</header>
		<ProviderLoginForm callbackUrl={callbackUrl} />
	</Container>
);
