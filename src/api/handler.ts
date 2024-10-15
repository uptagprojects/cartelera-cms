import { Hono } from "hono";

import { routeCDA } from "./cda/routeCDA";
import { routeCMA } from "./cma/routeCMA";

const app = new Hono().basePath("/api");

app.route("/manage", routeCMA());
app.route("/", routeCDA());

export default app;
