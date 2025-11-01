import Link from "next/link";
import { Button, Container } from "octagon-ui";
import { FC } from "react";

export const HomeHeadingBlock: FC = () => {
    return (
        <Container align="center" display>
            <h2>Somos tecnologia</h2>
            <Link href="/news">
                <Button variant="primary" label="revisa la cartelera" />
            </Link>
        </Container>
    );
};
