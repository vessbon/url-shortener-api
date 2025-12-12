import { Hono } from "hono";
import { logger } from "hono/logger";
import env from "./env";
import indexRouter from "./routes/index.route";
import urlRouter from "./routes/urls.routes";

const app = new Hono();
app.use(logger());

app.route("/", indexRouter);
app.route("/urls", urlRouter);

export default {
  PORT: env.PORT,
  fetch: app.fetch,
};
