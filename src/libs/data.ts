import { CategoriesInteface, DietsInterface } from "@/interface/data-interface";
import {
  Beef,
  Cake,
  ChefHat,
  Coffee,
  Egg,
  Fish,
  Flame,
  Leaf,
  Milk,
  Soup,
  Sprout,
  UtensilsCrossed,
  Zap,
} from "lucide-react";

export const diets: DietsInterface[] = [
  { id: "veg", label: "Vegetarian", isChecked: true },
  { id: "vegan", label: "Vegan", isChecked: false },
  { id: "gf", label: "Gluten-free", isChecked: false },
  { id: "df", label: "Dairy-free", isChecked: false },
  { id: "keto", label: "Keto", isChecked: false },
  { id: "paleo", label: "Paleo", isChecked: false },
];

export const mealsArea = [
  {
    area: "Algerian",
  },
  {
    area: "American",
  },
  {
    area: "Argentinian",
  },
  {
    area: "Australian",
  },
  {
    area: "British",
  },
  {
    area: "Canadian",
  },
  {
    area: "Chinese",
  },
  {
    area: "Croatian",
  },
  {
    area: "Dutch",
  },
  {
    area: "Egyptian",
  },
  {
    area: "Filipino",
  },
  {
    area: "French",
  },
  {
    area: "Greek",
  },
  {
    area: "Indian",
  },
  {
    area: "Irish",
  },
  {
    area: "Italian",
  },
  {
    area: "Jamaican",
  },
  {
    area: "Japanese",
  },
  {
    area: "Kenyan",
  },
  {
    area: "Malaysian",
  },
  {
    area: "Mexican",
  },
  {
    area: "Moroccan",
  },
  {
    area: "Norwegian",
  },
  {
    area: "Polish",
  },
  {
    area: "Portuguese",
  },
  {
    area: "Russian",
  },
  {
    area: "Saudi Arabian",
  },
  {
    area: "Slovakian",
  },
  {
    area: "Spanish",
  },
  {
    area: "Syrian",
  },
  {
    area: "Thai",
  },
  {
    area: "Tunisian",
  },
  {
    area: "Turkish",
  },
  {
    area: "Ukrainian",
  },
  {
    area: "Uruguayan",
  },
  {
    area: "Venezulan",
  },
  {
    area: "Vietnamese",
  },
];

export const categories: CategoriesInteface[] = [
  {
    id: "1",
    label: "Beef",
    value: "beef",
    icon: Beef,
    bgClass: "bg-red-100 dark:bg-red-500/10",
    colorClass: "text-red-600 dark:text-red-400",
  },
  {
    id: "2",
    label: "Breakfast",
    value: "breakfast",
    icon: Coffee,
    bgClass: "bg-orange-100 dark:bg-orange-500/10",
    colorClass: "text-orange-600 dark:text-orange-400",
  },
  {
    id: "3",
    label: "Chicken",
    value: "chicken",
    icon: Egg,
    bgClass: "bg-amber-100 dark:bg-amber-500/10",
    colorClass: "text-amber-600 dark:text-amber-400",
  },
  {
    id: "4",
    label: "Dessert",
    value: "dessert",
    icon: Cake,
    bgClass: "bg-pink-100 dark:bg-pink-500/10",
    colorClass: "text-pink-600 dark:text-pink-400",
  },
  {
    id: "5",
    label: "Goat",
    value: "goat",
    icon: UtensilsCrossed,
    bgClass: "bg-stone-100 dark:bg-stone-500/10",
    colorClass: "text-stone-600 dark:text-stone-400",
  },
  {
    id: "6",
    label: "Lamb",
    value: "lamb",
    icon: ChefHat,
    bgClass: "bg-rose-100 dark:bg-rose-500/10",
    colorClass: "text-rose-600 dark:text-rose-400",
  },
  {
    id: "7",
    label: "Miscellaneous",
    value: "miscellaneous",
    icon: Zap,
    bgClass: "bg-gray-100 dark:bg-gray-500/10",
    colorClass: "text-gray-600 dark:text-gray-400",
  },
  {
    id: "8",
    label: "Pasta",
    value: "pasta",
    icon: Soup,
    bgClass: "bg-yellow-100 dark:bg-yellow-500/10",
    colorClass: "text-yellow-600 dark:text-yellow-400",
  },
  {
    id: "9",
    label: "Pork",
    value: "pork",
    icon: Flame,
    bgClass: "bg-orange-100 dark:bg-orange-600/10",
    colorClass: "text-orange-700 dark:text-orange-500",
  },
  {
    id: "10",
    label: "Seafood",
    value: "seafood",
    icon: Fish,
    bgClass: "bg-blue-100 dark:bg-blue-500/10",
    colorClass: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "11",
    label: "Side",
    value: "side",
    icon: UtensilsCrossed,
    bgClass: "bg-indigo-100 dark:bg-indigo-500/10",
    colorClass: "text-indigo-600 dark:text-indigo-400",
  },
  {
    id: "12",
    label: "Starter",
    value: "starter",
    icon: Milk,
    bgClass: "bg-cyan-100 dark:bg-cyan-500/10",
    colorClass: "text-cyan-600 dark:text-cyan-400",
  },
  {
    id: "13",
    label: "Vegan",
    value: "vegan",
    icon: Leaf,
    bgClass: "bg-green-100 dark:bg-green-500/10",
    colorClass: "text-green-600 dark:text-green-400",
  },
  {
    id: "14",
    label: "Vegetarian",
    value: "vegetarian",
    icon: Sprout,
    bgClass: "bg-emerald-100 dark:bg-emerald-500/10",
    colorClass: "text-emerald-600 dark:text-emerald-400",
  },
];
