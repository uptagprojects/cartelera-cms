"use client";

import { Container } from "octagon-ui";

import { LoginForm } from "./LoginForm";

export const Login = () => (
	<Container align="center" display>
		<header>
			<h3>Iniciar Sesion</h3>
		</header>
		<LoginForm />
	</Container>
);
