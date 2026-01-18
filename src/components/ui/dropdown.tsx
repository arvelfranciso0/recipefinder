"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  label: string;
  value: string;
  icon?: ReactNode;
}

interface BaseDropdownProps {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
  labelPrefix?: string; // e.g., "Sorted by:"
  variant?: "ghost" | "outline" | "solid";
  className?: string;
  align?: "left" | "right";
}

export const BaseDropdown = ({
  options,
  selectedValue,
  onChange,
  labelPrefix,
  variant = "outline",
  className = "",
  align = "right",
}: BaseDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    options.find((opt) => opt.value === selectedValue) || options[0];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Variant Styles
  const variants = {
    outline:
      "bg-white dark:bg-white/5 border border-[#e0e3dd] dark:border-white/10 shadow-sm",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-white/5",
    solid: "bg-primary text-white border-transparent",
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-95 outline-none ${variants[variant]}`}
      >
        {labelPrefix && (
          <span className="text-[#73816a] font-medium">{labelPrefix}</span>
        )}
        <span className="flex items-center gap-2 font-bold dark:text-white">
          {selectedOption.label}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {isOpen && (
        <div
          className={`absolute ${align === "right" ? "right-0" : "left-0"} mt-2 w-56 bg-white dark:bg-[#1c2317] border border-[#e0e3dd] dark:border-white/10 rounded-xl shadow-xl z-[60] py-1 animate-in fade-in slide-in-from-top-2 duration-200`}
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`flex cursor-pointer items-center justify-between w-full px-4 py-2.5 text-sm font-semibold transition-colors
                ${
                  selectedValue === option.value
                    ? "text-primary bg-primary/5"
                    : "text-[#141612] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                }`}
            >
              <div className="flex items-center gap-2">
                {option.icon && (
                  <span className="opacity-70">{option.icon}</span>
                )}
                {option.label}
              </div>
              {selectedValue === option.value && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
