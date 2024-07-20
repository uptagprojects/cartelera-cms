import { Hono } from "hono";
import { routeCMA } from "./cma/routeCMA";
import { routeCDA } from "./cda/routeCDA";
const app = new Hono().basePath('/api');

app.route("/manage", routeCMA());
app.route("/", routeCDA());

export default app;