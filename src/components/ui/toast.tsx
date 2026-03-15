"use client";
import React, { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  id: string;
  message: string;
  type?: ToastType;
  onClose: (id: string) => void;
}

const Toast = ({ id, message, type = "success", onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 5000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-primary" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const colors = {
    success: "bg-green-100 border-green-500",
    error: "bg-red-100 border-red-500",
    info: "bg-blue-100 border-blue-500",
  };

  const textColors = {
    success: "text-green-800",
    error: "text-red-800",
    info: "text-blue-800",
  };

  return (
    <div
      className={`flex items-center gap-3 bg-background border border-primary p-4 rounded-xl shadow-xl animate-in fade-in slide-in-from-right-5 min-w-75 ${colors[type]}`}
    >
      <div className="shrink-0">{icons[type]}</div>
      <p className={`flex-1 text-sm font-bold ${textColors[type]}`}>
        {message}
      </p>
      <button
        onClick={() => onClose(id)}
        className="text-muted hover:text-charcoal transition-colors"
      >
        <X className="w-4 h-4 cursor-pointer" />
      </button>
    </div>
  );
};

Toast.displayName = "Toast";

export { Toast };
