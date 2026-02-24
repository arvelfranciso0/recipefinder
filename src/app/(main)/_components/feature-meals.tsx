"use client";

import { RecipeMealList } from "@/interface/recipe-interface";
import { MealListingGrid } from "../meal/_components/meal-listing-grid";

export default function FeaturedMeals({
  featureMeals,
}: {
  featureMeals: RecipeMealList;
}) {
  return (
    <section className="py-12">
      <div className="flex items-end justify-between px-2 mb-8">
        <div>
          <h3 className="text-2xl font-bold text-foreground ">
            Featured Meals
          </h3>
          <p className="text-muted ">Hand-picked by our culinary editors</p>
        </div>
      </div>

      <MealListingGrid recipes={featureMeals} />
    </section>
  );
}
