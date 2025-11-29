import { db } from "../db/drizzle.js"
import * as userService from '../services/user.service.js'

export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();

        return res.status(200).json(users);
    } catch (error) {
        return res.status(error.code).json({ message: error.message });
    }
}

export const getUserByUsername = async (req, res) => {
    try {
        const user = await userService.getUserByUsername(req.params.username);

        return res.status(200).json(user);
    } catch (error) {
        return res.status(error.code).json({ message: error.message });
    }
}