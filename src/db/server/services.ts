export const TheMealDbApiService = {
  // Search meals by name
  SearchMealByName: {
    URL: `https://www.themealdb.com/api/json/v1/1/search.php?s=`,
  },

  // Lookup full meal details by ID
  LookupMealById: {
    URL: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=`,
  },

  // Filter meals by category
  FilterByCategory: {
    URL: `https://www.themealdb.com/api/json/v1/1/filter.php?c=`,
  },

  // Filter by main ingredient
  FilterByIngredient: {
    URL: `https://www.themealdb.com/api/json/v1/1/filter.php?i=`,
  },

  // Filter by araa
  FilterByArea: {
    URL: `www.themealdb.com/api/json/v1/1/filter.php?a=`,
  },

  // List all ingredients
  ListIngredients: {
    URL: `https://www.themealdb.com/api/json/v1/1/list.php?i=list`,
  },
};
