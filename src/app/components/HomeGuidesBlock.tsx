import { Button, Container } from "octagon-ui";
import { FC } from "react";

export const HomeGuidesBlock: FC = () => (
	<Container align="left" display>
		<h3>Sigamos aprendiendo</h3>
		<Button icon="Book" variant="primary" label="buscar cursos" />
	</Container>
);
