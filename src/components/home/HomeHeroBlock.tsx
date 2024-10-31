import { Container } from "octagon-ui";
import { FC } from "react";

export const HomeHeroBlock: FC<> = ({ title, subtitle }) => {
	return (
		<Container center display>
			<h1>{title}</h1>
			<h2>{subtitle}</h2>
		</Container>
	);
};
