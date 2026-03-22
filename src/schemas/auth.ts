import z from "zod";

export const PasswordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character",
  });

export const SingupSchema = z
  .object({
    email: z.email(),
    fullName: z.string(),
    password: PasswordSchema,
    confirmPassword: PasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.email(),
  password: PasswordSchema,
  rememberMe: z.boolean().optional(),
});

export const VerificationSchema = z.object({
  code: z.string(),
  id: z.string(),
});

export const VerificationIdSchema = z.object({
  id: z.string(),
});

export const FortgotPasswordSchema = z.object({
  email: z.email(),
});

export const NewPasswordShcema = z
  .object({
    password: PasswordSchema,

    confirmPassword: PasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
