import { AlertCircle, ArrowLeft, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function InvalidVerificationPage(props: { message: string }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-10 border border-red-50 relative overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute top-0 right-0 size-32 bg-red-50/50 rounded-full -mr-16 -mt-16 blur-3xl" />

        {/* Logo Section */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="size-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 shadow-sm">
            <AlertCircle size={28} />
          </div>
        </div>

        {/* Error Message */}
        <div className="text-center space-y-4 mb-10">
          <h2 className="text-2xl font-black text-slate-900 leading-tight">
            Verification <span className="text-red-600">Failed</span>
          </h2>
          <p className="text-muted text-sm leading-relaxed">{props.message}</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            href="/login"
            className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors py-2"
          >
            <ArrowLeft size={14} /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
