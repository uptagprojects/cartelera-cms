"use client";
import { useFormState } from "react-dom";
import { TextInput } from "octagon-ui";
import { localAuthentication } from "../../app/actions/localAuthentication";
import { LoginFormSubmitButton } from "./LoginFormSubmitButton";



export const LoginForm: React.FC = () => {
    const [state, action] = useFormState(localAuthentication, undefined)
    return (
        <form action={action}>
            <TextInput
                type="email"
                label="Correo Electronico"
                errorMessage={state?.errors?.email?.join(", ")}
                name="email"
                />
            <TextInput
                type="password"
                label="Contraseña"
                name="password"
                errorMessage={state?.errors?.password?.join(", ")}
                />
            <LoginFormSubmitButton />
        </form>
    );
};

