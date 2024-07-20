import { type Context } from "hono";

export function getAllCourses(c:Context) {
    c.status(200);
    return c.json([]);
}