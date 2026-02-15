"use client";

import React, { useState } from "react";
import { ChefHat, Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ForgotPasswordForm } from "@/types/auth-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FortgotPasswordSchema } from "@/schemas/auth";
import { InputField } from "@/components/ui/input";
import SubmitAnimation from "@/components/shared/submitAnimation";
import { forgotPasswordAction } from "./action";
import { AlertProps } from "@/interface/alert-interface";
import Alert from "@/components/ui/alert";

export default function ForgotPassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(FortgotPasswordSchema),
  });
  const [isSent, setIsSent] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlerProps] = useState<AlertProps>({
    description: "",
    title: "",
    variant: "destructive",
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    const result = await forgotPasswordAction(data);
    if (!result.success) {
      setShowAlert(true);
      setAlerProps({
        title: "Something went wrong",
        description: result.message,
        variant: "destructive",
      });
    } else {
      setIsSent(true);
    }
  };

  if (isSent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-surface">
        <div className="max-w-md w-full rounded-[2.5rem] shadow-2xl shadow-charcoal/5 bg-white p-10 border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-500">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-black text-charcoal tracking-tight mb-4">
            Check your mail
          </h2>
          <p className="text-muted font-medium mb-8">
            We've sent a password reset link to <br />
            <span className="text-charcoal font-bold">
              {getValues("email")}
            </span>
          </p>
          <Button onClick={() => router.push("/login")} className="w-full py-4">
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

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
          {/* Logo Section */}
          <div className="flex flex-col items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <ChefHat size={28} />
            </div>
            <h1 className="text-2xl font-black text-charcoal tracking-tight">
              Recipe<span className="text-primary">Finder</span>
            </h1>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-charcoal tracking-tight">
              Reset Password
            </h2>
            <p className="text-muted font-medium mt-3 leading-relaxed">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
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
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-3 pl-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="w-full py-5 text-lg shadow-xl shadow-primary/20"
            >
              {isSubmitting ? <SubmitAnimation /> : "Send Reset Link"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/login")}
              className="inline-flex items-center gap-2 text-xs font-black text-muted hover:text-charcoal uppercase tracking-[0.2em] transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} strokeWidth={3} /> Back to Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
