import MealCard from "@/components/shared/mealCard";
import { useToast } from "@/context/toastContext";
import {
  RecipeMealInterface,
  RecipeMealList,
} from "@/interface/recipe-interface";

import { useTransition } from "react";
import { toggleFavorite } from "../action";

export const MealListingGrid = ({ recipes }: { recipes: RecipeMealList }) => {
  const toast = useToast();
  const [isPending, startTransition] = useTransition();

  const handleFavorite = (
    mealId: number,
    e: React.MouseEvent,
    isFavorite: boolean,
    mealName: string,
    id: number | null,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    startTransition(() => {
      toggleFavorite(mealId, isFavorite, id as number).then((value: void) => {
        const message = isFavorite
          ? `${mealName} removed from favorites`
          : `${mealName} added to favorites`;
        toast(message, "success");
      });
    });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recipes.map((recipe: RecipeMealInterface) => (
        <MealCard
          {...recipe}
          key={recipe.id}
          handleFavorite={(e: React.MouseEvent) =>
            !isPending &&
            handleFavorite(
              recipe.id,
              e,
              recipe.isFavorite,
              recipe.meal,
              recipe.favoriteId,
            )
          }
          isPending={isPending}
        />
      ))}
    </div>
  );
};
