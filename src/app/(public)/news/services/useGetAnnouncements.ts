import { IAnnouncement } from "../components/IAnnouncement";

export async function useGetAnnouncements(): Promise<IAnnouncement[]> {
    const base = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:3000"; // Using an environment variable
	const data = await fetch(`${base}/api/announcements`).then(res => res.json());

	return data;
}