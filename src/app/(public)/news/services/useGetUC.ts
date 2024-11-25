import { customFetch } from "../../../../lib/fetch";
import { IUC } from "../components/IUC";

export async function useGetUC(): Promise<IUC[]> {
	const data = await customFetch(`/api/uc`).then(res => res.json());

	return data;
}
