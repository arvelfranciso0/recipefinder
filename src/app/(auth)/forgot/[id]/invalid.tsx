"use client";

import React from "react";
import {
  ChefHat,
  Link2Off,
  ArrowLeft,
  RefreshCw,
  MessageCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";

export default function InvalidLinkPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-surface">
      <div className="max-w-md w-full rounded-[2.5rem] shadow-2xl shadow-charcoal/5 bg-white p-10 border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-500">
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <ChefHat size={28} />
          </div>
          <h1 className="text-2xl font-black text-charcoal tracking-tight">
            Recipe<span className="text-primary">Finder</span>
          </h1>
        </div>

        {/* Error Icon */}
        <div className="relative mb-8 flex justify-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
            <Link2Off className="w-10 h-10 text-red-500" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-10">
          <h2 className="text-3xl font-black text-charcoal tracking-tight">
            Link Expired or Invalid
          </h2>
          <p className="text-muted font-medium leading-relaxed">
            For your security, password reset links expire after 15 minutes or
            can only be used once.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button onClick={() => router.push("/login")} variant="ghost">
            <ArrowLeft size={16} strokeWidth={3} />
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
}
