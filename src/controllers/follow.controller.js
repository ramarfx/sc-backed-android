import * as followService from '../services/follow.service.js'
import * as userService from '../services/user.service.js'

export const follow = async (req, res) => {
    try {
        const user = await userService.getUserByUsername(req.params.username);

        const follow = await followService.follow(req.user.id, user.id);

        return res.status(200).json({
            message: "User followed successfully",
            data: follow
        });
    } catch (error) {
        return res.status(error.code).json({ message: error.message });
    }
}

export const unfollow = async (req, res) => {
    try {
        const user = await userService.getUserByUsername(req.params.username);

        const unfollow = await followService.unfollow(req.user.id, user.id);

        return res.status(200).json({
            message: "User unfollowed successfully",
            data: unfollow
        });
    } catch (error) {
        return res.status(error.code).json({ message: error.message });
    }
}