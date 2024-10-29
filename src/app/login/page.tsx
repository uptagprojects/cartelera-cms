import React from "react";
import { Container } from "octagon-ui";
import { LoginForm } from "../../components/loginForm/LoginForm";

const guide = {
	title: "Guia 1",
	content:
		"## markdown content\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc",
	date: "2021-08-01",
	uc: "ingles"
};

const GuidePage: React.FC = () => {
	return (
		<Container center>
			<header>
				<h3>Iniciar Sesion</h3>
			</header>
            <LoginForm />
		</Container>
	);
};

export default GuidePage;
