import { Hono } from "hono";
import indexRouter from "./routes/index.route";
import urlRouter from "./routes/urls.routes";

const app = new Hono();

app.route("/", indexRouter);
app.route("/urls", urlRouter);

export default app;
