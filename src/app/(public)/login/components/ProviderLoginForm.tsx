export function ProviderLoginForm({ callbackUrl }: { callbackUrl: string | undefined }) {
	return (
		<>
			<form method="post" action="/api/auth/signin/email">
				<button type="submit">
					<span>Sign in with Google</span>
				</button>
			</form>
		</>
	);
}
