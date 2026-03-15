import z from "zod";

export const UpdateProfileSchema = z.object({
  fullName: z.string().optional(),
  birthdate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullable(),
  bio: z
    .string()
    .max(120, "Bio must be at most 120 characters long.")
    .nullable(),
});
