"use server";

import {
  ApiMeal,
  IngredientApiResponse,
  IngredientInterface,
  RecipeInterface,
} from "@/interface/recipe-interface";
import { TheMealDbApiService } from "@/services/meal.service";

export async function getMealByName(
  mealName: string,
): Promise<RecipeInterface[] | []> {
  if (!mealName) return [];

  const firstLetter = mealName[0].toLowerCase();
  const result = (
    await TheMealDbApiService.searchByFirstLetter(firstLetter)
  ).map((meal: ApiMeal) => ({
    id: meal.idMeal,
    meal: meal.strMeal,
  }));

  return result;
}

export async function getIngredients(): Promise<IngredientInterface[]> {
  const result = (await TheMealDbApiService.listIngredients()).map(
    (ingredient: IngredientApiResponse) => ({
      id: ingredient.idIngredient,
      ingredientName: ingredient.strIngredient,
    }),
  );

  return result;
}
