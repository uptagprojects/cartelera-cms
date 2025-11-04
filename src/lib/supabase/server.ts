import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// Make the createClient function ASYNC
export async function createClient(): Promise<SupabaseClient> {
	// Await cookies() ONCE at the top
	const cookieStore = await cookies();

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error("Missing Supabase environment variables. Check .env.local");
	}

	// The cookie handlers are now sync, operating on the awaited cookieStore
	const cookieHandlers = {
		get(name: string): string | undefined {
			return cookieStore.get(name)?.value;
		},
		set(name: string, value: string, options: CookieOptions): void {
			try {
				cookieStore.set({ name, value, ...options });
			} catch (error) {
				// The `set` method was called from a Server Component or Server Action.
				// This can be ignored if you're not in a Server Action.
			}
		},
		remove(name: string, options: CookieOptions): void {
			try {
				cookieStore.set({ name, value: "", ...options });
			} catch (error) {
				// The `remove` method was called from a Server Component or Server Action.
				// This can be ignored if you're not in a Server Action.
			}
		}
	};

	return createServerClient(
		supabaseUrl,
		supabaseAnonKey,
		{ cookies: cookieHandlers } // This now matches the expected type
	);
}
