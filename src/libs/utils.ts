import { verifyPasswordHashInterface } from "@/interface/data-interface";
import { Schema } from "@/types/form-types";
import { Url } from "next/dist/shared/lib/router/router";
import crypto from "crypto";
import {
  ApiMeal,
  ApiMealDetailInterface,
  IngredientItem,
  RecipeMealDetailsInterface,
  RecipeMealList,
  RecipeMealsInterface,
} from "@/interface/recipe-interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const getActiveClass = (pathname: string, path: Url): boolean => {
  return pathname === path;
};

export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function validateSchema<T extends Record<string, any>>(
  schema: Schema<T>,
  body: any,
):
  | { data: T; valid: true }
  | { errors: Record<keyof T, string>; valid: false } {
  const errors: Partial<Record<keyof T, string>> = {};
  const data: Partial<T> = {};

  for (const key in schema) {
    const validator = schema[key];
    const value = body[key];

    // Missing required field
    if (value === undefined) {
      errors[key as keyof T] = "Required field is missing";
      continue;
    }

    const error = validator(value);
    if (error) {
      errors[key as keyof T] = error;
    } else {
      data[key as keyof T] = value;
    }
  }

  const valid = Object.keys(errors).length === 0;

  if (valid) {
    // Now TS knows data is fully typed
    return { data: data as T, valid: true };
  } else {
    return { errors: errors as Record<keyof T, string>, valid: false };
  }
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

// Helper: map API meal → Recipe interface
export async function mapMeals(meals: ApiMeal[]): Promise<RecipeMealList> {
  return meals.map((item) => ({
    id: item.idMeal,
    meal: item.strMeal,
    imageURL: item.strMealThumb,
    isFavorite: false,
    area: "Test",
    tags: ["Test"],
    category: "Test",
  }));
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
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: instructions,
    image: meal.strMealThumb,
    youtube: meal.strYoutube,
    source: meal.strSource,
    ingredients,
    tags: meal.strTags?.split(","),
  };

  return data;
}

export const getYoutubeEmbedUrl = (url: string | null) => {
  if (!url) return null;

  const videoId = new URL(url).searchParams.get("v");

  if (!videoId) return null;

  return `https://www.youtube.com/embed/${videoId}`;
};

const parseInstructions = (text: string | null): string[] => {
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

export function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export const updatePage = (
  newPage: number,
  router: AppRouterInstance,
  pathname: string,
) => {
  const params = new URLSearchParams(window.location.search);
  params.set("page", String(newPage));
  router.push(`${pathname}?${params.toString()}`);
};
