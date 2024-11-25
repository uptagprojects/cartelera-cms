import { customFetch } from "../../../../../lib/fetch";

export async function useGetGuide(id: string) {
	const data = await customFetch(`/api/guides/${id}`).then(res => res.json());

	return data;
}
