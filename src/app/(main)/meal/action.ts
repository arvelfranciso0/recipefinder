"use server";

import { db } from "@/db";
import { FavoriteRepository } from "@/repository/favorite";
import { AuthService } from "@/services/auth.service";
import { FavoriteType } from "@/types/favorite-type";
import { MealType } from "@/types/recipe-types";
import { revalidatePath } from "next/cache";

export async function toggleFavorite(
  mealId: number,
  isFavorite: boolean,
  id: number,
  mealType?: MealType,
) {
  const authUser = new AuthService();
  const user = await authUser.getAuthenticatedUser();

  const favoriteRepositoy = new FavoriteRepository();

  if (!isFavorite) {
    const data: FavoriteType = {
      userId: user?.id as number,
      mealId: mealId,
      mealType: mealType,
    };

    await favoriteRepositoy.createFavoritesByUserId(data);
  } else {
    await favoriteRepositoy.deleteFavoritesByIdAndUserId(
      id,
      user?.id as number,
    );
  }

  revalidatePath("/meal");
}
