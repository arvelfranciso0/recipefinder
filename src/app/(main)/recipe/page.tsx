import RecipeList from "./_components/recipe-list";
import { getRecipes } from "./server";

interface RecipePageProps {
  searchParams: Promise<{
    category?: string;
    area?: string;
    page?: string;
  }>;
}

export default async function RecipePage({ searchParams }: RecipePageProps) {
  const params = await searchParams;

  const { recipes, totalRecipes } = await getRecipes({
    category: params.category,
    page: Number(params.page) || 1,
    area: params.area,
  });

  return <RecipeList recipes={recipes} totalRecipes={totalRecipes} />;
}
