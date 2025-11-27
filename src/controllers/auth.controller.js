import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      message: "User created successfully",
      data: {
        username: user.username,
        email: user.email
      }
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const login = async (req, res) => {
  try {
    const user = await authService.login(req.body.email, req.body.password);

    res.status(200).json({
      message: "User logged in successfully",
      data: {
        username: user.username,
        email: user.email,
        token: user.token
      }
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const logout = async (req, res) => {
  try {
    await authService.logout(req);

    res.status(200).json({
      message: "User logged out successfully",
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const me = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({
      message: "User info fetched",
      data: user
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
