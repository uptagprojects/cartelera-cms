import { Container } from "octagon-ui";
import { FC, useMemo } from "react";

type HomeWeekNumberBlockProps = {
	week: number;
};

export const HomeWeekBlock: FC<HomeWeekNumberBlockProps> = ({ week = 0 }) => {
	return (
		<Container align="right">
			<h3>{week > 0 ? "Estamos en la semana " : "Estamos de vacaciones 😎"}</h3>
			{week && <span>{week}</span>}
		</Container>
	);
};
