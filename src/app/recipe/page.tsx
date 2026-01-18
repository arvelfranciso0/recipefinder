"use client";

import { ChevronDown, Star, TrendingUp, X } from "lucide-react";
import { MealListingGrid } from "./_components/mealListingGrid";
import { CustomSelect } from "@/components/ui/select";
import { BaseDropdown } from "@/components/ui/dropdown";
import { useState } from "react";

const categories = [
  { label: "All Categories", value: "all" },
  { label: "Breakfast", value: "breakfast" },
  { label: "Italian", value: "italian" },
  { label: "Seafood", value: "seafood" },
  { label: "Vegetarian", value: "vegetarian" },
];

export default function MealListingPage() {
  const [sortBy, setSortBy] = useState("");
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 px-4 lg:px-10 py-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 dark:text-white">
            Discover <span className="text-primary">Daily Fresh</span> Recipes
          </h1>
          <p className="text-[#73816a] dark:text-gray-400 text-lg">
            Browse through 5,000+ hand-picked recipes from professional chefs
            and home cooks worldwide.
          </p>
        </div>

        <BaseDropdown
          labelPrefix="Sorted by:"
          selectedValue={sortBy}
          onChange={setSortBy}
          options={[
            {
              label: "Popularity",
              value: "pop",
              icon: <TrendingUp className="w-4 h-4" />,
            },
            {
              label: "Rating",
              value: "rate",
              icon: <Star className="w-4 h-4" />,
            },
          ]}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-6 mb-10">
        <div className="flex flex-wrap items-center gap-4">
          <CustomSelect
            options={categories}
            onSelect={(val) => console.log("Selected:", val)}
          />

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl shadow-md shadow-primary/20 text-sm font-bold">
              <span>Italian</span>
              <X className="w-4 h-4 cursor-pointer" />
            </div>
            <button className="px-4 py-2.5 bg-white dark:bg-white/5 text-[#141612] dark:text-white border border-[#e0e3dd] dark:border-white/10 rounded-xl text-sm font-semibold">
              Lunch
            </button>
            <button className="px-4 py-2.5 text-primary text-sm font-bold hover:underline">
              Clear all
            </button>
          </div>
        </div>
      </div>

      {/* The Component You Requested */}
      <MealListingGrid />

      {/* Pagination/Load More */}
      <div className="flex flex-col items-center justify-center mt-16 gap-4">
        <p className="text-sm font-medium text-[#73816a] dark:text-gray-400">
          Showing 8 of 542 recipes
        </p>
        <div className="w-48 h-1 bg-[#e0e3dd] dark:bg-white/10 rounded-full overflow-hidden">
          <div className="w-1/4 h-full bg-primary rounded-full"></div>
        </div>
        <button className="mt-4 px-8 py-3 bg-white dark:bg-white/5 border border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300">
          Load More Recipes
        </button>
      </div>
    </>
  );
}
