"use client";

import { Recipe } from "@/types/recipe-types";
import { Heart, Clock, BarChart2, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function MealCard({
  title,
  time,
  difficulty,
  tag,
  tagColor,
  image,
  id,
  rating,
  isFavorite,
}: Recipe) {
  return (
    <article className="bg-white dark:bg-white/5 rounded-3xl overflow-hidden soft-shadow group hover:shadow-xl transition-all duration-300 border border-transparent dark:border-white/5">
      <div className="relative h-64 w-full overflow-hidden">
        {/* Image Background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url('${image}')` }}
        />

        {/* Favorite Button */}
        <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-foreground hover:text-red-500 transition-colors">
          <Heart
            className={`w-5 h-5 transition-colors duration-300 ${
              isFavorite
                ? "text-primary fill-primary"
                : "text-muted fill-transparent"
            }`}
          />
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-xs font-semibold text-muted dark:text-gray-400 mb-2">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {time}
          </span>
          <span className="flex items-center gap-1">
            <BarChart2 className="w-4 h-4" /> {difficulty}
          </span>
        </div>

        <h4 className="text-xl font-bold text-foreground  group-hover:text-primary transition-colors">
          {title}
        </h4>

        <div className="mt-6 flex items-center justify-between">
          {/* Tag */}
          <span
            className={`bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold ${tagColor}`}
          >
            {tag}
          </span>

          <div className="mt-auto flex items-center justify-between gap-3">
            <Link
              href={`/recipe/${id}`}
              className="text-sm font-bold text-primary flex items-center gap-1 group/btn"
            >
              View Recipe
              <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
