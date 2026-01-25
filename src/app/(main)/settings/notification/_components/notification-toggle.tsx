"use client";

import React, { useState } from "react";

interface NotificationToggleProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  defaultChecked?: boolean;
}

export function NotificationToggle({
  title,
  description,
  icon,
  defaultChecked = false,
}: NotificationToggleProps) {
  const [enabled, setEnabled] = useState(defaultChecked);

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-primary">{icon}</span>
          <h3 className="text-lg font-bold text-foregroud">{title}</h3>
        </div>
        <p className="text-sm text-muted dark:text-muted/80">{description}</p>
      </div>

      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          enabled ? "bg-primary" : "bg-muted"
        }`}
        role="switch"
        aria-checked={enabled}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
