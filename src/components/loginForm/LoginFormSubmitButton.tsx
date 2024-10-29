import { Button } from "octagon-ui";
import { useFormStatus } from "react-dom";

export const LoginFormSubmitButton = () => {
    const { pending } = useFormStatus()
    return (
        <Button disabled={pending} type="submit" variant="primary" label="Iniciar Sesion" />
    );
}