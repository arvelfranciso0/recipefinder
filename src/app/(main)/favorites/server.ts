import { db } from "@/db";
import { RecipeMealInterface } from "@/interface/recipe-interface";
import { mealWithFavoriteToDTO } from "@/libs/utils";
import { FavoriteRepository } from "@/repository/favorite";
import { AuthService } from "@/services/auth.service";

interface GetFavoriteMealsByAuthUserResponse {
  favoriteMeals: RecipeMealInterface[];
  favoriteCount: number;
  dinnerCount: number;
  breakfastCount: number;
  lunchCount: number;
}
export async function getFavoriteMealsByAuthUser({
  page = 1,
  limit = 10,
  category = "",
  ingredient = "",
  sortBy = "",
}: {
  page?: number;
  limit?: number;
  category?: string;
  ingredient?: string;
  sortBy?: string;
}): Promise<GetFavoriteMealsByAuthUserResponse> {
  const authUser = new AuthService();
  const favoriteRepository = new FavoriteRepository();
  const offset = (page - 1) * limit;

  try {
    const user = await authUser.getAuthenticatedUser();
    if (!user)
      return {
        favoriteMeals: [],
        favoriteCount: 0,
        dinnerCount: 0,
        breakfastCount: 0,
        lunchCount: 0,
      };
    const favoriteMeals =
      await favoriteRepository.getAllFavoritesWithMealByUserId(
        user.id,
        limit,
        offset,
        category,
        ingredient,
        sortBy,
      );

    const count = await favoriteRepository.countFavoritesByUserId(user.id);
    console.log("Total favorite meals count:", count);
    const result = favoriteMeals.map((meal) => mealWithFavoriteToDTO(meal));
    return {
      favoriteMeals: result,
      favoriteCount: count.count,
      dinnerCount: count.dinnerCount,
      breakfastCount: count.breakfastCount,
      lunchCount: count.lunchCount,
    };
  } catch (error) {
    console.error("Error fetching favorite meals:", error);
    return {
      favoriteMeals: [],
      favoriteCount: 0,
      dinnerCount: 0,
      breakfastCount: 0,
      lunchCount: 0,
    };
  }
}
