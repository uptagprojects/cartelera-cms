import { type Context } from "hono";

export function putCourse(c: Context): Response {
	c.status(202);

	return c.body(null);
}
