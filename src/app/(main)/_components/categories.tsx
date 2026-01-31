"use client";

import CategoryItem from "@/components/shared/catergoryItem";
import { categories } from "@/libs/data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Categories() {
  return (
    <section className="py-12">
      <div className="flex items-end justify-between px-2 mb-8">
        <div>
          <h3 className="text-2xl font-bold text-foreground ">
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
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            label={category.label}
            icon={category.icon}
            bgClass={category.bgClass}
            colorClass={category.colorClass}
          />
        ))}
      </div>
    </section>
  );
}
