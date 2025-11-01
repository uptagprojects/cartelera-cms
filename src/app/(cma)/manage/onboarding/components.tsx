"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Container } from "octagon-ui";
import { useCallback, useEffect, useState } from "react";

interface Step {
    text: string;
    animation: string;
}

const steps: Step[] = [
    {
        text: "Publica guías que pueden leer tus estudiantes",
        animation: "/animations/animate_study.lottie"
    },
    {
        text: "Publica eventos y cursos",
        animation: "/animations/animate_events.lottie"
    }
];

export function Onboarding() {
    const [step, setStep] = useState<number>(0);
    const handleStepChange = useCallback(() => {
        setStep(prevStep => (prevStep + 1) % steps.length);
    }, []);

    useEffect(() => {
        const interval = setInterval(handleStepChange, 5000);

        return () => clearInterval(interval);
    }, [handleStepChange]);

    return (
        <Container align="center" display>
            <DotLottieReact src={steps[step].animation} loop autoplay />
            <h3>{steps[step].text}</h3>
        </Container>
    );
}
