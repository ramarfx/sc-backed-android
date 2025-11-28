import { and, eq } from "drizzle-orm";
import { db } from "../db/drizzle.js"
import { follows } from "../db/schema.js"

// follower: orang yang nge-follow
// following: orang yang di follow
export const follow = async (followerId, followingId) => {
    if (followerId === followingId) {
        throw new Error('You cannot follow yourself');
    }

    const existingFollow = await db.query.follows.findFirst({
        where: and(
            eq(follows.followerId, followerId),
            eq(follows.followingId, followingId)
        )
    })

    if (existingFollow) {
        throw new Error('You are already following this follower');
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
        throw new Error('You are not following this follower');
    }

    const unfollow = await db.delete(follows).where(eq(follows.id, existingFollow.id)).returning()

    if (!unfollow) {
        throw new Error('Failed to unfollow');
    }

    return unfollow
}