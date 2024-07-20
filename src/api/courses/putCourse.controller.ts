import { type Context } from "hono";

export function putCourse(c:Context) {
    c.status(202);
    return c.body(null);
}