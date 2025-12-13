import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import db from "@/db";
import { urlDeleteSchema, urlInsertSchema, urls } from "@/db/schema";
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

urlRouter.delete("/:id", zValidator("param", urlDeleteSchema), async (c) => {
  const { id } = c.req.valid("param");
  const deleted = await db
    .delete(urls)
    .where(eq(urls.id, id))
    .returning({ id: urls.id });

  if (deleted.length === 0) {
    return c.json({ message: "Not Found" }, 404);
  }

  return c.body(null, 204);
});

export default urlRouter;
