import { Hono } from "hono";

const indexRouter = new Hono();

indexRouter.get("/", (c) => {
  return c.json({ message: "URL Shortener API" });
});

export default indexRouter;
