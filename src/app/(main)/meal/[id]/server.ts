import { db } from "@/db";
import {
  IngredientItem,
  RecipeMealDetailsInterface,
} from "@/interface/recipe-interface";
import {
  convertIngredientsToArray,
  convertMeasurementToArray,
  parseInstructions,
} from "@/libs/utils";
import { MealRepository } from "@/repository/meal";
import { AuthService } from "@/services/auth.service";

export async function getRecipeByMealId(
  mealId: number,
): Promise<RecipeMealDetailsInterface | null> {
  try {
    const mealRepository = new MealRepository(db);
    const autUser = new AuthService();
    const user = await autUser.getAuthenticatedUser();
    const mealWithFavorite = await mealRepository.getMealById(
      mealId,
      user?.id as number,
    );

    if (!mealWithFavorite) {
      return null;
    } else {
      const mapInggredientsResult = convertIngredientsToArray(mealWithFavorite);
      const parsedMeasurements = convertMeasurementToArray(mealWithFavorite);

      const ingredientAndMeasurmentItems: IngredientItem[] =
        mapInggredientsResult.map((ingredient, index) => {
          const measurement = parsedMeasurements[index] || "";
          return {
            ingredient,
            measure: measurement,
          };
        });

      const {
        id,
        name,
        category,
        area,
        instructions,
        thumbnail,
        youtube,
        favoriteId,
        source,
      } = mealWithFavorite;
      const parsedInstructions = parseInstructions(instructions as string);

      return {
        id: id as number,
        name: name as string,
        category: category ?? "",
        area: area ?? "",
        instructions: parsedInstructions,
        image: thumbnail ?? "",
        youtube: youtube ?? "",
        source: source as string | null,
        favoriteId,
        tags: mealWithFavorite.tags ? mealWithFavorite.tags.split(",") : [],
        ingredients: ingredientAndMeasurmentItems,
      };
    }
  } catch (error) {
    console.error("Error fetching recipe by meal ID:", error);
    return null;
  }
}
