import { eq } from "drizzle-orm";
import { db } from "../db/drizzle"
import { users } from "../db/schema";

export const getAllUsers = async () => {
    const users = await db.select().from(users);

    if (!users) {
        return [];
    }

    return users;
}

export const getUserById = async (id) => {
  const user = await db.select().from(users).where(eq(users.id, id))

  if (!user) {
    throw new Error('User not found')
  }

  return user;
}