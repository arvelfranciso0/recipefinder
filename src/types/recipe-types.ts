import { MealInteface } from "@/interface/recipe-interface";

export interface Recipe {
  id: number;
  title: string;
  tag: string;
  time: string;
  rating: number;
  image: string;
  isPopular?: boolean;
  isNew?: boolean;
  difficulty: string;
  tagColor: string;
  isFavorite?: boolean;
}
export type IngredientKeys =
  `ingredient${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20}`;
export type MeasureKeys =
  `measure${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20}`;

export type MealType = "breakfast" | "lunch" | "dinner" | null;
