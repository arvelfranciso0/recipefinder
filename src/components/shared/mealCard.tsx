"use client";

import { Heart, Clock, BarChart2, ChevronRight, Star } from "lucide-react";
import Link from "next/link";

interface MetaCardProps {
  title: string;
  time: string;
  difficulty: string;
  tag: string;
  tagColor: string;
  image: string;
  id: number;
  rating: string;
}

export default function MealCard({
  title,
  time,
  difficulty,
  tag,
  tagColor,
  image,
  id,
  rating,
}: any) {
  return (
    <article className="bg-white dark:bg-white/5 rounded-3xl overflow-hidden soft-shadow group hover:shadow-xl transition-all duration-300 border border-transparent dark:border-white/5">
      <div className="relative h-64 w-full overflow-hidden">
        {/* Image Background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url('${image}')` }}
        />

        {/* Tag */}
        <div className="absolute top-4 left-4">
          <span
            className={`bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold ${tagColor}`}
          >
            {tag}
          </span>
        </div>

        {/* Favorite Button */}
        <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-charcoal hover:text-red-500 transition-colors">
          <Heart className="w-5 h-5" />
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

        <h4 className="text-xl font-bold text-charcoal dark:text-white group-hover:text-primary transition-colors">
          {title}
        </h4>

        <div className="mt-6 flex items-center justify-between">
          {/* Stars Stack */}
          {rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-bold dark:text-gray-200">
                {rating}
              </span>
            </div>
          )}

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
