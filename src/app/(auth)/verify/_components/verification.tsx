"use client";
import React, { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChefHat, ArrowLeft, Loader2, RotateCcw, Timer } from "lucide-react";
import Button from "@/components/ui/button";
import axios, { AxiosError, AxiosResponse } from "axios";
import { VerifyForm, VerifyResend } from "@/types/auth-types";
import { useToast } from "@/context/toastContext";
import InvalidVerificationPage from "./failed-verification";
import { useCountdown } from "@/hooks/useCountdown";
import VerificationSkeleton from "@/components/shared/verificationSekleton";
import Alert from "@/components/ui/alert";
import SubmitAnimation from "@/components/shared/submitAnimation";

export default function VerificationForm({
  tokenId,
  resendAt,
}: {
  tokenId: string;
  resendAt: Date | null;
}) {
  const resendAtTimeNumber = new Date(resendAt as Date).getTime();
  const { minutes, seconds, expired } = useCountdown(resendAtTimeNumber);
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [verification, setVerification] = useState({
    showFailedVerification: false,
    message: "",
    isVerifySubmitting: false,
    isResendSubmitting: false,
  });
  const toast = useToast();
  const [mounted, setMounted] = useState(false);

  // Fixed type: array of HTMLInputElement or null
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const router = useRouter();

  // Handle input change
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // only numbers

    const newCode = [...code];
    newCode[index] = value.slice(-1); // only last digit
    setCode(newCode);

    // focus next input
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerification((prev) => ({
      ...prev,
      isVerifySubmitting: true,
    }));

    const finalCode = code.join("");

    const data: VerifyForm = {
      code: finalCode,
      id: tokenId,
    };
    await axios
      .post("/api/auth/verify", data)
      .then((result: AxiosResponse) => {
        toast("Verified successfully", "success");
        setVerification((prev) => ({
          ...prev,
          isVerifySubmitting: false,
        }));
        router.push("/login");
      })
      .catch((error: AxiosError) => {
        const serverMessage = (error.response?.data as { error: string })
          ?.error;
        const statusCode = error?.response?.status;
        if (statusCode === 422) {
          toast(serverMessage, "error");
        }

        if (statusCode === 404) {
          if (serverMessage === "Verication code is expired") {
            setVerification((prev) => ({
              ...prev,
              message:
                "This verification link has expired. It may have already been used or timed out. Click **Resend Code** below to get a new one.",
            }));
          }

          if (serverMessage === "Verification code is already used.") {
            setVerification((prev) => ({
              ...prev,
              message:
                "It looks like this verification link has already been used. Each email can only be verified once, so this link is no longer valid.",
            }));
          }
          setVerification((prev) => ({
            ...prev,
            showFailedVerification: true,
          }));
        }
        setVerification((prev) => ({
          ...prev,
          isVerifySubmitting: false,
        }));
      });
  };

  const handleResend = async () => {
    setVerification((prev) => ({
      ...prev,
      isResendSubmitting: true,
    }));
    const data: VerifyResend = {
      id: tokenId,
    };
    await axios
      .post("/api/auth/verify/resend", data)
      .then((result: AxiosResponse) => {
        toast(
          "A new verification code has been sent! Please check your email.",
          "success",
        );

        setVerification((prev) => ({
          ...prev,
          isResendSubmitting: false,
        }));
        router.push(`/verify/${result.data.id}`);
      })
      .catch((error) => {
        const serverMessage = (error.response?.data as { error: string })
          ?.error;
        setVerification((prev) => ({
          ...prev,
          message: serverMessage ?? "Error occured!",
          isResendSubmitting: false,
          showFailedVerification: true,
        }));
      });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <VerificationSkeleton />;
  }

  if (verification.isResendSubmitting) {
    return <VerificationSkeleton />;
  }
  return (
    <>
      {verification.showFailedVerification && (
        <Alert
          variant="destructive"
          description={verification.message}
          onClose={() =>
            setVerification((prev) => ({
              ...prev,
              showFailedVerification: false,
            }))
          }
        />
      )}

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl shadow-xl p-8 border border-slate-100">
          {/* Logo Section */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#65a338]/20">
              <ChefHat size={24} />
            </div>
            <h1 className="text-xl font-extrabold text-foreground">
              Recipe<span className="text-primary">Finder</span>
            </h1>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foeground">
              Check your email
            </h2>
            <p className="text-muted text-sm mt-2 leading-relaxed">
              Please enter the 6-digit verification code <br />
              sent to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* OTP Input Grid */}
            <div className="flex justify-between gap-2 max-w-[320px] mx-auto">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl font-bold border-2 rounded-xl text-foreground border-foreground  focus:border-foreground focus:bg-primary focus:outline-none transition-all"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={
                verification.isVerifySubmitting || code.some((d) => d === "")
              }
              className={`${verification.isVerifySubmitting || code.some((d) => d === "") ? "cursor-not-allowed" : "cursor-pointer"} w-full bg-primary hover:bg-priamry disabled:bg-muted  text-white font-semibold py-4 rounded-2xl transition-all shadow-lg shadow-[#65a338]/20 flex items-center justify-center gap-2`}
            >
              {verification.isVerifySubmitting ? (
                <SubmitAnimation />
              ) : (
                "Verify Account"
              )}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm font-semibold text-muted">
                Didn't receive the code?
              </p>

              {expired ? (
                <button
                  onClick={handleResend}
                  disabled={verification.isResendSubmitting}
                  className={`flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors  group ${verification.isResendSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {verification.isResendSubmitting ? (
                    <SubmitAnimation />
                  ) : (
                    <>
                      <RotateCcw
                        size={16}
                        className="group-hover:-rotate-45 transition-transform"
                      />
                      Resend Code
                    </>
                  )}
                </button>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2  ">
                  <Timer size={16} className="text-muted" />
                  <p className="text-sm font-black text-charcoal tabular-nums">
                    Resend in{" "}
                    <span className="text-primary">
                      {minutes}:{seconds.toString().padStart(2, "0")} mins
                    </span>
                  </p>
                </div>
              )}
            </div>

            <hr className="border-slate-100" />

            <Button
              onClick={() => router.push("/login")}
              variant="ghost"
              className="inline-flex items-center gap-2 text-xs font-semibold  uppercase tracking-widest transition-colors"
            >
              <ArrowLeft size={14} /> Back to Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
