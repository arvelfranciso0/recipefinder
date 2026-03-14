import FavoritesList from "./_components/favorite-list";
import NoFavoritesFound from "./_components/no-favorite-found";
import { getFavoriteMealsByAuthUser } from "./server";

interface RecipePageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
    ingredient?: string;
    sortBy?: string;
  }>;
}
export default async function FavoritesPage({ searchParams }: RecipePageProps) {
  const params = await searchParams;
  const {
    favoriteMeals,
    favoriteCount,
    dinnerCount,
    breakfastCount,
    lunchCount,
  } = await getFavoriteMealsByAuthUser({
    page: Number(params.page) || 1,
    ingredient: params.ingredient || "",
    category: params.category || "",
    sortBy: params.sortBy,
  });

  if (favoriteMeals.length === 0) {
    return <NoFavoritesFound />;
  }
  return (
    <FavoritesList
      favoriteMeals={favoriteMeals}
      favoriteCount={favoriteCount}
      dinnerCount={dinnerCount}
      breakfastCount={breakfastCount}
      lunchCount={lunchCount}
    />
  );
}
