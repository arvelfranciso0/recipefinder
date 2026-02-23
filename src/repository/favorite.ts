import { Database } from "@/db";
import { favorites } from "@/db/schema";
import { FavoriteInterface } from "@/interface/favorite-interface";
import { FavoriteType } from "@/types/favorite-type";
import { and, eq, isNull } from "drizzle-orm";

export class FavoriteRepository {
  private now = new Date();

  constructor(private db: Database) {}

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
}
