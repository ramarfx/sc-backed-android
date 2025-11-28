import { relations, sql } from "drizzle-orm";
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

export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  followers: many(follows, {
    relationName: 'user_following',
    fields: [users.id],
    references: [follows.followingId], 
  }),
  following: many(follows, {
    relationName: 'user_followers',
    fields: [users.id],
    references: [follows.followerId],
  }),
}));

export const postRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));

export const followRelations = relations(follows, ({ one }) => ({
  follower: one(users, {
    relationName: 'user_followers',
    fields: [follows.followerId],
    references: [users.id],
  }),
  following: one(users, {
    relationName: 'user_following',
    fields: [follows.followingId],
    references: [users.id],
  }),
}));
