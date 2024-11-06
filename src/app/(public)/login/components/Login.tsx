"use client";

import { Button, Container } from "octagon-ui";

import { LoginForm } from "./LoginForm";
import { ProviderLoginForm } from "./ProviderLoginForm";

export const Login = () => (
	<Container align="center" display>
		<header>
			<h3>Iniciar Sesion</h3>
		</header>
		<ProviderLoginForm />
		<LoginForm />
	</Container>
);
