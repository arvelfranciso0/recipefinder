import { UserRoleType } from "@/types/role-type";
import { Settings } from "./setting-type";

export type User = {
  id?: number;
  email: string;
  fullName: string;
  role: UserRoleType;
  isEmailVerified: boolean | null;
};

export type UserDetails = User & {
  password: string;
  birthdate?: string;
  salt: string;
};

export type UserSettings = User & Pick<Settings, "theme">;
