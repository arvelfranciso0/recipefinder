"use client";

import React, { useState } from "react";
import { Leaf, Ruler, Palette, Check } from "lucide-react";
import { ThemeSelector } from "@/components/shared/themeSelector";
import Button from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { diets } from "@/libs/data";
import Card from "@/components/ui/card";

export default function PreferencesSettings() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [toggleDiets, setToggleDiets] = useState(diets);

  const toggleCheckDiets = (id: string) => {
    setToggleDiets((prevDiets) =>
      prevDiets.map((diet) =>
        diet.id === id ? { ...diet, isChecked: !diet.isChecked } : diet,
      ),
    );
  };

  return (
    <section className="flex-1 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-foreground">
          User Preferences
        </h2>
        <p className="text-muted  mt-1">
          Customize your RecipeFinder experience to match your taste and needs.
        </p>
      </div>

      {/* 1. Dietary Preferences Card */}
      <Card>
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-primary/10 p-3 rounded-2xl text-primary">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Dietary Preferences</h3>
            <p className="text-sm text-muted">
              We'll prioritize recipes that fit your chosen diets.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {toggleDiets.map((diet) => (
            <label
              key={diet.id}
              className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all cursor-pointer bg-slate-50/50 dark:bg-white/5 group"
            >
              <Checkbox
                id={`${diet.id}`}
                onCheckedChange={() => toggleCheckDiets(diet.id)}
                checked={diet.isChecked}
              >
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {diet.label}
                </span>
              </Checkbox>
            </label>
          ))}
        </div>
      </Card>

      {/* 2. Measurement Units Card */}
      <Card>
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-primary/10 p-3 rounded-2xl text-primary">
            <Ruler className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Measurement Units</h3>
            <p className="text-sm text-muted">
              Choose your preferred unit system for recipe ingredients.
            </p>
          </div>
        </div>

        <div className="flex bg-slate-100 dark:bg-white/5 p-1.5 rounded-2xl w-full max-w-sm">
          <button
            onClick={() => setUnit("metric")}
            className={`flex-1 flex items-center cursor-pointer justify-center gap-2 py-3 px-6 rounded-xl font-bold transition-all ${
              unit === "metric"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted hover:text-primary"
            }`}
          >
            Metric
            <span className="text-xs font-medium opacity-60">(g, ml, °C)</span>
          </button>
          <button
            onClick={() => setUnit("imperial")}
            className={`flex-1 flex items-center justify-center cursor-pointer gap-2 py-3 px-6 rounded-xl font-bold transition-all ${
              unit === "imperial"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted hover:text-primary"
            }`}
          >
            Imperial
            <span className="text-xs font-medium opacity-60">(oz, lb, °F)</span>
          </button>
        </div>
      </Card>

      {/* 3. Theme Preference (Hydration Safe) */}
      <ThemeSelector />

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 pt-4">
        <Button variant="ghost">Reset to Default</Button>
        <Button>Save Preferences</Button>
      </div>
    </section>
  );
}
