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
      return res.json({ signin_error: "Invalid Password!" });
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
      res.json({ token });
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

AuthController.post("/check-token", async (req, res) => {
  const { token } = req.body;

  const SECRET_KEY = process.env.SECRET_KEY;
  if (!SECRET_KEY) {
    return res.status(401).json({ error: "Environment SECRET_KEY is empty!" });
  }

  if (token) {
    try {
      const tokenVerified = jwt.verify(token, SECRET_KEY);
      if (tokenVerified && tokenVerified.id) {
        return res.json({ status_token: true });
      } else {
        return res.json({
          status_token: false,
          status_error: "Unauthorized with invalid token!",
        });
      }
    } catch (error) {
      if (error && error.name === "JsonWebTokenError") {
        return res.json({
          status_token: false,
          status_error: "Unauthorized with invalid token!",
        });
      } else if (error && error.name === "TokenExpiredError") {
        return res.json({
          status_token: false,
          status_error: "Unauthorized with expired token!",
        });
      }
    }
  } else {
    return res.json({
      status_token: false,
      status_error: "Unauthorized with invalid token!",
    });
  }
});

module.exports = AuthController;
