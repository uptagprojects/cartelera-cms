import { IRecentGuide } from "../components/IRecentGuide";

export async function useGetRecentGuides(max = 3): Promise<IRecentGuide[]> {
	const base = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:3000"; // Using an environment variable
	const searchParams = new URLSearchParams();
	searchParams.append("orderBy", "publishDate");
	searchParams.append("orderType", "DESC");
	searchParams.append("pageSize", max.toString());

	const data = await fetch(`${base}/api/guides?${searchParams.toString()}`).then(res =>
		res.json()
	);

	return data;
}
