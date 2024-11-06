import { Button } from "octagon-ui";
import { signIn } from "next-auth/react";

export function ProviderLoginForm() {
  
  return (
      <Button label="Iniciar sesion con Google" onClick={() => signIn()} />
  );
}