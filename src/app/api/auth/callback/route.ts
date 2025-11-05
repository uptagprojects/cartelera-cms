import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? "/";

	if (code) {
		const response = NextResponse.redirect(`${origin}${next}`);

		// Get env variables
		const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
		const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

		if (!supabaseUrl || !supabaseAnonKey) {
			throw new Error("Missing Supabase environment variables");
		}

		// Create the cookie handlers
		const cookieHandlers = {
			get(name: string): string | undefined {
				return request.cookies.get(name)?.value;
			},
			set(name: string, value: string, options: CookieOptions): void {
				response.cookies.set({ name, value, ...options });
			},
			remove(name: string, options: CookieOptions): void {
				response.cookies.set({ name, value: "", ...options });
			}
		};

		// Create a one-time client for this exchange
		const supabase = createServerClient(
			supabaseUrl,
			supabaseAnonKey,
			{ cookies: cookieHandlers } // Pass our new, working handlers
		);

		// Perform the code exchange
		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			return response;
		}
	}

	// If no code, or if error, redirect to our error page
	return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
