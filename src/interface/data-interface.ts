import { LucideIcon } from "lucide-react";

export interface DietsInterface {
  id: string;
  label: string;
  isChecked: boolean;
}

export interface CategoriesInteface {
  label: string;
  id: string;
  value: string;
  bgClass: string;
  colorClass: string;
  icon: LucideIcon;
}
