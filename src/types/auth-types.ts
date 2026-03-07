import {
  FortgotPasswordSchema,
  LoginSchema,
  NewPasswordShcema,
  SingupSchema,
  VerificationIdSchema,
  VerificationSchema,
} from "@/schemas/auth";
import z from "zod";

export type LoginForm = z.infer<typeof LoginSchema>;
export type ForgotPasswordForm = z.infer<typeof FortgotPasswordSchema>;
export type NewPasswordForm = z.infer<typeof NewPasswordShcema>;
export type SingupForm = z.infer<typeof SingupSchema>;

export type VerifyForm = z.infer<typeof VerificationSchema>;
export type VerifyResend = z.infer<typeof VerificationIdSchema>;
