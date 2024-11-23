import { IManageUC } from "./actions";

export async function useServerGetManageUCs(): Promise<IManageUC[]> {
	const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

	const data = await fetch(`${base}/api/manage/uc`).then(res => res.json());

	return data;
}
