import { type Context } from "hono";

export function getAllCourses(c: Context): Response {
	c.status(200);

	return c.json([]);
}
