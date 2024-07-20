import { handle } from "hono/vercel";

import api from "../../../api/handler";

export const runtime = "edge";

export const GET = handle(api);
export const PUT = handle(api);
