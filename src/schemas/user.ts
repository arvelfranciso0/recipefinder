import z from "zod";
import { PasswordSchema } from "./auth";

export const UpdateUserPasswordSchema = z
  .object({
    currentPassword: PasswordSchema,
    confirmNewPassword: PasswordSchema,
    newPassword: PasswordSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });
