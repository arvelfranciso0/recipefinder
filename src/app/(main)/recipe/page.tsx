"use client";

import { ChevronRight, Star, TrendingUp, X } from "lucide-react";
import { MealListingGrid } from "./_components/meal-listing-grid";
import { CustomSelect } from "@/components/ui/select";
import { BaseDropdown } from "@/components/ui/dropdown";
import { useState } from "react";
import Pagination from "@/components/shared/pagination";
import Link from "next/link";

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
      <nav className="flex items-center gap-2 text-sm  text-muted mb-3">
        <Link className="hover:text-primary transition-colors" href="/">
          Home
        </Link>
        <ChevronRight />
        <span className="font-medium">Recipes</span>
      </nav>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="max-w-2xl">
          {/* Responsive Typography: 3xl on mobile, 5xl on large screens */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 text-foreground leading-[1.1]">
            Discover <span className="text-primary">Daily Fresh</span> Recipes
          </h1>
          <p className="text-muted dark:text-muted/80 text-base md:text-lg leading-relaxed">
            Browse through 5,000+ hand-picked recipes from professional chefs
            and home cooks worldwide.
          </p>
        </div>

        {/* Full width on mobile, auto width on desktop */}
        <div className="w-full md:w-auto">
          <BaseDropdown
            labelPrefix="Sort:"
            selectedValue={sortBy}
            onChange={setSortBy}
            // Ensure your BaseDropdown component handles 'w-full' internally
            className="w-full md:w-50"
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
      </div>

      {/* Filters Container */}
      <div className="flex flex-col gap-6 mb-10">
        {/* Stack select and tags on mobile, row on tablet+ */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-full sm:w-auto">
            <CustomSelect
              options={categories}
              onSelect={(val) => console.log("Selected:", val)}
            />
          </div>

          {/* Tags area: Flex-wrap is key here */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Active Filter Chip */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl shadow-md shadow-primary/20 text-sm font-bold whitespace-nowrap">
              <span>Italian</span>
              <X className="w-4 h-4 cursor-pointer hover:opacity-80" />
            </div>

            {/* Suggestion Chip */}
            <button className="px-4 py-2.5 bg-background text-foreground border border-gray-200 dark:border-white/10 shadow-sm rounded-xl text-sm font-semibold hover:bg-muted/50 transition-colors whitespace-nowrap">
              Lunch
            </button>

            {/* Action Link */}
            <button className="px-2 py-2.5 text-primary text-sm font-bold hover:underline active:opacity-70 transition-all">
              Clear all
            </button>
          </div>
        </div>
      </div>

      {/* The Component You Requested */}
      <MealListingGrid />

      {/* Pagination/Load More */}
      <Pagination />
    </>
  );
}
