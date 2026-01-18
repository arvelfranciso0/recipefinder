"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  defaultValue?: string;
  onSelect?: (value: string) => void;
}

export const CustomSelect = ({
  options,
  defaultValue,
  onSelect,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue || options[0].label);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    setSelected(option.label);
    setIsOpen(false);
    if (onSelect) onSelect(option.value);
  };

  return (
    <div className="relative min-w-55" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-4 py-3 bg-white dark:bg-white/5 border rounded-xl outline-none text-sm font-semibold transition-all duration-200 
          ${isOpen ? "border-primary ring-2 ring-primary/10" : "border-[#e0e3dd] dark:border-white/10 hover:border-primary/50"}
          dark:text-white text-[#141612]`}
      >
        <span>{selected}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#73816a] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-[#1c2317] border border-[#e0e3dd] dark:border-white/10 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150">
          <div className="py-1 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option)}
                className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-left hover:bg-primary/10 hover:text-primary transition-colors dark:text-gray-300 dark:hover:bg-primary/20 dark:hover:text-white"
              >
                {option.label}
                {selected === option.label && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
