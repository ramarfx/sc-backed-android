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
    },
    with: {
      posts: true,
      followers: {
        with: {
          follower: {
            columns: {
              id: true,
              username: true,
              email: true
            }
          }
        }
      },
      following: {
        with: {
          following: {
            columns: {
              id: true,
              username: true,
              email: true
            }
          }
        }
      }
    }
  })

  const followers = user?.followers.map(follower => follower.follower);
  const following = user?.following.map(following => following.following);

  const followersCount = followers?.length || 0;
  const followingCount = following?.length || 0;

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    followersCount,
    followingCount,
    followers,
    following,
    posts: user.posts,
  };
}