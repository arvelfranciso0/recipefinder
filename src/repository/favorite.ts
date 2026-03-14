import { db } from "@/db";
import { favorites, meals } from "@/db/schema";
import { FavoriteInterface } from "@/interface/favorite-interface";
import { FavoriteCounts, FavoriteType } from "@/types/favorite-type";
import { MealType } from "@/types/recipe-types";
import {
  and,
  asc,
  count,
  desc,
  eq,
  getTableColumns,
  isNull,
  like,
  or,
  sql,
} from "drizzle-orm";

export class FavoriteRepository {
  private now = new Date();
  protected db = db;

  private ingredientColumns = [
    meals.ingredient1,
    meals.ingredient2,
    meals.ingredient3,
    meals.ingredient4,
    meals.ingredient5,
    meals.ingredient6,
    meals.ingredient7,
    meals.ingredient8,
    meals.ingredient9,
    meals.ingredient10,
    meals.ingredient11,
    meals.ingredient12,
    meals.ingredient13,
    meals.ingredient14,
    meals.ingredient15,
    meals.ingredient16,
    meals.ingredient17,
    meals.ingredient18,
    meals.ingredient19,
    meals.ingredient20,
  ];

  constructor() {}

  async getAllFavoritesByUserId(userId: number): Promise<FavoriteInterface[]> {
    return await this.db
      .select({ mealId: favorites.mealId, id: favorites.id })
      .from(favorites)
      .where(and(eq(favorites.userId, userId), isNull(favorites.deletedAt)));
  }

  async createFavoritesByUserId(data: FavoriteType) {
    return await this.db.insert(favorites).values(data);
  }

  async deleteFavoritesByIdAndUserId(id: number, userId: number) {
    return await this.db
      .update(favorites)
      .set({ deletedAt: this.now })
      .where(and(eq(favorites.id, id), eq(favorites.userId, userId)));
  }

  async getAllFavoritesWithMealByUserId(
    userId: number,
    limit: number,
    offset: number,
    mealType: MealType,
    category?: string,
    ingredient?: string,
    sortBy?: string,
  ) {
    const sort =
      sortBy === "oldest"
        ? asc(favorites.createdAt)
        : desc(favorites.createdAt);
    return await this.db
      .select({ ...getTableColumns(meals), favoriteId: favorites.id })
      .from(favorites)
      .innerJoin(meals, eq(meals.id, favorites.mealId))
      .where(
        and(
          eq(favorites.userId, userId),
          isNull(favorites.deletedAt),
          and(
            mealType != "" ? eq(favorites.mealType, mealType) : undefined,
            category ? eq(meals.category, category) : undefined,
            ingredient
              ? or(
                  ...this.ingredientColumns.map((col) =>
                    like(col, `%${ingredient}%`),
                  ),
                )
              : undefined,
          ),
        ),
      )
      .limit(limit)
      .offset(offset)
      .orderBy(sort);
  }

  async countFavoritesByUserId(userId: number): Promise<FavoriteCounts> {
    const [result] = await this.db
      .select({
        count: count(),

        breakfastCount: sql<number>`
        count(case when ${favorites.mealType} = 'breakfast' then 1 end)
      `.as("breakfastCount"),

        lunchCount: sql<number>`
        count(case when ${favorites.mealType} = 'lunch' then 1 end)
      `.as("lunchCount"),

        dinnerCount: sql<number>`
        count(case when ${favorites.mealType} = 'dinner' then 1 end)
      `.as("dinnerCount"),
      })
      .from(favorites)
      .where(and(eq(favorites.userId, userId), isNull(favorites.deletedAt)));

    return result;
  }
}
