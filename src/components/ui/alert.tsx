"use client";

import { AlertProps } from "@/interface/alert-interface";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";

export default function Alert({
  title,
  description,
  variant = "info",
  onClose,
  className = "",
}: AlertProps) {
  const variants = {
    info: {
      icon: <Info className="w-8 h-8 text-blue-500" />,
      btn: "bg-blue-500 hover:bg-blue-600",
    },
    success: {
      icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
      btn: "bg-primary hover:bg-primary-dark",
    },
    warning: {
      icon: <AlertTriangle className="w-8 h-8 text-amber-500" />,
      btn: "bg-amber-500 hover:bg-amber-600",
    },
    destructive: {
      icon: <AlertCircle className="w-8 h-8 text-red-500" />,
      btn: "bg-red-500 hover:bg-red-600",
    },
  };

  const style = variants[variant];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop: Darkens the background and handles closing on click */}
      <div
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* The Alert Card */}
      <div
        role="alertdialog"
        className={`
          relative w-full max-w-md bg-white rounded-[2rem] p-8 shadow-2xl 
          flex flex-col items-center text-center
          animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-300
          ${className}
        `}
      >
        {/* Close Icon (Top Right) */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-muted"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Big Icon Header */}
        <div className="mb-6 p-4 rounded-full bg-gray-50">{style.icon}</div>

        {/* Content */}
        <div className="mb-8">
          {title && (
            <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
              {title}
            </h3>
          )}
          <p className="text-muted font-medium leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className={`
            w-full py-4 cursor-pointer rounded-xl text-white font-bold text-lg 
            transition-all active:scale-95 shadow-lg shadow-black/5
            ${style.btn}
          `}
        >
          {variant === "destructive" ? "Confirm" : "Got it"}
        </button>
      </div>
    </div>
  );
}
