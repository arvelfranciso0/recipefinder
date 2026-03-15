"use client";

import Link from "next/link";
import { ChefHat } from "@/components/icons/chef-hat";
import SocialButton from "../_components/social-button";
import { Checkbox } from "@/components/ui/checkbox";
import Button from "@/components/ui/button";
import { InputField } from "@/components/ui/input";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { LoginForm } from "@/types/auth-types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/auth";
import { loginActions } from "./action";
import { useToast } from "@/context/toastContext";
import Alert from "@/components/ui/alert";
import { AlertProps } from "@/interface/alert-interface";
import SubmitAnimation from "@/components/shared/submitAnimation";

export default function LoginPage() {
  const [check, setCheck] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlerProps] = useState<AlertProps>({
    description: "",
    title: "",
    variant: "destructive",
  });
  const toast = useToast();
  const {
    register,
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful,
      dirtyFields,
      isValid,
    },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginForm) => {
    const result = await loginActions(data);
    setShowAlert(true);
    setAlerProps({
      title: "Something went wrong",
      description: result.message,
      variant: "destructive",
    });
    // toast(result.message, "error");
  };

  useEffect(() => {
    const hasDirtyFields = Object.keys(dirtyFields).length > 0;
    // Only warn if the form is dirty OR currently submitting
    if (!hasDirtyFields && !isSubmitting) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dirtyFields, isSubmitting]);

  return (
    <>
      {/* Show alert */}
      {showAlert && (
        <Alert
          description={alertProps.description}
          title={alertProps.title}
          variant={alertProps.variant}
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="  min-h-screen flex">
        {/* Left Side: Hero Image (Hidden on Mobile) */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCza3cqistU_j7B4jnlb7RKKWOnH_GkrvbR3n89SZq0QPE6KWPGgVsSNk_s1sXy665F5UU89EuAmG_zXq2HJHQl66eiyL2r_UR2aGQ-OpH68uMWdeJ87M-FdTFqk-SSC_EuXOucnSof49FjCDo_NNJiYLPNJSU2j6xrvOGT7GztC4_oTct_RDEiDj-gCjwym3Qd9Wvu2fRKB96dIixJl3yUOtgsgFs8xBQcoPpGnDxkUEAmZL8Amzl659VvDM31Y3jwGU_dL8rMXp1S')",
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="absolute bottom-12 left-12 right-12 text-white z-10">
            <div className="bg-white/20 backdrop-blur-md p-8 rounded-3xl border border-white/20">
              <h2 className="text-3xl font-extrabold mb-4 leading-tight">
                Master the art of home cooking.
              </h2>
              <p className="text-lg text-white/90">
                Join our community and discover over 5,000+ hand-picked recipes
                from professional chefs around the world.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-10">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <ChefHat />
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
                  Recipe<span className="text-primary">Finder</span>
                </h1>
              </Link>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-black text-foreground mb-2">
                Welcome back!
              </h2>
              <p className="text-muted">
                Please enter your details to sign in.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  className="block text-sm font-bold text-foreground mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <InputField
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  required
                  className="w-full"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-3 pl-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex justify-between mb-2">
                <label
                  className="block text-sm font-bold text-foreground"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  href="/forgot"
                  className="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div>
                <div className="relative">
                  <InputField
                    id="password"
                    {...register("password")}
                    placeholder="••••••••"
                    icon={Lock}
                    className="w-full"
                    name="password"
                    type={showPassword ? "text" : "password"}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs  pl-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Controller
                  name={"rememberMe"}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="remember"
                      checked={field.value ?? false}
                      onCheckedChange={field.onChange}
                    >
                      <label
                        htmlFor="remember"
                        className="text-sm cursor-pointer font-medium text-muted"
                      >
                        Keep me signed in
                      </label>
                    </Checkbox>
                  )}
                />
              </div>

              <Button
                disabled={isSubmitting || !isValid}
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98]"
              >
                {isSubmitting ? <SubmitAnimation /> : "Sign in"}
              </Button>
            </form>

            {/* Divider */}
            {/* <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-sm font-semibold">
              <span className="bg-white dark:bg-background px-4 text-muted/50 uppercase tracking-widest text-[10px]">
                Or continue with
              </span>
            </div>
          </div> */}

            {/* Social Buttons */}
            {/* <div className="grid grid-cols-2 gap-4">
            <SocialButton provider="Google" />
            <SocialButton provider="Facebook" />
          </div> */}

            <p className="mt-10 text-center text-sm text-muted font-medium">
              Don&apos;t have an account?
              <Link
                href="/signup"
                className="text-primary font-bold hover:underline ml-1"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
