import { LoginSchema, SingupSchema } from "@/schemas/auth";
import z from "zod";

export type AuthContextType = {
  session: string | undefined;
  setSession: (session: string | undefined) => void;
  isLoading: boolean;
};

export type LoginForm = z.infer<typeof LoginSchema>;
export type SingupForm = z.infer<typeof SingupSchema>;

export type VerifyForm = {
  code: string;
  id: string;
};
