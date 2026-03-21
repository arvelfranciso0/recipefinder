"use client";

import { notFound } from "next/navigation";

// import React, { useState } from "react";
// import { Ruler, Utensils, Globe, RotateCcw } from "lucide-react";
// import { ThemeSelector } from "@/components/shared/themeSelector";
// import Button from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import Card from "@/components/ui/card";

// // Mock data - You can move these to your @/libs/data file
// const mealTypes = [
//   { id: "breakfast", label: "Breakfast" },
//   { id: "lunch", label: "Lunch" },
//   { id: "dinner", label: "Dinner" },
//   { id: "snack", label: "Snack" },
//   { id: "dessert", label: "Dessert" },
// ];

// const cuisines = [
//   { id: "italian", label: "Italian" },
//   { id: "mexican", label: "Mexican" },
//   { id: "japanese", label: "Japanese" },
//   { id: "indian", label: "Indian" },
//   { id: "french", label: "French" },
//   { id: "thai", label: "Thai" },
// ];

export default function PreferencesSettings() {
  // const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  // const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  // const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  // const toggleItem = (
  //   id: string,
  //   state: string[],
  //   setState: React.Dispatch<React.SetStateAction<string[]>>,
  // ) => {
  //   setState((prev) =>
  //     prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
  //   );
  // };

  return (
    // <section className="flex-1 space-y-8 animate-in fade-in duration-500">
    //   {/* Header */}
    //   <div>
    //     <h2 className="text-3xl font-black text-foreground">
    //       User Preferences
    //     </h2>
    //     <p className="text-muted mt-1 font-medium">
    //       Customize your RecipeFinder experience to match your taste and needs.
    //     </p>
    //   </div>

    //   {/* 1. Meal Type Preference */}
    //   <Card>
    //     <div className="flex items-center gap-4 mb-8">
    //       <div className="bg-primary/10 p-3 rounded-2xl text-primary">
    //         <Utensils className="w-6 h-6" />
    //       </div>
    //       <div>
    //         <h3 className="text-xl font-bold">Meal Type Preference</h3>
    //         <p className="text-sm text-muted font-medium">
    //           What kind of meals are you usually looking for?
    //         </p>
    //       </div>
    //     </div>

    //     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    //       {mealTypes.map((meal) => (
    //         <label
    //           key={meal.id}
    //           className={`flex flex-col items-center justify-center gap-3 p-6 rounded-[2rem] border transition-all cursor-pointer group ${
    //             selectedMeals.includes(meal.id)
    //               ? "border-primary bg-primary/5 shadow-sm"
    //               : "border-muted/10 bg-muted/5 hover:border-primary/30"
    //           }`}
    //         >
    //           <Checkbox
    //             id={meal.id}
    //             checked={selectedMeals.includes(meal.id)}
    //             onCheckedChange={() =>
    //               toggleItem(meal.id, selectedMeals, setSelectedMeals)
    //             }
    //             className="sr-only" // Hidden but accessible, or keep it visible if you prefer
    //           />
    //           <span
    //             className={`font-black text-sm uppercase tracking-wider transition-colors ${
    //               selectedMeals.includes(meal.id)
    //                 ? "text-primary"
    //                 : "text-muted group-hover:text-foreground"
    //             }`}
    //           >
    //             {meal.label}
    //           </span>
    //         </label>
    //       ))}
    //     </div>
    //   </Card>

    //   {/* 2. Cuisine Preferences */}
    //   <Card>
    //     <div className="flex items-center gap-4 mb-8">
    //       <div className="bg-primary/10 p-3 rounded-2xl text-primary">
    //         <Globe className="w-6 h-6" />
    //       </div>
    //       <div>
    //         <h3 className="text-xl font-bold">Cuisine Preferences</h3>
    //         <p className="text-sm text-muted font-medium">
    //           Select the flavors you enjoy the most.
    //         </p>
    //       </div>
    //     </div>

    //     <div className="flex flex-wrap gap-3">
    //       {cuisines.map((cuisine) => (
    //         <button
    //           key={cuisine.id}
    //           onClick={() =>
    //             toggleItem(cuisine.id, selectedCuisines, setSelectedCuisines)
    //           }
    //           className={`px-6 cursor-pointer py-3 rounded-2xl font-bold text-sm transition-all border ${
    //             selectedCuisines.includes(cuisine.id)
    //               ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
    //               : "bg-background border-muted/20 text-muted hover:border-primary/50 hover:text-foreground"
    //           }`}
    //         >
    //           {cuisine.label}
    //         </button>
    //       ))}
    //     </div>
    //   </Card>

    //   {/* 3. Measurement Units */}
    //   {/* <Card>
    //     <div className="flex items-center gap-4 mb-8">
    //       <div className="bg-primary/10 p-3 rounded-2xl text-primary">
    //         <Ruler className="w-6 h-6" />
    //       </div>
    //       <div>
    //         <h3 className="text-xl font-bold">Measurement Units</h3>
    //         <p className="text-sm text-muted font-medium">
    //           Choose your preferred unit system for recipe ingredients.
    //         </p>
    //       </div>
    //     </div>

    //     <div className="flex bg-muted/10 p-1.5 rounded-2xl w-full max-w-sm border border-muted/5">
    //       {(["metric", "imperial"] as const).map((u) => (
    //         <button
    //           key={u}
    //           onClick={() => setUnit(u)}
    //           className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
    //             unit === u
    //               ? "bg-background text-primary shadow-sm border border-muted/10"
    //               : "text-muted/60 hover:text-primary"
    //           }`}
    //         >
    //           {u}
    //           <span className="block text-[10px] font-medium lowercase opacity-60 mt-0.5">
    //             {u === "metric" ? "(g, ml, °c)" : "(oz, lb, °f)"}
    //           </span>
    //         </button>
    //       ))}
    //     </div>
    //   </Card> */}

    //   {/* Theme Preference */}
    //   <ThemeSelector />

    //   {/* Actions */}
    //   <div className="flex items-center justify-end gap-3 pt-6 border-t border-muted/10">
    //     <Button variant="ghost" className="font-bold text-muted gap-2">
    //       <RotateCcw size={16} />
    //       Reset
    //     </Button>
    //     <Button className="px-10 rounded-xl font-black uppercase tracking-wider shadow-lg shadow-primary/20">
    //       Save Preferences
    //     </Button>
    //   </div>
    // </section>

    notFound()
  );
}
