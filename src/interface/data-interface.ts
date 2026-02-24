import { UserRoleType } from "@/types/role-type";
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

export interface verifyPasswordHashInterface {
  inputPassword: string;
  salt: string;
  hashPassword: string;
}

export interface accessTokenInterface {
  token: string;
  tokenType: UserRoleType;
  name: string;
  tokenableId: number;
  expiresAt: Date;
  lastUsedAt: Date;
}
export interface MealLableInterface {
  id: string;
  label: string;
  value: string;
}
