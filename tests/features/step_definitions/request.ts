import { findRouteHandler } from "./findRouteHandler";

export async function request(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    body?: string
): Promise<Response> {
    const handler = findRouteHandler(path);
    if (!handler) {
        return new Response(null, { status: 404 });
    }

    if (!handler.has(method)) {
        return new Response(null, { status: 405 });
    }

    const data = body ? ({
        json: JSON.parse(body),
    }) : undefined;

    return handler[method](data);
}