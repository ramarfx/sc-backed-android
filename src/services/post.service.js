import { eq } from "drizzle-orm";
import { db } from "../db/drizzle.js"
import { posts } from "../db/schema.js"
import { ErrorResponse } from "../utils/ErrorResponse.js";

export const createPost = async (userId, body) => {
    const result = await db.insert(posts).values({
        title: body.title,
        content: body.content,
        userId: userId
    }).returning()

    const post = result[0];

    if (!post) {
        throw new ErrorResponse('Failed to create post', 400);
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
        throw new ErrorResponse('Post not found', 404);
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
        throw new ErrorResponse('Post not found', 404);
    }

    if (post.userId !== userId) {
        throw new ErrorResponse('Forbidden', 403);
    }

    const updatedPost = await db.update(posts).set({
        title: body.title,
        content: body.content,
        userId: userId
    }).where(eq(posts.id, id)).returning()

    if (!updatedPost) {
        throw new ErrorResponse('Failed to update post', 400);
    }

    return updatedPost
}

export const deletePost = async (userId, id) => {
    const post = await db.query.posts.findFirst({
        where: eq(posts.id, id)
    })

    if (!post) {
        throw new ErrorResponse('Post not found', 404);
    }

    if (post.userId !== userId) {
        throw new ErrorResponse('Forbidden', 403);
    }

    const deletedPost = await db.delete(posts).where(eq(posts.id, id))

    if (!deletedPost) {
        throw new ErrorResponse('Failed to delete post', 400);
    }

    return deletedPost
}