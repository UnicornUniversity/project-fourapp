const AuthAbl = require("../../abl/auth-abl");

class AuthController {
  static async register(req, res) {
    try {
      const result = await AuthAbl.register(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ code: err.code, message: err.message });
    }
  }

  static async login(req, res) {
    try {
      const result = await AuthAbl.login(req.body);
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.status(200).json(result.user);
    } catch (err) {
      res.status(400).json({ code: err.code, message: err.message });
    }
  }

  static async getUserProfile(req, res) {
    try {
      const user = await AuthAbl.getUserProfile(req.user.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ code: err.code, message: err.message });
    }
  }
}

module.exports = AuthController;
