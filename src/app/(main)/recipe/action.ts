"use server";

import { db } from "@/db";
import { FavoriteRepository } from "@/repository/favorite";
import { AuthService } from "@/services/auth.service";
import { FavoriteType } from "@/types/favorite-type";
import { revalidatePath } from "next/cache";

export async function toggleFavorite(
  mealId: string,
  isFavorite: boolean,
  id: number,
) {
  const authUser = new AuthService();
  const user = await authUser.getAuthenticatedUser();

  const favoriteRepositoy = new FavoriteRepository(db);

  if (!isFavorite) {
    const data: FavoriteType = {
      userId: user?.id as number,
      mealId: mealId,
    };

    await favoriteRepositoy.createFavoritesByUserId(data);
  } else {
    await favoriteRepositoy.deleteFavoritesByIdAndUserId(
      id,
      user?.id as number,
    );
  }

  revalidatePath("/recipe");
}
