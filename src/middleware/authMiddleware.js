import { eq } from "drizzle-orm";
import { db } from "../db/drizzle.js";
import { users } from "../db/schema.js";

export const authMiddleware = async (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = auth.replace("Bearer ", "").trim();

    const user = await db.query.users.findFirst({
        where: eq(users.token, token),
    });

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;

    console.log('berhasil', user)

    next();
};
