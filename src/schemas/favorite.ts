import z from "zod";

export const CreateFavoriteSchema = z.object({
  mealId: z.string(),
  mealName: z.string(),
});

export const DeleteFavoriteSchema = z.object({
  id: z.int(),
  mealName: z.string(),
});
