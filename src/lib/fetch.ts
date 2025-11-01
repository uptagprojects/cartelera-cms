const baseAPI = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export const customFetch = (path: string, init?: RequestInit): Promise<Response> => fetch(baseAPI + path, init);
