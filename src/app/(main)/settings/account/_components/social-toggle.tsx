import React from "react";

interface SocialToggleProps {
  name: string;
  description: string;
  connected: boolean;
  icon: React.ReactNode;
}

export function SocialToggle({
  name,
  description,
  connected,
  icon,
}: SocialToggleProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-white dark:bg-white/10 rounded-xl shadow-sm flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="font-bold text-foreground">{name}</p>
          <p className="text-xs text-muted">{description}</p>
        </div>
      </div>

      {/* Custom Accessible Toggle */}
      <button
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          connected ? "bg-primary" : "bg-gray-200 dark:bg-white/20"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            connected ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
