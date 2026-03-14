import { MealType } from "./recipe-types";

export type FavoriteType = {
  userId: number;
  mealId: number;
  mealType?: MealType;
};

export type FavoriteCounts = {
  count: number;
  breakfastCount: number;
  lunchCount: number;
  dinnerCount: number;
};
