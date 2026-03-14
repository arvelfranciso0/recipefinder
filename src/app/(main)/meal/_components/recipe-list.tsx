"use client";

import {
  ChevronRight,
  RotateCcw,
  SearchX,
  Star,
  TrendingUp,
  X,
} from "lucide-react";

import { CustomSelect } from "@/components/ui/select";
import Pagination, { PaginationSkeleton } from "@/components/shared/pagination";
import Link from "next/link";
import { categoriesData, mealsArea } from "@/libs/data";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { capitalizeFirstLetter, updatePage } from "@/libs/utils";

import { RecipeMealList } from "@/interface/recipe-interface";

import { MealCardSkeleton } from "@/components/shared/mealCardSkeleton";
import Button from "@/components/ui/button";
import { MealListingGrid } from "./meal-listing-grid";
import { useState, useTransition } from "react";
import MealSelectionModal from "@/components/shared/mealSelectModal";
import { useToast } from "@/context/toastContext";

export default function RecipeList({
  totalRecipes,
  recipes,
}: {
  totalRecipes: number;
  recipes: RecipeMealList;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const mealArea = searchParams.get("area") ?? "";
  const page = searchParams.get("page") ?? "1";
  const [isPending, startTransition] = useTransition();
  const handleCategoryChange = (value: string, type: "category" | "area") => {
    const params = new URLSearchParams(window.location.search);

    params.set(type, value);

    params.set("page", "1");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <>
      <nav className="flex items-center gap-2 text-sm  text-muted mb-3">
        <Link className="hover:text-primary transition-colors" href="/home">
          Home
        </Link>
        <ChevronRight />
        <span className="font-medium">Meals</span>
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
      </div>

      {/* Filters Container */}
      {/* Filters Container */}
      <div className="flex flex-col gap-6 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left Side: Selectors */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
            <div className="w-full sm:w-56">
              <CustomSelect
                options={categoriesData}
                defaultValue={capitalizeFirstLetter(category)}
                onSelect={(val) => handleCategoryChange(val, "category")}
              />
            </div>
            <div className="w-full sm:w-56">
              <CustomSelect
                options={mealsArea}
                defaultValue={capitalizeFirstLetter(mealArea)}
                onSelect={(val) => handleCategoryChange(val, "area")}
              />
            </div>
          </div>

          {/* Right Side: Action Button */}
          {(category !== "" || mealArea !== "") && (
            <Button
              onClick={() => router.push(pathname)}
              variant="outline"
              className="group flex items-center gap-2  "
            >
              <RotateCcw
                size={16}
                className="group-hover:-rotate-45 transition-transform"
              />
              <span className="text-sm font-bold tracking-tight">
                Clear Filters
              </span>
            </Button>
          )}
        </div>
      </div>
      {isPending ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <MealCardSkeleton key={i} />
            ))}
          </div>
          <PaginationSkeleton />
        </>
      ) : (
        <>
          {recipes.length > 0 ? (
            <>
              <MealListingGrid recipes={recipes} />

              {/* Pagination/Load More */}
              {totalRecipes > 0 && (
                <Pagination
                  total={totalRecipes}
                  currentList={Math.min(Number(page) * 10, totalRecipes)}
                  handleLoadMore={() =>
                    updatePage(Number(page) + 1, router, pathname)
                  }
                  handlePrevious={() =>
                    updatePage(Number(page) - 1, router, pathname)
                  }
                />
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-white/5 rounded-[3rem] border border-dashed border-muted/30">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <SearchX size={40} strokeWidth={1.5} />
              </div>

              <h3 className="text-2xl font-black text-foreground mb-2">
                No Recipes Found
              </h3>

              {(category || mealArea) && (
                <>
                  <p className="text-muted max-w-xs mb-8 font-medium">
                    We couldn't find any recipes matching your current filters.
                    Try adjusting your category or area.
                  </p>
                  <Button
                    onClick={() => router.push(pathname)}
                    variant="outline"
                    className="flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-white transition-all rounded-2xl px-8"
                  >
                    <RotateCcw size={18} />
                    Clear All Filters
                  </Button>
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
