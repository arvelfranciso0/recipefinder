import { ApiMeal, RecipeMealList } from "@/interface/recipe-interface";
import { mapMealDetail } from "@/libs/utils";
import axios, { AxiosResponse } from "axios";

export class TheMealDbApiService {
  private static BASE_URL = process.env.MEALDB_BASE_URL!;

  // Search meals by name
  static async searchMealByName(name: string): Promise<any> {
    return axios
      .get(`${this.BASE_URL}/search.php?s=${encodeURIComponent(name)}`)
      .then((res: AxiosResponse) => res.data)
      .catch((err) => {
        throw new Error(`Failed to fetch meals by name: ${err.message}`);
      });
  }

  // Lookup full meal details by ID
  static async lookupMealById(id: string | number): Promise<any> {
    return axios
      .get(`${this.BASE_URL}/lookup.php?i=${id}`)
      .then((res: AxiosResponse) => res.data?.meals)
      .catch((err) => {
        throw new Error(`Failed to fetch meal by ID: ${err.message}`);
      });
  }

  // Filter meals by category
  static async filterByCategory(category: string): Promise<ApiMeal[]> {
    return axios
      .get(`${this.BASE_URL}/filter.php?c=${encodeURIComponent(category)}`)
      .then((res: AxiosResponse) => res.data?.meals)
      .catch((err) => {
        throw new Error(`Failed to fetch meals by category: ${err.message}`);
      });
  }

  // Filter meals by main ingredient
  static async filterByIngredient(ingredient: string): Promise<any> {
    return axios
      .get(`${this.BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`)
      .then((res: AxiosResponse) => res.data)
      .catch((err) => {
        throw new Error(`Failed to fetch meals by ingredient: ${err.message}`);
      });
  }

  // Filter meals by area
  static async filterByArea(area: string): Promise<ApiMeal[]> {
    return axios
      .get(`${this.BASE_URL}/filter.php?a=${encodeURIComponent(area)}`)
      .then((res: AxiosResponse) => res.data?.meals)
      .catch((err) => {
        throw new Error(`Failed to fetch meals by area: ${err.message}`);
      });
  }

  // List all ingredients
  static async listIngredients(): Promise<any> {
    return axios
      .get(`${this.BASE_URL}/list.php?i=list`)
      .then((res: AxiosResponse) => res.data)
      .catch((err) => {
        throw new Error(`Failed to fetch ingredients: ${err.message}`);
      });
  }

  //Get all recipe by recipeIds
  static async listAllRecipe(recipeIds: string[]): Promise<RecipeMealList> {
    const recipes = await Promise.all(
      recipeIds.map(async (id) => {
        const recipeDetailsResult = await this.lookupMealById(id);

        if (!recipeDetailsResult?.length) return null;

        const mapResultRecipeDetails = await mapMealDetail(
          recipeDetailsResult[0],
        );

        return {
          id: mapResultRecipeDetails.id,
          meal: mapResultRecipeDetails.name,
          imageURL: mapResultRecipeDetails.image ?? "",
          area: mapResultRecipeDetails.area ?? "",
          tags: mapResultRecipeDetails.tags ?? [],
          isFavorite: false,
          category: mapResultRecipeDetails.category,
        };
      }),
    );

    // remove nulls (in case some ids fail)
    return recipes as RecipeMealList;
  }
}
