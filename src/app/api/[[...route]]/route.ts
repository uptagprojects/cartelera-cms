import api from "../../../api/handler";
import { handle } from "hono/vercel";

export const runtime = "edge";


export const GET = handle(api);
export const PUT = handle(api);