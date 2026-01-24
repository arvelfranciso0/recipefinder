"use client";

import React, { useState, useRef, useEffect } from "react";
import { Info, X, ShieldCheck, Timer } from "lucide-react";
import Button from "@/components/ui/button";

export function VerificationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [code, setCode] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(100);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 1. Timer Logic
  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isOpen, timeLeft]);

  // 2. Format seconds into MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // 3. Auto-focus logic
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
      setTimeLeft(600); // Reset timer when modal opens
    }
  }, [isOpen]);

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-charcoal/60 backdrop-blur-sm p-4">
      <div className="bg-background w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-foreground  animate-in fade-in zoom-in duration-200">
        <div className="relative p-6 text-center border-b border-muted/50">
          <Button
            onClick={onClose}
            variant="ghost"
            className="absolute right-4 top-4 p-2  rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </Button>
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-foreground">
            Verify Your Account
          </h2>
          <p className="text-muted text-sm mt-1">
            Check your email for the 4-digit code.
          </p>
        </div>

        <div className="p-8">
          {/* OTP Inputs */}
          <div className="flex justify-center gap-4 mb-8">
            {code.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                className="w-16 h-20 text-center text-3xl font-black rounded-2xl border-2 border-foreground bg-slate-50 dark:bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
              />
            ))}
          </div>

          {/* Dynamic Timer Information */}
          <div
            className={`flex gap-3 p-4 rounded-2xl border transition-colors ${
              timeLeft > 0
                ? "bg-background border-muted "
                : "bg-background border-red-500"
            } mb-8`}
          >
            {timeLeft > 0 ? (
              <Info className="w-5 h-5 text-primary shrink-0" />
            ) : (
              <Timer className="w-5 h-5 text-red-500 shrink-0" />
            )}
            <div className="text-xs leading-relaxed text-muted">
              <p className="font-bold text-foreground mb-1">
                {timeLeft > 0 ? "Verification Security" : "Code Expired"}
              </p>
              {timeLeft > 0 ? (
                <>
                  The code will expire in{" "}
                  <span className="text-primary font-mono font-bold">
                    {formatTime(timeLeft)}
                  </span>
                  . If you didn't receive it, check your spam.
                </>
              ) : (
                <>
                  <span className="text-red-500">
                    Your security code has expired for safety. Please request a
                    new one.
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Button
              disabled={timeLeft <= 0}
              variant="primary"
              className="w-full "
            >
              Confirm Verification
            </Button>
            <Button
              onClick={() => setTimeLeft(600)}
              variant="ghost"
              className="w-full py-2 text-sm font-bold text-primary hover:underline transition-colors"
            >
              Resend Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
