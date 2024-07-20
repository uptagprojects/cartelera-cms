import { Hono } from "hono";
import { routeCMS } from "./cms/routeCMS";
import { routeBackoffice } from "./backoffice/routeBackoffice";
const app = new Hono().basePath('/api');

app.route("/manage", routeBackoffice());
app.route("/", routeCMS());

export default app;