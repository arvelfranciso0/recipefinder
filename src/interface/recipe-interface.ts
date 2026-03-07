export interface ApiMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export type ApiResponse = ApiMeal[];

export interface RecipeInterface {
  id: string;
  meal: string;
}

export interface IngredientInterface {
  id: string;
  ingredientName: string;
}

export interface IngredientApiResponse {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strThumb: string;
  strType: string | null;
}

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
  id: number;
  name: string;
  category: string | null;
  area: string | null;
  instructions: string[];
  image: string | null;
  youtube: string | null;
  source: string | null;
  ingredients: IngredientItem[];
  favoriteId: number | null;
  tags: string[];
}

export interface RecipeMealInterface {
  id: number;
  meal: string;
  imageURL: string;
  area: string;
  tags: string[];
  isFavorite: boolean;
  favoriteId: number | null;
  category: string;
  ingredients: string[];
}

export type RecipeMealList = RecipeMealInterface[];

export interface MealCardInterface extends RecipeMealInterface {
  handleFavorite?: (e: React.MouseEvent) => void;
  isPending?: boolean;
}

export interface MealInteface {
  id: number | null;
  name: string | null;
  category?: string | null;
  area?: string | null;
  instructions?: string | null;
  thumbnail?: string | null;
  tags?: string | null;
  youtube?: string | null;
  source?: string | null;
  alternate?: string | null;

  ingredient1?: string | null;
  ingredient2?: string | null;
  ingredient3?: string | null;
  ingredient4?: string | null;
  ingredient5?: string | null;
  ingredient6?: string | null;
  ingredient7?: string | null;
  ingredient8?: string | null;
  ingredient9?: string | null;
  ingredient10?: string | null;
  ingredient11?: string | null;
  ingredient12?: string | null;
  ingredient13?: string | null;
  ingredient14?: string | null;
  ingredient15?: string | null;
  ingredient16?: string | null;
  ingredient17?: string | null;
  ingredient18?: string | null;
  ingredient19?: string | null;
  ingredient20?: string | null;

  measure1?: string | null;
  measure2?: string | null;
  measure3?: string | null;
  measure4?: string | null;
  measure5?: string | null;
  measure6?: string | null;
  measure7?: string | null;
  measure8?: string | null;
  measure9?: string | null;
  measure10?: string | null;
  measure11?: string | null;
  measure12?: string | null;
  measure13?: string | null;
  measure14?: string | null;
  measure15?: string | null;
  measure16?: string | null;
  measure17?: string | null;
  measure18?: string | null;
  measure19?: string | null;
  measure20?: string | null;

  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export interface MealWithFavoriteInterface extends MealInteface {
  favoriteId: number | null;
}

export interface FeatureMealInterface extends MealInteface {
  totalFavorites: number;
  favoriteId: number | null;
}
