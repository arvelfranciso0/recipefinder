"use client";

import {
  MealCardInterface,
  RecipeMealInterface,
} from "@/interface/recipe-interface";
import { Heart, MapPin, Utensils } from "lucide-react";
import Link from "next/link";
import FavoriteButton from "./favoriteButton";

export default function MealCard({
  meal,
  id,
  imageURL,
  isFavorite,
  favoriteId,
  area,
  category,
  tags = [],
  handleShowMealModal,
}: MealCardInterface) {
  return (
    <Link href={`/meal/${id}`} className="block group">
      <article className="bg-white dark:bg-white/5 rounded-4xl overflow-hidden soft-shadow transition-all duration-500 border border-slate-100 dark:border-white/5 flex flex-col h-full group-hover:shadow-2xl group-hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url('${imageURL}')` }}
          />

          {/* <FavoriteButton
            id={id}
            meal={meal}
            isFavorite={isFavorite}
            favoriteId={favoriteId}
          /> */}

          <button
            onClick={(e) =>
              handleShowMealModal(e, favoriteId, isFavorite, meal, id)
            }
            className="absolute cursor-pointer  top-3 right-3 bg-white/90 dark:bg-background/90 backdrop-blur-md p-2 rounded-full hover:scale-110 active:scale-90 transition-all shadow-sm z-20"
          >
            <Heart
              className={`w-5 h-5 transition-colors duration-300 ${
                isFavorite
                  ? "text-primary fill-primary hover:fill-transparent"
                  : "text-muted fill-transparent hover:fill-primary hover:text-primary"
              }`}
            />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col gap-1.5">
          {/* Tags */}
          <div className="flex flex-wrap gap-1 min-h-4.5">
            {tags && tags.length > 0 ? (
              tags.slice(0, 2).map((tag, index) => (
                <span
                  key={tag + index}
                  className="text-[9px] font-black uppercase tracking-tight bg-primary/10 text-primary px-2 py-0.5 rounded-md"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-[9px] font-bold uppercase tracking-tight text-muted/30 border border-muted/10 px-2 py-0.5 rounded-md">
                Recipe
              </span>
            )}
          </div>

          {/* Title */}
          <h4 className="text-lg font-black text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-1">
            {meal}
          </h4>

          {/* Bottom Info Row */}
          <div className="flex items-center justify-between mt-1 pt-2 border-t border-slate-50 dark:border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[11px] font-bold text-muted">
                <MapPin size={12} className="text-primary shrink-0" />
                <span className="truncate max-w-17.5">{area}</span>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-bold text-muted">
                <Utensils size={11} className="text-primary shrink-0" />
                <span className="truncate max-w-17.5">{category}</span>
              </div>
            </div>

            {/* Minimal Visual Indicator (Optional) */}
            <div className="w-6 h-6 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary transition-colors">
              <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-primary group-hover:border-white rotate-45 -ml-px" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
