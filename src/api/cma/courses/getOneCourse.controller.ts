import { type Context } from "hono";

export function getOneCourse(c:Context) {
    const courseId = c.req.param('courseId');
    c.status(200);
    return c.json({
        id: courseId
    });
}