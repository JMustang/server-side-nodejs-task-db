const { Router } = require("express");
const UserService = require("../services/UserService");
const jwt = require("jsonwebtoken");

const AuthController = Router();

AuthController.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const emailExist = await UserService.existEmail(email);
    if (!emailExist) {
      return res
        .status(404)
        .json({ message: `The email ${email} is not found!` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "UserService.existEmail() is not working!" });
  }

  try {
    const user = await UserService.findUserByEmail(email);
    const passwordValidated = await UserService.validatePassword(
      password,
      user.password
    );

    if (!passwordValidated) {
      return res.status(401).json({ error: "Invalid Password!" });
    }

    const SECRET_KEY = process.env.SECRET_KEY;
    if (!SECRET_KEY) {
      return res
        .status(401)
        .json({ error: "Environment SECRET_KEY is empty!" });
    }

    try {
      const { id, roles } = user;
      const token = jwt.sign({ id, roles }, SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });
      res.json(token);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "jwt.sign() is not working!" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "UserService.validatePassword() is not working!" });
  }
});

module.exports = AuthController;
