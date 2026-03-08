"use client";

import { useState, useRef, useEffect, useTransition, useMemo } from "react";
import { Search, Utensils, ArrowUpRight, Loader2, History } from "lucide-react";
import Button from "@/components/ui/button";
import { InputField } from "@/components/ui/input";
import { IngredientInterface } from "@/interface/recipe-interface";
import { getIngredients } from "./action";
import { useRouter } from "next/navigation";

export default function SearchWithSuggestions() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<IngredientInterface[]>([]);
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);

  // Close on Click Outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const getIngredientsData = async () => {
      const ingredients = await getIngredients();
      setResults(ingredients ?? []);
    };

    getIngredientsData();
  }, []);

  const filteredResults = useMemo(() => {
    return results.filter((meal) =>
      meal.ingredientName.toLowerCase().startsWith(query.toLowerCase()),
    );
    // .slice(0, 6);
  }, [results, query]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-2xl mx-auto mt-8 md:mt-10"
    >
      {/* Search Bar Group */}
      <div className="group p-1.5  bg-white dark:bg-white/5 rounded-2xl border border-muted/20 dark:border-muted/10 flex items-center relative z-50 shadow-sm transition-all focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/5">
        <div className="flex-1">
          <InputField
            id="search"
            value={query}
            autoComplete="off"
            onChange={(e) => {
              const value = e.target.value;
              setQuery(value);
              setIsOpen(value.length > 0);
            }}
            onFocus={() => query.length > 0 && setIsOpen(true)}
            placeholder="Search ingredients..."
            className="w-full border-none bg-transparent outline-none ring-0 focus:ring-0 focus-visible:ring-0 shadow-none text-foreground placeholder:text-muted/50 font-medium pl-4 pr-10"
            icon={Search}
          />
        </div>
        <Button
          disabled={query.length === 0}
          onClick={() => router.push(`meal?ingredient=${query}`)}
          className="hidden sm:flex ml-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all items-center justify-center gap-2 text-sm font-bold shadow-md"
        >
          Search
        </Button>
      </div>

      <div className="sm:hidden mt-2">
        <Button className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold">
          VSiew
        </Button>
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-background border border-muted/20 dark:border-muted/10 rounded-2xl shadow-2xl overflow-hidden z-40 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2 min-h-20 max-h-96 overflow-y-auto ">
            <header className="px-3 py-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted/60">
                {results.length === 0
                  ? "Looking for ingredients..."
                  : "Suggestions"}
              </span>
            </header>

            <div className="flex flex-col gap-0.5">
              {results.length === 0 ? (
                [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-3 animate-pulse"
                  >
                    <div className="size-8 bg-muted/10 rounded-lg" />
                    <div className="h-4 w-32 bg-muted/10 rounded" />
                  </div>
                ))
              ) : filteredResults.length > 0 ? (
                filteredResults.map((meal) => (
                  <button
                    key={meal.id}
                    type="button"
                    onClick={() => {
                      setQuery(meal.ingredientName);
                      setIsOpen(false);
                    }}
                    className="flex cursor-pointer items-center justify-between px-3 py-2.5 hover:bg-primary/5 dark:hover:bg-primary/10 rounded-xl transition-all group text-left outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-9 bg-muted/5 rounded-lg flex items-center justify-center text-muted group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                        <Utensils size={18} />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors block">
                          {meal.ingredientName}
                        </span>
                        <span className="text-[10px] text-muted font-medium uppercase tracking-tight">
                          Recipe Match
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="text-muted/30 group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                ))
              ) : (
                <div className="px-3 py-8 text-center">
                  <p className="text-sm text-muted font-bold">
                    No recipes found for "{query}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Shortcut hint */}
          <div className="bg-muted/5 px-4 py-2.5 border-t border-muted/10">
            <p className="text-[10px] text-muted/50 font-bold uppercase">
              Press Enter to search
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
