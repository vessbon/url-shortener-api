import { z } from "zod";

export const IdParamsSchema = z.object({
  id: z.coerce.number(),
});

export const CodeParamsSchema = z.object({
  code: z
    .string()
    .length(6)
    .regex(/^[a-zA-Z0-9]+$/, "Code must only contain alphanumeric characters"),
});
