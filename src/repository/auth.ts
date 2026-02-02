import { db } from "@/db";
import { users } from "@/db/schema";
import { UserInterface } from "@/interface/user-inteface";

export default async function signUp(user: UserInterface) {
  await db.insert(users).values(user);
}
