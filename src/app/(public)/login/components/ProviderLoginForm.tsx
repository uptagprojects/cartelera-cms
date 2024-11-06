import { Button } from "octagon-ui";
import { signIn } from "next-auth/react";
import { providerMap } from "../../../_auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export function ProviderLoginForm({ callbackUrl }: {callbackUrl: string | undefined}) { 
  return (
      <>
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            try {
              await signIn(provider.id, {
                redirectTo: callbackUrl ?? "",
              })
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                return redirect(`/login/error?error=${error.type}`)
              }
 
              // Otherwise if a redirects happens Next.js can handle it
              // so you can just re-thrown the error and let Next.js handle it.
              // Docs:
              // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
              throw error
            }
          }}
        >
          <button type="submit">
            <span>Sign in with {provider.name}</span>
          </button>
        </form>
      ))}
      </>
  );
}