import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  username: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  token: text(),
});

export const posts = sqliteTable("posts_table", {
  id: int('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: int('user_id').notNull().references(() => users.id),
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
})

export const follows = sqliteTable("follows_table", {
  id: int('id').primaryKey({ autoIncrement: true }),
  followerId: int('follower_id').notNull().references(() => users.id),
  followingId: int('following_id').notNull().references(() => users.id),
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
})
