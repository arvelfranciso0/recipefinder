"use client";

import CategoryItem from "@/components/shared/catergoryItem";
import {
  ArrowRight,
  Cake,
  Coffee,
  Egg,
  Fish,
  Leaf,
  Soup,
  UtensilsCrossed,
  Wheat,
} from "lucide-react";
import Link from "next/link";

export default function Categories() {
  return (
    <section className="py-12">
      <div className="flex items-end justify-between px-2 mb-8">
        <div>
          <h3 className="text-2xl font-bold text-charcoal dark:text-white">
            Browse Categories
          </h3>
          <p className="text-muted dark:text-gray-400">
            Explore by meal type or cuisine
          </p>
        </div>
        <Link
          href="/recipe"
          className="text-primary font-bold text-sm flex items-center gap-1 group"
        >
          View All{" "}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-2 px-2">
        <CategoryItem
          label="Seafood"
          icon={Fish}
          bgClass="bg-accent-peach/20"
          colorClass="text-accent-peach"
        />
        <CategoryItem
          label="Dessert"
          icon={Cake}
          bgClass="bg-primary/10"
          colorClass="text-primary"
        />
        <CategoryItem
          label="Vegetarian"
          icon={Leaf}
          bgClass="bg-orange-100 dark:bg-orange-900/20"
          colorClass="text-orange-400"
        />
        <CategoryItem
          label="Beef"
          icon={UtensilsCrossed}
          bgClass="bg-red-100 dark:bg-red-900/20"
          colorClass="text-red-400"
        />
        <CategoryItem
          label="Chicken"
          icon={Egg}
          bgClass="bg-yellow-100 dark:bg-yellow-900/20"
          colorClass="text-yellow-500"
        />
        <CategoryItem
          label="Pasta"
          icon={Wheat}
          bgClass="bg-blue-100 dark:bg-blue-900/20"
          colorClass="text-blue-400"
        />
        <CategoryItem
          label="Breakfast"
          icon={Coffee}
          bgClass="bg-purple-100 dark:bg-purple-900/20"
          colorClass="text-purple-400"
        />
        <CategoryItem
          label="Soup"
          icon={Soup}
          bgClass="bg-green-100 dark:bg-green-900/20"
          colorClass="text-green-400"
        />
      </div>
    </section>
  );
}
