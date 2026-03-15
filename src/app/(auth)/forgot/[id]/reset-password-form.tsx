"use client";

import React, { useState } from "react";
import { ChefHat, Lock, Loader2, Check, X, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { NewPasswordForm } from "@/types/auth-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordShcema } from "@/schemas/auth";
import { InputField } from "@/components/ui/input";
import SubmitAnimation from "@/components/shared/submitAnimation";
import { updateNewPasswordAction } from "./action";
import { AlertProps } from "@/interface/alert-interface";
import Alert from "@/components/ui/alert";

export default function ResetPassword({ id }: { id: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlerProps] = useState<AlertProps>({
    description: "",
    title: "",
    variant: "destructive",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<NewPasswordForm>({
    resolver: zodResolver(NewPasswordShcema),
  });

  const onSubmit = async (data: NewPasswordForm) => {
    const result = await updateNewPasswordAction(id, data);

    if (!result.success) {
      setShowAlert(true);
      setAlerProps({
        title: "Something went wrong",
        description: result.message,
        variant: "destructive",
      });
    } else {
      setShowAlert(true);
      setAlerProps({
        title: "Reset Password Success",
        description: result.message,
        variant: "success",
      });
    }
  };

  return (
    <>
      {showAlert && (
        <Alert
          description={alertProps.description}
          title={alertProps.title}
          variant={alertProps.variant}
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="min-h-screen flex items-center justify-center p-4 bg-surface">
        <div className="max-w-md w-full rounded-[2.5rem] shadow-2xl shadow-charcoal/5 bg-white p-10 border border-slate-100">
          {/* Header Section */}
          <div className="flex flex-col items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <ChefHat size={28} />
            </div>
            <h2 className="text-3xl font-black text-charcoal tracking-tight">
              New Password
            </h2>
            <p className="text-muted font-medium text-center leading-relaxed">
              Please create a secure password that you don't use elsewhere.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* New Password Input */}
            <div className="space-y-2">
              <label
                className="block text-sm font-bold text-foreground mb-2"
                htmlFor="password"
              >
                New Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-muted/50">
                  <Lock />
                </span>
                <InputField
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  minLength={8}
                  placeholder="••••••••"
                  icon={Lock}
                  className="w-full"
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
                <p className="text-red-500 text-xs mt-3 pl-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label
                className="block text-sm font-bold text-foreground mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-muted/50">
                  <Lock />
                </span>
                <InputField
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  minLength={8}
                  placeholder="••••••••"
                  icon={Lock}
                  className="w-full"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-3 pl-2">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="w-full py-5 text-lg shadow-xl shadow-primary/20 mt-4"
            >
              {isSubmitting ? <SubmitAnimation /> : "Reset Password"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
