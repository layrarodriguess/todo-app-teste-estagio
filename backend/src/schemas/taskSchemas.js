import { z } from "zod";

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const createTaskSchema = z.object({
  title: z.string().trim().min(1),
});

export const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1).optional(),
    completed: z.boolean().optional(),
  })
  .refine((data) => data.title !== undefined || data.completed !== undefined, {
    message: "Informe pelo menos um campo para atualizar.",
  });
