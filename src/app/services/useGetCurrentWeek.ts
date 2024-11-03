export async function useGetCurrentWeek(): Promise<number> {
	const base = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:3000"; // Using an environment variable
	const { week }: { week: number } = await fetch(`${base}/api/week`).then(res => res.json());

	return week;
}
