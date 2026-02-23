export interface ApiMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export type ApiResponse = ApiMeal[];

export interface RecipeInterface {
  id: string;
  meal: string;
  imageURL: string;
  isFavorite: boolean;
}

export type RecipeMealsInterface = RecipeInterface[];

export interface ApiMealDetailInterface {
  idMeal: string;
  strMeal: string;
  strCategory: string | null;
  strArea: string | null;
  strInstructions: string | null;
  strMealThumb: string | null;
  strTags: string;
  strYoutube: string | null;
  strSource: string | null;
  dateModified: string | null;
  [key: string]: string | null;
}

export interface IngredientItem {
  ingredient: string;
  measure: string;
}

export interface RecipeMealDetailsInterface {
  id: string;
  name: string;
  category: string | null;
  area: string | null;
  instructions: string[];
  image: string | null;
  youtube: string | null;
  source: string | null;
  ingredients: IngredientItem[];
  tags: string[];
}

export interface RecipeMealInterface {
  id: string;
  meal: string;
  imageURL: string;
  area: string;
  tags: string[];
  isFavorite: boolean;
  favoriteId?: number;
  category: string;
}

export type RecipeMealList = RecipeMealInterface[];

export interface MealCardInterface extends RecipeMealInterface {
  handleFavorite?: (e: React.MouseEvent) => void;
  isPending?: boolean;
}
