import { db } from "@/db";
import { FavoriteRepository } from "@/repository/favorite";
import { AuthService } from "@/services/auth.service";
import { TheMealDbApiService } from "@/services/meal.service";
import {
  ApiMeal,
  RecipeMealInterface,
  RecipeMealList,
} from "@/interface/recipe-interface";

interface GetRecipesParams {
  category?: string;
  area?: string;
  page?: number;
  limit?: number;
}

export async function getRecipes({
  category = "",
  area = "",
  page = 1,
  limit = 10,
}: GetRecipesParams) {
  const offset = (page - 1) * limit;

  const favoriteRepository = new FavoriteRepository(db);
  const authUser = new AuthService();

  let mealsByCategory: ApiMeal[] = [];
  let mealsByArea: ApiMeal[] = [];
  let mealCategoryIds: string[] = [];
  let mealAreaIds: string[] = [];
  let combinedIds: string[] = [];

  if (!category && !area) {
    category = "Beef";
  }

  if (category) {
    mealsByCategory = await TheMealDbApiService.filterByCategory(category);
    mealCategoryIds = mealsByCategory.map((meal) => meal.idMeal);
  }

  if (area) {
    mealsByArea = await TheMealDbApiService.filterByArea(area);
    mealAreaIds = mealsByArea.map((meal) => meal.idMeal);
  }

  let paginatedIds: string[] = [];

  if (category && area) {
    combinedIds = mealCategoryIds.filter((id) => mealAreaIds.includes(id));
    paginatedIds = combinedIds.slice(offset, offset + limit);
  } else if (category) {
    paginatedIds = mealCategoryIds.slice(offset, offset + limit);
  } else {
    paginatedIds = mealAreaIds.slice(offset, offset + limit);
  }

  const recipes = await TheMealDbApiService.listAllRecipe(paginatedIds);

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

  const totalRecipes =
    category && area
      ? combinedIds.length
      : category
        ? mealCategoryIds.length
        : mealAreaIds.length;

  return {
    recipes: recipesWithFavorite,
    totalRecipes,
  };
}
