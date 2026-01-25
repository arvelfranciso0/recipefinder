import { DietsInterface } from "@/interface/dataInterface";

export const diets: DietsInterface[] = [
  { id: "veg", label: "Vegetarian", isChecked: true },
  { id: "vegan", label: "Vegan", isChecked: false },
  { id: "gf", label: "Gluten-free", isChecked: false },
  { id: "df", label: "Dairy-free", isChecked: false },
  { id: "keto", label: "Keto", isChecked: false },
  { id: "paleo", label: "Paleo", isChecked: false },
];
