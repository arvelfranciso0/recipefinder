import MealCard from "@/components/shared/mealCard";
import MealSelectionModal from "@/components/shared/mealSelectModal";
import { useToast } from "@/context/toastContext";
import {
  RecipeMealInterface,
  RecipeMealList,
} from "@/interface/recipe-interface";
import { useState, useTransition } from "react";
import { toggleFavorite } from "../action";
import { set } from "zod";

export const MealListingGrid = ({ recipes }: { recipes: RecipeMealList }) => {
  const [selectionModalOpen, setSelectionModalOpen] = useState(false);
  const toast = useToast();
  const [isPending, startTransition] = useTransition();
  const [favoriteData, setFavoriteData] = useState<{
    favoriteId: number;
    isFavorite: boolean;
    mealName: string;
    mealId: number;
  }>({ favoriteId: 0, isFavorite: false, mealName: "", mealId: 0 });

  const handleShowMealModal = async (
    e: React.MouseEvent,
    favoriteId: number | null,
    isFavorite?: boolean,
    mealName?: string,
    mealId?: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setSelectionModalOpen(true);
    setFavoriteData({
      favoriteId: favoriteId as number,
      mealId: mealId as number,
      isFavorite: isFavorite as boolean,
      mealName: mealName as string,
    });
  };

  return (
    <>
      <MealSelectionModal
        isOpen={selectionModalOpen}
        onClose={() => setSelectionModalOpen(false)}
        favoriteId={favoriteData.favoriteId}
        isFavorite={favoriteData.isFavorite}
        mealName={favoriteData.mealName}
        mealId={favoriteData.mealId}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe: RecipeMealInterface) => (
          <MealCard
            {...recipe}
            key={recipe.id}
            handleShowMealModal={handleShowMealModal}
          />
        ))}
      </div>
    </>
  );
};
