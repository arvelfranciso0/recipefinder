"use client";
import React, { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChefHat, ArrowLeft, Loader2 } from "lucide-react";
import Button from "@/components/ui/button";
import axios, { AxiosError, AxiosResponse } from "axios";
import { VerifyForm } from "@/types/auth-types";

export default function VerificationForm({ tokenId }: { tokenId: string }) {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);

    const finalCode = code.join("");
    console.log("Verifying Manual Code:", finalCode);

    const data: VerifyForm = {
      code: finalCode,
      id: tokenId,
    };
    await axios
      .post("/api/auth/verify", data)
      .then((result: AxiosResponse) => {
        console.log("Result :", result.data);
      })
      .catch((error: AxiosError) => {
        setIsSubmitting(false);
      });
  };

  return (
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
            disabled={isSubmitting || code.some((d) => d === "")}
            className="w-full bg-primary hover:bg-priamry disabled:bg-muted cursor-pointer text-white font-semibold py-4 rounded-2xl transition-all shadow-lg shadow-[#65a338]/20 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Verify Account"
            )}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-slate-500">
            Didn't receive the code?{" "}
            <button className="text-primary font-bold hover:underline cursor-pointer">
              Resend Code
            </button>
          </p>

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
  );
}
