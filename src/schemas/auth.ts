import { LoginForm, SignupForm } from "@/interface/form-interface";
import { Schema } from "@/types/form-types";
import { email, required, validatePassword } from "@/validator/validator";

export const loginSchema: Schema<LoginForm> = {
  email: (val: string) => required(val) || email(val),
  password: (val: string) => required(val) || validatePassword(val),
};

export const signUpSchema: Schema<SignupForm> = {
  fullname: (val: string) => required(val),
  email: (val: string) => required(val) || email(val),
  password: (val: string) => required(val) || validatePassword(val),
};

export const signupFormDefaultValue: SignupForm = {
  fullname: "",
  email: "",
  password: "",
};
export const loginFormDefaultValue: LoginForm = {
  email: "",
  password: "",
};
