import { UserThemeType } from "./theme-type";

export type Settings = {
  id?: number;
  userId: number;
  theme: UserThemeType | null;
  dietaryPreferences: string;
  measurementUnit: string;
  notification: string;
};
