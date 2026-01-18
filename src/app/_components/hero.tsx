"use client";

import { Search } from "lucide-react";
import Button from "../../components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-12 md:py-20 flex flex-col items-center text-center">
      <div className="max-w-3xl space-y-6">
        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
          Fresh & Healthy Recipes
        </span>
        <h2 className="text-4xl md:text-6xl font-black leading-tight text-charcoal dark:text-white">
          Find your next <span className="text-primary italic">favorite</span>{" "}
          meal.
        </h2>
        <p className="text-muted dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          Discover thousands of recipes from around the world using the
          ingredients you already have in your kitchen.
        </p>

        {/* Main Search */}
        <div className="mt-10 w-full max-w-2xl mx-auto p-2 bg-white dark:bg-white/5 rounded-2xl soft-shadow flex items-center border border-gray-100 dark:border-white/10">
          <div className="flex-1 flex items-center px-4 gap-3">
            <Search className="text-primary w-6 h-6" />
            <input
              type="text"
              className="w-full bg-transparent border-none focus:ring-0 py-3 text-charcoal dark:text-white placeholder:text-muted/50 outline-none text-lg"
              placeholder="Search by ingredient, meal, or nationality..."
            />
          </div>
          <Button className="px-8 py-3.5 rounded-xl shadow-lg flex items-center gap-2 text-base">
            Search
          </Button>
        </div>

        {/* Trending Tags */}
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <span className="text-xs font-bold text-muted/60 uppercase py-2">
            Trending:
          </span>
          {["#Vegan", "#Pasta", "#KetoFriendly"].map((tag) => (
            <Link
              key={tag}
              href="#"
              className="bg-white dark:bg-white/5 px-3 py-1.5 rounded-full text-xs font-semibold text-charcoal dark:text-gray-300 border border-gray-100 dark:border-white/10 hover:border-primary transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
