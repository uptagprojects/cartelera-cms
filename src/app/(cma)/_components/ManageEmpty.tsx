"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { Container } from "octagon-ui";

interface ManageEmptyProps {
    title?: string;
    message: string;
    url: string;
}

export const ManageEmpty = ({ title = "No encontramos nada", message, url }: ManageEmptyProps) => (
    <Container align="center">
        <DotLottieReact src="/animations/blinking.lottie" loop autoplay />
        <h4>{title}</h4>
        <p>
            {message} <Link href={url}>click aqui</Link>.
        </p>
    </Container>
);
