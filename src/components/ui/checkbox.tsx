"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ children, id, className = "", ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(props.defaultChecked || false);

    return (
      <label
        className={`flex items-center gap-3 group cursor-pointer ${className}`}
      >
        <div className="relative flex items-center justify-center">
          {/* Native Hidden Checkbox */}
          <input
            {...props}
            type="checkbox"
            id={id}
            checked={isChecked}
            ref={ref}
            className="peer absolute h-5 w-5 opacity-0 cursor-pointer z-10"
            onChange={(e) => {
              setIsChecked(e.target.checked);
              if (props.onChange) props.onChange(e);
            }}
          />

          {/* Custom Visual Box */}
          <div
            className={`
            h-5 w-5 rounded-lg border-2 transition-all duration-200 flex items-center justify-center
            group-hover:border-primary/50
            peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30 peer-focus-visible:ring-offset-2
            ${
              isChecked
                ? "bg-primary border-primary"
                : "bg-gray-50 border-gray-200"
            }
          `}
          >
            {/* Animated Checkmark */}
            <Check
              className={`
                h-3.5 w-3.5 text-white transition-all duration-200 stroke-[4px]
                ${isChecked ? "scale-100 opacity-100" : "scale-50 opacity-0"}
              `}
            />
          </div>
        </div>

        {children && (
          <span className="text-sm font-semibold cursor-pointer text-muted select-none group-hover:text-primary dark:group-hover:text-primary transition-colors">
            {children}
          </span>
        )}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
