import { type CookieOptions, createServerClient } from "@supabase/ssr"; // No 'Cookies' import
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest): Promise<NextResponse> {
	let response = NextResponse.next({
		request: {
			headers: request.headers
		}
	});

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		console.error("Missing Supabase environment variables in middleware");

		return response;
	}

	// Define cookie handlers
	const cookieHandlers = {
		get(name: string): string | undefined {
			return request.cookies.get(name)?.value;
		},
		set(name: string, value: string, options: CookieOptions): void {
			request.cookies.set({ name, value, ...options });
			response = NextResponse.next({
				request: {
					headers: request.headers
				}
			});
			response.cookies.set({ name, value, ...options });
		},
		remove(name: string, options: CookieOptions): void {
			request.cookies.set({ name, value: "", ...options });
			response = NextResponse.next({
				request: {
					headers: request.headers
				}
			});
			response.cookies.set({ name, value: "", ...options });
		}
	};

	const supabase = createServerClient(
		supabaseUrl,
		supabaseAnonKey,
		{ cookies: cookieHandlers } // Pass the handlers
	);

	await supabase.auth.getSession();

	return response;
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
