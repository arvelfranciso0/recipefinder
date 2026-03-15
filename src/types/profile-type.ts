import { UpdateProfileSchema } from "@/schemas/profile";
import z from "zod";

export type ProfileEditForm = z.infer<typeof UpdateProfileSchema>;
