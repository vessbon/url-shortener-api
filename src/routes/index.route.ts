import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import db from "@/db";
import { urls } from "@/db/schema";
import { CodeParamsSchema } from "@/lib/schemas";

const indexRouter = new Hono();

indexRouter.get("/", (c) => {
  return c.json({ message: "URL Shortener API" });
});

indexRouter.get("/:code", zValidator("param", CodeParamsSchema), async (c) => {
  const { code } = c.req.valid("param");
  const [url] = await db.select().from(urls).where(eq(urls.code, code));

  if (!url) {
    return c.json({ message: "Not Found" }, 404);
  }

  return c.redirect(`https://${url.url}`);
});

export default indexRouter;
