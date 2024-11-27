"use client";
import { Container, TextInput } from "octagon-ui";

export const GuideList = () => {
	return (
		<div>
			<Container align="center">
				<TextInput label="buscar" placeholder="" />
			</Container>
			<Container>
				<p>Guias</p>
			</Container>
		</div>
	);
};
