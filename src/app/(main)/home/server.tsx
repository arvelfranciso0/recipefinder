import { db } from "@/db";
import {
  RecipeMealInterface,
  RecipeMealList,
} from "@/interface/recipe-interface";
import { mapMeals } from "@/libs/utils";
import { FavoriteRepository } from "@/repository/favorite";
import { AuthService } from "@/services/auth.service";
import { TheMealDbApiService } from "@/services/meal.service";

interface CachedMeal {
  meal: RecipeMealList;
  date: string; // YYYY-MM-DD
}

export async function getFeaturedMeals(): Promise<RecipeMealList> {
  const today = new Date().toISOString().split("T")[0];
  const favoriteRepository = new FavoriteRepository(db);
  const authUser = new AuthService();

  try {
    // Fetch a list of meals
    const resultMealByArea = await TheMealDbApiService.filterByArea("American");
    if (!resultMealByArea.length) {
      return []; // return empty array for server component
    }

    const limitedMeals = resultMealByArea.slice(0, 3);
    const mealsId = limitedMeals.map((meal) => meal.idMeal);

    const recipes = await TheMealDbApiService.listAllRecipe(mealsId);

    const user = await authUser.getAuthenticatedUser();

    const allRecipeByUserId = await favoriteRepository.getAllFavoritesByUserId(
      user?.id as number,
    );

    const recipesWithFavorite = recipes.map((meal: RecipeMealInterface) => {
      const favorite = allRecipeByUserId.find((fav) => fav.mealId === meal.id);

      return {
        ...meal,
        isFavorite: !!favorite,
        favoriteId: favorite?.id as number,
      };
    });

    return recipesWithFavorite;
  } catch (error) {
    console.error("Error fetching featured meal:", error);
    return [];
  }
}
