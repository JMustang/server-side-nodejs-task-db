const express = require("express");
const TaskController = require("./controllers/TaskController");
const UserController = require("./controllers/UserController");
const AuthController = require("./controllers/AuthController");

const controllers = express();

controllers.use("/tasks", TaskController);
controllers.use("/users", UserController);
controllers.use("/auth", AuthController);

module.exports = controllers;
