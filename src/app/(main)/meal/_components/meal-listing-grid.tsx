import MealCard from "@/components/shared/mealCard";
import {
  RecipeMealInterface,
  RecipeMealList,
} from "@/interface/recipe-interface";

export const MealListingGrid = ({ recipes }: { recipes: RecipeMealList }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recipes.map((recipe: RecipeMealInterface) => (
        <MealCard {...recipe} key={recipe.id} />
      ))}
    </div>
  );
};
