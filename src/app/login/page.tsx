import { Container } from "octagon-ui";
import React from "react";

import { LoginForm } from "../../components/loginForm/LoginForm";

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
