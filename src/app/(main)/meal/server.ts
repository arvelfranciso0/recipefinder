import { db } from "@/db";
import { FavoriteRepository } from "@/repository/favorite";
import { AuthService } from "@/services/auth.service";
import { TheMealDbApiService } from "@/services/meal.service";
import {
  ApiMeal,
  IngredientApiResponse,
  MealWithFavoriteInterface,
  RecipeMealInterface,
  RecipeMealList,
} from "@/interface/recipe-interface";
import {
  convertIngredientsToArray,
  filterRecipesByIngredient,
  getAllMealIds,
  getAllMealsByArea,
  getAllMealsByCategory,
  getPaginatedIds,
  mapMealDetail,
  mealWithFavoriteToDTO,
  resolveMealIds,
} from "@/libs/utils";
import { MealRepository } from "@/repository/meal";

interface GetRecipesParams {
  category?: string;
  area?: string;
  page?: number;
  limit?: number;
  ingredient?: string;
}

export async function getRecipes({
  category = "",
  area = "",
  page = 1,
  limit = 10,
  ingredient = "",
}: GetRecipesParams) {
  try {
    const mealRepository = new MealRepository(db);
    const autUser = new AuthService();
    const user = await autUser.getAuthenticatedUser();
    const offset = (page - 1) * limit;
    const count = await mealRepository.countMealsWithFavoritesByUser(
      user?.id as number,
      category,
      area,
      ingredient,
    );
    const mealWithFavorites = await mealRepository.getMealWithFavoritesByUser(
      user?.id as number,
      limit,
      offset,
      category,
      area,
      ingredient,
    );

    const result: RecipeMealList = mealWithFavorites.map(
      (value: MealWithFavoriteInterface) => {
        return mealWithFavoriteToDTO(value);
      },
    );

    return { recipes: result, totalRecipes: count };
  } catch (error) {
    console.log("Error", error);
    return {
      recipes: [],
      totalRecipes: 0,
    };
  }
}
