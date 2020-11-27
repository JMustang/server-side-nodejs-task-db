const { Router } = require("express");
const UserService = require("../services/UserService");
const RoleService = require("../services/RoleService");

const UserController = Router();

UserController.post("", async (req, res) => {
  const { active, name, email, password, roles } = req.body;

  const errors = [];

  if (!name) {
    errors.push({ error: "Name is empty" });
  }

  if (!email) {
    errors.push({ error: "Email is empty" });
  }

  if (!email.match(/\S+@\S+\.\S+/)) {
    errors.push({ error: "Invalid Email" });
  }

  try {
    const emailExist = await UserService.existEmail(email);
    if (emailExist) {
      return res
        .status(409)
        .json({ message: `The email ${email} is already in use!` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "UserService.existEmail() is not working!" });
  }

  if (!roles || roles.length === 0) {
    errors.push({ error: "Invalid Roles!" });
  }

  try {
    const roleExist = await RoleService.existRole(roles);
    if (!roleExist) {
      errors.push({ error: "Invalid Role!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "RoleService.existRole() is not working!" });
  }

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    res
      .status(201)
      .json(await UserService.store({ active, name, email, password, roles }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "UserService.store() is not working!" });
  }
});

module.exports = UserController;
