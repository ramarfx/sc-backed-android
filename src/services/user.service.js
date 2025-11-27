import { eq } from "drizzle-orm";
import { db } from "../db/drizzle.js"
import { users } from "../db/schema.js";

export const getAllUsers = async () => {
  const users = await db.query.users.findMany({
    columns: {
      id: true,
      username: true,
      email: true
    }
  });

  if (!users) {
    return [];
  }

  return users;
}

export const getUserByUsername = async (username) => {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
    columns: {
      id: true,
      username: true,
      email: true
    }
  })

  if (!user) {
    return null;
  }

  return user;
}