import { UserRoleType } from "@/types/role-type";

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
