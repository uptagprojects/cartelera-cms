import { type Context } from "hono";

export function getAvailableCourses(c:Context) {
    c.status(200);
    return c.json([]);
}