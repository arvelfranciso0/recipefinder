import { verifyPasswordHashInterface } from "@/interface/data-interface";
import { Schema } from "@/types/form-types";
import { Url } from "next/dist/shared/lib/router/router";
import crypto from "crypto";
import {
  ApiMeal,
  ApiMealDetailInterface,
  IngredientItem,
  MealWithFavoriteInterface,
  RecipeMealDetailsInterface,
  RecipeMealInterface,
  RecipeMealList,
} from "@/interface/recipe-interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { TheMealDbApiService } from "@/services/meal.service";
import { categoriesData, mealsArea } from "./data";
import { IngredientKeys, MeasureKeys } from "@/types/recipe-types";

export const getActiveClass = (pathname: string, path: Url): boolean => {
  return pathname === path;
};

export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function verifyPasswordHash(
  data: verifyPasswordHashInterface,
): Promise<boolean> {
  const hash = await generateHashPassword(data.inputPassword, data.salt);

  return crypto.timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(data.hashPassword, "hex"),
  );
}

export async function generateHashPassword(
  password: string,
  salt: string,
): Promise<string> {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}

export async function generateSessionToken(): Promise<string> {
  return crypto.randomBytes(32).toString("hex");
}

export async function generateIdToken(): Promise<string> {
  return crypto.randomUUID().replace(/-/g, "");
}

export async function generateCryptoHash(token: string): Promise<string> {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function genereteSixRandomCode(): Promise<string> {
  return crypto.randomInt(100000, 1000000).toString();
}

export async function generateSalt(): Promise<string> {
  return crypto.randomBytes(16).toString("hex");
}

export async function generateHash(
  prefix: string,
  token: string,
  salt: string,
): Promise<string> {
  return crypto
    .pbkdf2Sync(`${prefix} ${token}`, salt, 1000, 64, "sha256")
    .toString("hex");
}

export async function verifyHash(
  prefix: string,
  original: string,
  originalHash: string,
  salt: string,
): Promise<boolean> {
  const hash = await generateHash(prefix, original, salt);
  return crypto.timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(originalHash, "hex"),
  );
}

export function convertIngredientsToArray(meal: MealWithFavoriteInterface) {
  const ingredients: string[] = [];
  const ingredientKeys: IngredientKeys[] = [
    "ingredient1",
    "ingredient2",
    "ingredient3",
    "ingredient4",
    "ingredient5",
    "ingredient6",
    "ingredient7",
    "ingredient8",
    "ingredient9",
    "ingredient10",
    "ingredient11",
    "ingredient12",
    "ingredient13",
    "ingredient14",
    "ingredient15",
    "ingredient16",
    "ingredient17",
    "ingredient18",
    "ingredient19",
    "ingredient20",
  ];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[ingredientKeys[i]];

    if (ingredient && ingredient !== "") {
      ingredients.push(ingredient);
    }
  }

  return ingredients;
}
export function convertMeasurementToArray(meal: MealWithFavoriteInterface) {
  const measurements: string[] = [];

  const measureKeys: MeasureKeys[] = [
    "measure1",
    "measure2",
    "measure3",
    "measure4",
    "measure5",
    "measure6",
    "measure7",
    "measure8",
    "measure9",
    "measure10",
    "measure11",
    "measure12",
    "measure13",
    "measure14",
    "measure15",
    "measure16",
    "measure17",
    "measure18",
    "measure19",
    "measure20",
  ];

  for (let i = 1; i <= 20; i++) {
    const measure = meal[measureKeys[i]];

    if (measure && measure !== "") {
      measurements.push(measure);
    }
  }

  return measurements;
}

export async function mapMealDetail(
  meal: ApiMealDetailInterface,
): Promise<RecipeMealDetailsInterface> {
  const ingredients: IngredientItem[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();

    if (ingredient && ingredient !== "") {
      ingredients.push({
        ingredient,
        measure: measure ?? "",
      });
    }
  }

  const instructions = parseInstructions(meal.strInstructions);

  const data = {
    id: Number(meal.idMeal),
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: instructions,
    image: meal.strMealThumb,
    youtube: meal.strYoutube,
    source: meal.strSource,
    ingredients,
    tags: meal.strTags?.split(","),
    favoriteId: null,
  };

  return data;
}

export const getYoutubeEmbedUrl = (url: string | null) => {
  if (!url) return null;

  const videoId = new URL(url).searchParams.get("v");

  if (!videoId) return null;

  return `https://www.youtube.com/embed/${videoId}`;
};

export const parseInstructions = (text: string | null): string[] => {
  if (!text) return [];

  const cleaned = text.replace(/\r/g, "");

  // If numbered steps exist
  if (/^\d+\./m.test(cleaned)) {
    return cleaned
      .split("\n")
      .map((step) => step.trim())
      .filter(Boolean)
      .map((step) => step.replace(/^\d+\.\s*/, ""));
  }

  // Otherwise split by sentence
  return cleaned
    .replace(/\n/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((step) => step.trim())
    .filter(Boolean);
};

export const updatePage = (
  newPage: number,
  router: AppRouterInstance,
  pathname: string,
) => {
  const params = new URLSearchParams(window.location.search);
  params.set("page", String(newPage));
  router.push(`${pathname}?${params.toString()}`);
};

export const resolveMealIds = (
  category: string,
  area: string,
  mealCategoryIds: string[],
  mealAreaIds: string[],
): string[] => {
  if (category && area) {
    return mealCategoryIds.filter((id) => mealAreaIds.includes(id));
  }

  if (category) return mealCategoryIds;

  return mealAreaIds;
};
export const getPaginatedIds = (
  ids: string[],
  offset: number,
  limit: number,
): string[] => {
  return ids.slice(offset, offset + limit);
};

export const filterRecipesByIngredient = (
  recipes: RecipeMealList,
  ingredient: string,
): RecipeMealList => {
  if (!ingredient) return recipes;

  const lowerIngredient = ingredient.toLowerCase();

  return recipes.filter((recipe) =>
    recipe.ingredients.some((ingredientItem) =>
      ingredientItem.toLowerCase().startsWith(lowerIngredient),
    ),
  );
};

export const getAllMealsByCategory = async (): Promise<string[]> => {
  const results = await Promise.all(
    categoriesData.map(async (category) => {
      const meals = await TheMealDbApiService.filterByCategory(category.label);
      return meals.map((meal) => meal.idMeal);
    }),
  );

  return [...new Set(results.flat())];
};

export const getAllMealsByArea = async (): Promise<string[]> => {
  const results = await Promise.all(
    mealsArea.map(async (area) => {
      const meals = (await TheMealDbApiService.filterByArea(area.label)) ?? [];

      return meals.map((meal) => meal.idMeal);
    }),
  );

  return [...new Set(results.flat())];
};

export const getAllMealIds = async (
  category: string,
  area: string,
): Promise<string[]> => {
  let mealsByCategory: ApiMeal[] = [];
  let mealsByArea: ApiMeal[] = [];
  let mealCategoryIds: string[] = [];
  let mealAreaIds: string[] = [];
  if (!category && !area) {
    return await getAllMealsByCategory();
  }

  if (category) {
    mealsByCategory = await TheMealDbApiService.filterByCategory(category);
    mealCategoryIds = mealsByCategory.map((meal) => meal.idMeal);
  }

  if (area) {
    mealsByArea = await TheMealDbApiService.filterByArea(area);
    mealAreaIds = mealsByArea.map((meal) => meal.idMeal);
  }

  return resolveMealIds(category, area, mealCategoryIds, mealAreaIds);
};

export const mealWithFavoriteToDTO = (
  meal: MealWithFavoriteInterface,
): RecipeMealInterface => {
  const mapResultRecipeDetails = convertIngredientsToArray(meal);
  return {
    id: meal.id as number,
    meal: meal.name ?? "",
    imageURL: meal.thumbnail ?? "",
    area: meal.area ?? "",
    tags: meal.tags?.split(",") ?? [],
    isFavorite: meal.favoriteId !== null,
    favoriteId: meal.favoriteId ?? null,
    category: meal.category ?? "",
    ingredients: mapResultRecipeDetails,
  };
};
