import { Hono } from "hono"
import { routeCourses } from "./courses/routeCourses";

export const routeCMS = () => {
    const app = new Hono();
    routeCourses(app);
    return app;
}