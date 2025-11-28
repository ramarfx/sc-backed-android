import { eq } from "drizzle-orm";
import { db } from "../db/drizzle.js";
import { users } from "../db/schema.js";
import bcrypt from 'bcrypt';

export const register = async (body) => {
    const { username, email, password } = body;

    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email)
    });

    if (existingUser) {
        throw new Error('User already exists');
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
        throw new Error('Email or password is incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid password');
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
        throw new Error('Failed to logout');
    }

    return logout
}

export const me = async (req) => {
    return req.user
}