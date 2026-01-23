"use client";

import Button from "@/components/ui/button";
import { InputField } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="px-4 py-12 md:py-24 flex flex-col items-center text-center">
      <div className="max-w-3xl w-full space-y-6">
        {/* Badge */}
        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-full">
          Fresh & Healthy Recipes
        </span>

        {/* Hero Text */}
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black leading-[1.1] text-foreground tracking-tight">
          Find your next <span className="text-primary italic">favorite</span>{" "}
          meal.
        </h2>

        {/* Description */}
        <p className="text-muted dark:text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
          Discover thousands of recipes from around the world using the
          ingredients you already have in your kitchen.
        </p>

        {/* Main Search Container */}
        <div className="mt-8 md:mt-10 w-full max-w-2xl mx-auto p-2 bg-white dark:bg-white/5 rounded-2xl soft-shadow border border-gray-100 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex-1">
            <InputField
              placeholder="Search ingredients..."
              className="w-full border-none bg-transparent focus:ring-0" // Clean up internal borders
              icon={Search}
            />
          </div>
          <Button className="w-full sm:w-auto px-8 py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 text-base font-semibold">
            Search
          </Button>
        </div>

        {/* Trending Tags */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 pt-4">
          <span className="text-[10px] md:text-xs font-bold text-muted/60 uppercase w-full md:w-auto mb-1 md:mb-0">
            Trending:
          </span>
          {["#Vegan", "#Pasta", "#KetoFriendly"].map((tag) => (
            <Link
              key={tag}
              href="#"
              className="bg-white dark:bg-white/5 px-4 py-2 rounded-full text-xs font-semibold text-foreground border border-gray-100 dark:border-white/10 hover:border-primary hover:text-primary transition-all whitespace-nowrap"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
