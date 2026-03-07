import { Database } from "@/db";
import { favorites, meals } from "@/db/schema";
import { MealWithFavoriteInterface } from "@/interface/recipe-interface";
import {
  and,
  count,
  desc,
  eq,
  getTableColumns,
  isNull,
  like,
  or,
  sql,
} from "drizzle-orm";

export class MealRepository {
  private now = new Date();

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

  constructor(private db: Database) {}

  async getMealWithFavoritesByUser(
    userId: number,
    limit: number,
    offset: number,
    category?: string,
    area?: string,
    ingredient?: string,
  ): Promise<MealWithFavoriteInterface[]> {
    return await this.db
      .select({
        ...getTableColumns(meals),
        favoriteId: favorites.id,
      })
      .from(meals)
      .leftJoin(
        favorites,
        and(
          eq(meals.id, favorites.mealId),
          eq(favorites.userId, userId),
          isNull(favorites.deletedAt),
        ),
      )
      .where(
        and(
          category ? eq(meals.category, category) : undefined,
          area ? eq(meals.area, area) : undefined,
          ingredient
            ? or(
                ...this.ingredientColumns.map((col) =>
                  like(col, `%${ingredient}%`),
                ),
              )
            : undefined,
        ),
      )
      .limit(limit)
      .offset(offset);
  }

  async countMealsWithFavoritesByUser(
    userId: number,
    category?: string,
    area?: string,
    ingredient?: string,
  ) {
    const result = await this.db
      .select({ count: count() })
      .from(meals)
      .leftJoin(
        favorites,
        and(
          eq(meals.id, favorites.mealId),
          eq(favorites.userId, userId),
          isNull(favorites.deletedAt),
        ),
      )
      .where(
        and(
          category ? eq(meals.category, category) : undefined,
          area ? eq(meals.area, area) : undefined,
          ingredient
            ? or(
                ...this.ingredientColumns.map((col) =>
                  like(col, `%${ingredient}%`),
                ),
              )
            : undefined,
        ),
      );

    return result[0]?.count ?? 0;
  }

  async getFeaturedMeals(userId: number) {
    const totalFavoritesSubquery = this.db
      .select({
        mealId: favorites.mealId,
        totalFavorites: count(favorites.id).as("totalFavorites"),
      })
      .from(favorites)
      .groupBy(favorites.mealId)
      .as("totalFavoritesSubquery");

    return this.db
      .select({
        ...getTableColumns(meals),
        totalFavorites: totalFavoritesSubquery.totalFavorites,
        favoriteId: favorites.id,
      })
      .from(meals)
      .leftJoin(
        totalFavoritesSubquery,
        eq(meals.id, totalFavoritesSubquery.mealId),
      )
      .leftJoin(
        favorites,
        and(
          eq(meals.id, favorites.mealId),
          eq(favorites.userId, userId),
          isNull(favorites.deletedAt),
        ),
      )
      .orderBy(desc(totalFavoritesSubquery.totalFavorites))
      .limit(3);
  }

  async getMealById(
    mealId: number,
    userId: number,
  ): Promise<MealWithFavoriteInterface | null> {
    const result = await this.db
      .select({
        ...getTableColumns(meals),
        favoriteId: favorites.id,
      })
      .from(meals)
      .leftJoin(
        favorites,
        and(
          eq(meals.id, favorites.mealId),
          eq(favorites.userId, userId),
          isNull(favorites.deletedAt),
        ),
      )
      .where(eq(meals.id, mealId))
      .limit(1);

    return result[0] ?? null;
  }
}
