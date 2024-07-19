import { NextRequest } from "next/server";

export function GET(request: NextRequest): Response {
    console.warn(typeof request);
    console.warn(request.nextUrl.searchParams.get('id'));
    return Response.json({ "id": "" }, {
        status: 200
    });
}

export async function PUT(request: Request): Promise<Response> {
    const data = await request.json();
    return new Response(null, {
        status: 201
    })
}