import { Hono } from "hono";
import { routeCourses } from "./courses/routeCourses";

export const routeCMA = () => {
    const app = new Hono();
    routeCourses(app);
    return app;
}