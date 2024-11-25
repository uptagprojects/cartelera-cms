import { customFetch } from "../../../../lib/fetch";
import { IManageUC } from "./actions";

export async function useServerGetManageUCs(): Promise<IManageUC[]> {
	const data = await customFetch(`/api/manage/uc`).then(res => res.json());

	return data;
}
