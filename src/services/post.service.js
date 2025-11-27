import { eq } from "drizzle-orm";
import { db } from "../db/drizzle.js"
import { posts } from "../db/schema.js"

export const createPost = async (userId, body) => {
    const result = await db.insert(posts).values({
        title: body.title,
        content: body.content,
        userId: userId
    }).returning()

    const post = result[0];

    if (!post) {
        throw new Error('Failed to create post');
    }

    return post
}

export const getAllPosts = async () => {
    const posts = await db.query.posts.findMany({
        with: {
            user: {
                columns: {
                    id: true,
                    username: true,
                    email: true
                }
            }
        },
    });

    if (!posts) {
        return [];
    }

    return posts
}

export const getPostById = async (id) => {
    const post = await db.query.posts.findFirst({
        where: eq(posts.id, id),
        with: {
            user: {
                columns: {
                    id: true,
                    username: true,
                    email: true
                }
            }
        }
    })

    if (!post) {
        return null;
    }

    return post
}

export const updatePost = async (userId, id, body) => {
    const post = await db.query.posts.findFirst({
        where: eq(posts.id, id),
        with: {
            user: {
                columns: {
                    id: true,
                    username: true,
                    email: true
                }
            }
        }
    })

    if (!post) {
        return null;
    }

    const updatedPost = await db.update(posts).set({
        title: body.title,
        content: body.content,
        userId: userId
    }).where(eq(posts.id, id)).returning()

    if (!updatedPost) {
        throw new Error('Failed to update post');
    }

    return updatedPost
}

export const deletePost = async (id) => {
    const post = await db.query.posts.findFirst({
        where: eq(posts.id, id)
    })

    if (!post) {
        return null;
    }

    const deletedPost = await db.delete(posts).where(eq(posts.id, id))

    if (!deletedPost) {
        throw new Error('Failed to delete post');
    }

    return deletedPost
}