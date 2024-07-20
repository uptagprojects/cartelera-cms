import { Hono } from "hono";
import { routeCMS } from "./cda/routeCMS";
import { routeBackoffice } from "./cma/routeBackoffice";
const app = new Hono().basePath('/api');

app.route("/manage", routeBackoffice());
app.route("/", routeCMS());

export default app;