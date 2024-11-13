import { IUC } from "../components/IUC";

export async function useGetUC(): Promise<IUC[]> {
	const base = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:3000"; // Using an environment variable

	const data = await fetch(`${base}/api/uc`).then(res => res.json());

	return data;
}
