import { Container } from "octagon-ui";
import { FC } from "react";

type HomeWeekNumberBlockProps = {
    week: number;
};

export const HomeWeekBlock: FC<HomeWeekNumberBlockProps> = ({ week = 0 }) => {
    return (
        <Container align="right" display style={{ height: "380dvh", position: "relative", left: "-25%" }}>
            <h3>{week > 0 ? `Estamos en la semana ${week}` : "Estamos de vacaciones 😎"}</h3>
        </Container>
    );
};
