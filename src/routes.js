const express = require("express");
const TaskController = require("./controllers/TaskControllers");

const controllers = express();

controllers.use("/tasks", TaskController);

    module.exports = controllers;