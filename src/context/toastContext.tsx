"use client";
import { Toast, ToastType } from "@/components/ui/toast";
import React, { createContext, useContext, useState, useCallback } from "react";

type ToastMessage = { id: string; message: string; type: ToastType };
type ToastContextType = (message: string, type?: ToastType) => void;

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (message: string, type: ToastType = "success") => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts((prev) => [...prev, { id, message, type }]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-100 flex flex-col gap-3">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
