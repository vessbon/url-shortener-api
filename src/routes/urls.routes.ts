import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import db from "@/db";
import { urlInsertSchema, urls } from "@/db/schema";
import { generateCode } from "@/utils/generate-code";

const urlRouter = new Hono();

urlRouter.get("/", async (c) => {
  const result = await db.select().from(urls);
  return c.json(result);
});

urlRouter.post("/", zValidator("json", urlInsertSchema), async (c) => {
  const { url } = c.req.valid("json");
  const code = generateCode();

  const [inserted] = await db.insert(urls).values({ url, code }).returning();

  return c.json(inserted);
});

export default urlRouter;
