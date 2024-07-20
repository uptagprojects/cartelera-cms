import { Hono } from "hono";
import { routeCourses } from "./courses/routeCourses";
const app = new Hono().basePath('/api');

routeCourses(app);

export default app;