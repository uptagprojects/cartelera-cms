import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export function createClient(): SupabaseClient {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error("Missing Supabase environment variables. Check .env.local");
	}

	const cookieHandlers = {
		async get(name: string): Promise<string | undefined> {
			const cookieStore = await cookies();

			return cookieStore.get(name)?.value;
		},
		async set(name: string, value: string, options: CookieOptions): Promise<void> {
			try {
				const cookieStore = await cookies();
				cookieStore.set({ name, value, ...options });
			} catch (error) {
				// TO DO : catch error
			}
		},
		async remove(name: string, options: CookieOptions): Promise<void> {
			try {
				const cookieStore = await cookies();
				cookieStore.set({ name, value: "", ...options });
			} catch (error) {
				// TO DO : catch error
			}
		}
	};

	return createServerClient(
		supabaseUrl,
		supabaseAnonKey,
		{ cookies: cookieHandlers } // Pass the async handlers
	);
}
