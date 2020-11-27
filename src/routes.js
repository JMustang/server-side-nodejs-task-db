const express = require("express");
const TaskController = require("./controllers/TaskController");
const UserController = require("./controllers/UserController");

const controllers = express();

controllers.use("/tasks", TaskController);
controllers.use("/users", UserController);

module.exports = controllers;
