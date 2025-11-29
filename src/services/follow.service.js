import { and, eq } from "drizzle-orm";
import { db } from "../db/drizzle.js"
import { follows } from "../db/schema.js"
import { ErrorResponse } from "../utils/ErrorResponse.js";

// follower: orang yang nge-follow
// following: orang yang di follow
export const follow = async (followerId, followingId) => {
    if (followerId === followingId) {
        throw new ErrorResponse('You cannot follow yourself', 400);
    }

    const existingFollow = await db.query.follows.findFirst({
        where: and(
            eq(follows.followerId, followerId),
            eq(follows.followingId, followingId)
        )
    })

    if (existingFollow) {
        throw new ErrorResponse('You are already following this follower', 400);
    }

    const following = await db.insert(follows).values({
        followerId: followerId,
        followingId: followingId
    }).returning();

    return following
}

export const unfollow = async (follwerId, followingId) => {
    const existingFollow = await db.query.follows.findFirst({
        where: and(
            eq(follows.followerId, follwerId),
            eq(follows.followingId, followingId)
        )
    })

    if (!existingFollow) {
        throw new ErrorResponse('You are not following this follower', 400);
    }

    const unfollow = await db.delete(follows).where(eq(follows.id, existingFollow.id)).returning()

    if (!unfollow) {
        throw new ErrorResponse('Failed to unfollow,', 400);
    }

    return unfollow
}