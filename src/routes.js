const express = require("express");
const TaskController = require("./controllers/TaskController");
const UserController = require("./controllers/UserController");
const AuthController = require("./controllers/AuthController");
const { checkAuth } = require("./controllers/interceptorController");

const controllers = express();

controllers.use("/tasks", checkAuth("USER"), TaskController);
controllers.use("/users", checkAuth("ADMIN"), UserController);
controllers.use("/auth", AuthController);

module.exports = controllers;
