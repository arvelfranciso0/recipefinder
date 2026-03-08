import { db } from "@/db";
import {
  FeatureMealInterface,
  MealWithFavoriteInterface,
  RecipeMealInterface,
  RecipeMealList,
} from "@/interface/recipe-interface";
import { convertIngredientsToArray } from "@/libs/utils";

import { FavoriteRepository } from "@/repository/favorite";
import { MealRepository } from "@/repository/meal";
import { AuthService } from "@/services/auth.service";
import { TheMealDbApiService } from "@/services/meal.service";

export async function getFeaturedMeals(): Promise<RecipeMealList> {
  // const today = new Date().toISOString().split("T")[0];
  const mealRepository = new MealRepository(db);
  const authUser = new AuthService();

  try {
    const user = await authUser.getAuthenticatedUser();
    const featureMeal = await mealRepository.getFeaturedMeals(
      user?.id as number,
    );

    const result: RecipeMealList = featureMeal.map(
      (value: FeatureMealInterface) => {
        const mapResultRecipeDetails = convertIngredientsToArray(value);

        return {
          id: value.id as number,
          meal: value.name ?? "",
          imageURL: value.thumbnail ?? "",
          area: value.area ?? "",
          tags: value.tags?.split(",") ?? [],
          isFavorite: value.favoriteId !== null,
          favoriteId: value.favoriteId ?? null,
          category: value.category ?? "",
          ingredients: mapResultRecipeDetails,
        };
      },
    );

    return result;
  } catch (error) {
    console.error("Error fetching featured meal:", error);
    return [];
  }
}
