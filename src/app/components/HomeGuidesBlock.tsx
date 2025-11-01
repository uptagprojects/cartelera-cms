import Link from "next/link";
import { Button, Container } from "octagon-ui";
import { FC } from "react";

export const HomeGuidesBlock: FC = () => (
    <Container align="left" display style={{ height: "100%", position: "relative", right: "-25%", top: "-25%" }}>
        <h3>Sigamos aprendiendo</h3>
        <Link href="/guides">
            <Button icon="Book" variant="primary" label="buscar guías" />
        </Link>
    </Container>
);
