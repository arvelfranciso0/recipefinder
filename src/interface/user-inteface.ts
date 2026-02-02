import { UserRoleType } from "@/types/role-type";

export interface User {
  id?: number;
  email: string;
  fullName: string;
  role: UserRoleType;
}

export interface UserInterface extends User {
  password: string;
  birthdate?: string;
  salt: string;
}
