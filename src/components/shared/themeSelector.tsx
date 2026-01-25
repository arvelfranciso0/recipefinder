"use client";

import { Sun, Moon, Check, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeSelectorSkeleton } from "./themeSelectorSkeleton";
import Card from "../ui/card";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <ThemeSelectorSkeleton />;
  return (
    <Card>
      <div className="mb-6 flex items-center gap-4">
        <div className="bg-primary/10 p-3 rounded-2xl text-primary">
          <Palette className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Theme Preference</h3>
          <p className="text-sm text-muted">
            Choose how RecipeFinder looks for you.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Light Mode */}
        <button
          onClick={() => setTheme("light")}
          className={`relative cursor-pointer hover:border-primary p-4 rounded-2xl border-2 transition-all text-left ${
            theme === "light"
              ? "border-primary bg-primary/5"
              : "border-gray-100 dark:border-white/10 bg-white dark:bg-transparent"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`p-2 rounded-lg ${theme === "light" ? "bg-white text-primary shadow-sm" : "bg-slate-100 text-muted"}`}
            >
              <Sun className="w-5 h-5" />
            </div>
            {theme === "light" && (
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <span className="block font-bold">Light Mode</span>
          <span className="text-xs text-muted">
            Clean and bright appearance
          </span>
        </button>

        {/* Dark Mode */}
        <button
          onClick={() => setTheme("dark")}
          className={`relative p-4 cursor-pointer hover:border-primary rounded-2xl border-2 transition-all text-left ${
            theme === "dark"
              ? "border-primary bg-primary/5"
              : "border-gray-100 dark:border-white/10 bg-white dark:bg-transparent"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`p-2 rounded-lg ${theme === "dark" ? "bg-slate-800 text-white" : "bg-slate-100 text-muted"}`}
            >
              <Moon className="w-5 h-5" />
            </div>
            {theme === "dark" && (
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <span className="block font-bold">Dark Mode</span>
          <span className="text-xs text-muted">
            Reduced glare for night viewing
          </span>
        </button>
      </div>
    </Card>
  );
}
