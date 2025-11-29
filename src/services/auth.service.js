import { eq } from "drizzle-orm";
import { db } from "../db/drizzle.js";
import { users } from "../db/schema.js";
import bcrypt from 'bcrypt';
import { ErrorResponse } from "../utils/ErrorResponse.js";

export const register = async (body) => {
    const { username, email, password } = body;

    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email)
    });

    if (existingUser) {
        throw new ErrorResponse('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.insert(users).values({
        username: username,
        email: email,
        password: hashedPassword
    }).returning();

    return user[0];
}

export const login = async (email, password) => {
    const user = await db.query.users.findFirst({
        where: eq(users.email, email)
    })

    if (!user) {
        throw new ErrorResponse('User not found', 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new ErrorResponse('email or password is invalid', 401);
    }

    const generateToken = crypto.randomUUID();

    await db.update(users).set({
        token: generateToken
    }).where(eq(users.id, user.id))

    return {
        ...user,
        token: generateToken
    }
}

export const logout = async (req) => {
    const user = req.user;

    const logout = await db.update(users).set({
        token: null
    }).where(eq(users.id, user.id));

    if (!logout) {
        throw new ErrorResponse('Failed to logout', 400);
    }

    return logout
}

export const me = async (req) => {
    return req.user
}