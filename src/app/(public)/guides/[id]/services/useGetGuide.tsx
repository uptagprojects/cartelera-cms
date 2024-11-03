export async function useGetGuide(id: string) {
	const base = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:3000"; // Using an environment variable
	const data = await fetch(`${base}/api/guides/${id}`).then(res => res.json());

	return data;
}
